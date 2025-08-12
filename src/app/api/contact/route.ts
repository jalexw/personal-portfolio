import { type NextRequest, NextResponse } from "next/server";
import {
  type ContactFormData,
  contactFormSchema,
} from "@/components/ContactFormDialog";
import { Resend } from "resend";
import {
  ContactConfirmationEmailTemplate,
  MessageNotificationEmailTemplate,
} from "@/components/EmailTemplates";

function getResendKey(): string {
  const key = process.env.RESEND_PRIVATE_KEY;
  if (!key) {
    throw new Error("RESEND_PRIVATE_KEY not set");
  }
  return key;
}

const resend = new Resend(getResendKey());

async function sendMeEmail(contactFormMessage: ContactFormData): Promise<void> {
  console.log(
    `Sending notification email to admin at ${new Date().toISOString()}`,
  );
  await resend.emails.send({
    from: "jalexw.ca - Contact Form <noreply@jalexw.ca>",
    to: ["J. Alex Whitman <contact@jalexw.ca>"],
    subject: "Portfolio Contact Form Message",
    react: MessageNotificationEmailTemplate(contactFormMessage),
    text: `You've received a new message from ${contactFormMessage.name} <${contactFormMessage.email}>:\n\n${contactFormMessage.message}`,
  });
}

async function sendConfirmationEmail(
  contactFormMessage: ContactFormData,
): Promise<void> {
  console.log(
    `Sending confirmation email to \"${contactFormMessage.email}\" at ${new Date().toISOString()}`,
  );
  await resend.emails.send({
    from: "J. Alex Whitman Contact Form <noreply@jalexw.ca>",
    to: [contactFormMessage.email],
    subject: "Portfolio Contact Form Message",
    react: ContactConfirmationEmailTemplate(contactFormMessage),
    text: `Thank you for contacting me. I will get back to you as soon as possible.`,
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (process.env.NODE_ENV === "development") {
    console.log("Contact form message received at /api/contact");
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Error parsing JSON body",
        success: false,
      },
      { status: 400 },
    );
  }

  let contactFormMessage: ContactFormData;
  try {
    const parsed = await contactFormSchema.safeParseAsync(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.flatten(),
          success: false,
        },
        { status: 400 },
      );
    }
    contactFormMessage = parsed.data;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error parsing JSON body as contact form message",
        success: false,
      },
      { status: 400 },
    );
  }

  try {
    await Promise.all([
      sendMeEmail(contactFormMessage),
      sendConfirmationEmail(contactFormMessage),
    ]);

    return NextResponse.json(
      {
        success: true,
        error: false,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export const runtime = "edge";
