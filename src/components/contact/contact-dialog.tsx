
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ReactElement } from "react"
import { DialogTriggerButton } from "./dialog-trigger"
import Link from "next/link"
import { email } from "@/metadata"
import { Mail } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { SocialMediaLinks } from "./social-media-links"

export function ContactDialog(): ReactElement {
  return (
    <Dialog>
      <DialogTriggerButton />
      <DialogContent
        className="sm:max-w-[425px] md:max-w-[525px] lg:max-w-[625px] overflow-y-scroll max-h-screen"
      >
        <DialogHeader>
          <DialogTitle>Send me a message</DialogTitle>
          <DialogDescription>
            Get in touch with me below and I will respond to your message as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-72 overflow-y-scroll">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@domain.com"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Subject
            </Label>
            <Input
              id="subject"
              placeholder="Purpose of your message"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Message
            </Label>
            <Textarea
              id="subject"
              placeholder="Hey, can you build me an app?"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="flex flex-row gap-2"><Mail className="h-4 w-4"/> Send Message</Button>
        </DialogFooter>

        <Separator />

        <div className="flex flex-col">
          <h2 className="text-center">Or, e-mail me directly:</h2>
          <div className="flex flex-row justify-center gap-4">
          <Link href={`mailto:${email}`} className="inline-block">
              <Button variant='link' className="m-0 flex flex-row gap-2">
                <Mail className="h-4 w-4"/> {email}
              </Button>
            </Link>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-start">
          <h2 className="text-center">Connect with me on social media:</h2>
          <SocialMediaLinks />
        </div>
        
      </DialogContent>
    </Dialog>
  )
}