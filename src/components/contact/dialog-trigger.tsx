import type { ReactElement } from "react";
import { Button, DialogTrigger } from "@schemavaults/ui";
import { AtSign, Mail } from "lucide-react";
export function DialogTriggerButton(): ReactElement {
  return (
    <DialogTrigger asChild>
      <Button variant="outline" className="flex flex-row justify-start gap-2">
        <span className="block sm:hidden">Contact: </span>
        <span className="hidden sm:block">Get in touch: </span>
        <AtSign className="h-4 w-4" /> / <Mail className="h-4 w-4" />
      </Button>
    </DialogTrigger>
  );
}
