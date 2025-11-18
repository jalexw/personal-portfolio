"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Separator,
} from "@schemavaults/ui";
import type { ReactElement } from "react";
import Link from "next/link";
import { email } from "@/metadata";
import { Mail } from "lucide-react";
import ContactForm from "./contact-form";
import useContactFormIsOpenStore from "./useContactFormIsOpenStore";

export function ContactDialog(): ReactElement {
  const { open, setOpen } = useContactFormIsOpenStore();

  return (
    <Dialog open={open} onOpenChange={(o: boolean): void => setOpen(o)}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[525px] lg:max-w-[700px] xl:max-w-[900px] overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Send me a message</DialogTitle>
          <DialogDescription>
            Get in touch using the contact form below and I will respond to your
            message as soon as possible!
          </DialogDescription>
        </DialogHeader>

        <ContactForm setDialogOpen={setOpen} />

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
