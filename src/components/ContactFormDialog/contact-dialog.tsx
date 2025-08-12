"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  Separator,
} from "@schemavaults/ui";
import { useContext, useState, type ReactElement } from "react";
import { DialogTriggerButton } from "./dialog-trigger";
import Link from "next/link";
import { email } from "@/metadata";
import { Mail } from "lucide-react";
import { ContactForm } from "./contact-form";

export function ContactDialog(): ReactElement {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(o: boolean): void => setDialogOpen(o)}
    >
      <DialogTriggerButton />
      <DialogContent className="sm:max-w-[425px] md:max-w-[525px] lg:max-w-[700px] xl:max-w-[900px] overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Send me a message</DialogTitle>
          <DialogDescription>
            Get in touch using the contact form below and I will respond to your
            message as soon as possible!
          </DialogDescription>
        </DialogHeader>

        <ContactForm setDialogOpen={setDialogOpen} />

        <Separator />

        <div className="flex flex-col items-center justify-start">
          <p>
            Alternatively, send me an e-mail directly:
            <Link
              href={`mailto:${email}`}
              className="inline-block m-0 px-1 py-0"
            >
              <Button
                variant="link"
                className="m-0 py-0 flex flex-row gap-2 items-center justify-start"
              >
                <Mail className="h-3.5 w-3.5 p-0 m-0" /> {email}
              </Button>
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ContactDialog;
