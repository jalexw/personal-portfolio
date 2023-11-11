"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import type { ReactElement } from "react"
import { DialogTriggerButton } from "./dialog-trigger"
import Link from "next/link"
import { email } from "@/metadata"
import { Mail } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { SocialMediaLinks } from "./social-media-links"
import { ContactForm } from "./contact-form"

export function ContactDialog(): ReactElement {
  return (
    <Dialog>
      <DialogTriggerButton />
      <DialogContent
        className="sm:max-w-[425px] md:max-w-[525px] lg:max-w-[700px] xl:max-w-[900px] overflow-y-scroll max-h-screen"
      >
        <DialogHeader>
          <DialogTitle>Send me a message</DialogTitle>
          <DialogDescription>
            Get in touch using the contact form below and I will respond to your message as soon as possible!
            Alternatively, send me an e-mail directly:
            <Link href={`mailto:${email}`} className="inline-block">
              <Button variant='link' className="m-0 flex flex-row gap-2 items-center justify-start">
                <Mail className="h-4 w-4"/> {email}
              </Button>
            </Link>
          </DialogDescription>
        </DialogHeader>
        
        <ContactForm />

        <Separator />

        <div className="flex flex-col items-center justify-start">
          <h2 className="text-center">Connect with me on social media:</h2>
          <SocialMediaLinks />
        </div>
        
      </DialogContent>
    </Dialog>
  )
}