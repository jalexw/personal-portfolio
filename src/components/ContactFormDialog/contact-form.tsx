"use client";

import { type ReactElement, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  useToast,
  ScrollArea,
  useForm,
} from "@schemavaults/ui";
import { Loader2, Mail } from "lucide-react";
import { type ContactFormData, contactFormSchema } from "./contact-form-schema";
import { ContactFormSubjectSelect } from "./contact-form-subject-select";
import { captureException } from "@sentry/nextjs";

export interface ContactFormProps {
  setDialogOpen: (open: boolean) => void;
}

export function ContactForm({ setDialogOpen }: ContactFormProps): ReactElement {
  const [isSubmitting, startTransition] = useTransition();
  const { toast } = useToast();

  // Contact Form (react-hook-form)
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: undefined,
      message: "",
    },
  });

  function onSubmitContactForm(values: ContactFormData) {
    if (process.env.NODE_ENV === "development") {
      console.log("Submitting contact form: ", values);
    }
    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          body: JSON.stringify(values),
          method: "POST",
        });
        if (!response.ok || response.status !== 200) {
          throw new Error(
            `Received error response from /api/contact endpoint: '${response.status} ${response.statusText}'`,
          );
        }
      } catch (error: unknown) {
        console.error("Error submitting contact form: ", error);
        captureException(error);
        toast({
          variant: "destructive",
          title: "Error submitting form!",
          description: "Please try again later...",
        });
        return;
      }

      toast({
        title: "Message received!",
        description:
          "Thanks for reaching out. I will get back to you as soon as possible!",
      });
      setDialogOpen(false);
      return;
    }); // end of onSubmitContactForm
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          onSubmitContactForm,
          function onSubmitContactFormError(e): void {
            console.error("Error submitting contact form:", e);
            toast({
              variant: "destructive",
              title: "Error submitting contact form!",
              description:
                "Please double check that you've filled all fields properly!",
            });
          },
        )}
        className="w-full m-2 p-2"
      >
        <ScrollArea
          className="space-y-2 w-full overflow-y-scroll"
          onScroll={(e) => {
            e.preventDefault();
            if (process.env.NODE_ENV === "development") {
              console.log("Scrolling form...");
            }
          }}
        >
          {/** Name & Email Fields -- put on same row on large screens */}
          <div className="flex flex-row flex-wrap gap-2 mx-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full lg:w-5/12 grow my-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    How would you like to be addressed?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              disabled={isSubmitting}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full lg:w-5/12 grow my-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@domain.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>How can I reach you?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              disabled={isSubmitting}
            />
          </div>
          {/** Message Subject */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="mx-2 my-2">
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <ContactFormSubjectSelect
                    field={field}
                    triggerClassName="w-full"
                  />
                </FormControl>
                <FormDescription>
                  Help me categorize your message so I can respond
                  appropriately.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
            disabled={isSubmitting}
          />
          {/** Message Content */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="mx-2 my-2">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your message" {...field} />
                </FormControl>
                <FormDescription>
                  What would you like to tell me?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
            disabled={isSubmitting}
          />
        </ScrollArea>
        <div className="flex flex-row justify-end w-full p-2">
          <Button
            type="submit"
            className="flex flex-row gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {!isSubmitting && (
              <>
                <Mail className="h-4 w-4" /> Send Message
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ContactForm;
