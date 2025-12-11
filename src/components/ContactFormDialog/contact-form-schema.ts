"use client";

import { z } from "zod";
import {
  type MessageCategoryValue,
  messageCategoryValues,
} from "./message-category";

export const contactFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 letters long")
      .max(64, "Name must be under 64 characters"),
    email: z.email(),
    subject: z
      .string()
      .refine((value): value is MessageCategoryValue =>
        (messageCategoryValues as string[]).includes(value),
      ),
    message: z.string().max(2048, "Message must be under 2048 characters."),
  })
  .required({
    name: true,
    email: true,
    subject: true,
    message: true,
  })
  .strict();

export type ContactFormData = z.infer<typeof contactFormSchema>;

export default contactFormSchema;
