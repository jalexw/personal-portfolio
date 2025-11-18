"use client";

import type { ReactElement } from "react";
import { Button } from "@schemavaults/ui";
import { Mail } from "lucide-react";
import { useOpenContactForm } from "./useContactFormIsOpenStore";

export function ContactFormDialogTriggerButton(): ReactElement {
  const open: () => void = useOpenContactForm();

  return (
    <Button
      variant="outline"
      className="flex flex-row justify-start flex-nowrap gap-2"
      onClick={(e): void => {
        e.preventDefault();
        open();
      }}
    >
      <span className="block sm:hidden">Contact: </span>
      <span className="hidden sm:block">Get in touch: </span>
      <Mail className="h-4 w-4" />
    </Button>
  );
}

export default ContactFormDialogTriggerButton;
