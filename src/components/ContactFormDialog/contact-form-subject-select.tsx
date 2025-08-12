"use client";

import { cn } from "@schemavaults/ui";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@schemavaults/ui";
import { ReactElement, useMemo, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import type { ContactFormData } from "./contact-form-schema";
import { type MessageCategory, messageCategories } from "./message-category";
import {
  messageCategoryGroupLabelMap,
  type MessageCategoryGroup,
  messageCategoryGroups,
} from "@/lib/ContactMessageCategoryGroup";

export interface ContactFormSubjectSelectProps {
  field: ControllerRenderProps<ContactFormData, "subject">;
  triggerClassName?: string;
}

interface MessageCategoryGroupProps {
  group: MessageCategoryGroup;
  selected: MessageCategory | null;
}

function MessageCategoryGroup({
  group,
  selected,
}: MessageCategoryGroupProps): ReactElement {
  // Get only message categories that belong to this category group.
  const categories = messageCategories.filter(
    (category) => category.group === group,
  );

  // Group label
  const heading = messageCategoryGroupLabelMap[group];

  return (
    <SelectGroup>
      <SelectLabel key={`label-${heading}`}>{heading}</SelectLabel>
      {categories.map((messageCategory) => (
        <SelectItem
          key={messageCategory.value}
          value={messageCategory.value}
          className="cursor-pointer flex flex-row justify-start items-center"
        >
          <messageCategory.icon
            className={cn(
              "inline mr-2 h-4 w-4",
              messageCategory.value === selected?.value
                ? "opacity-100"
                : "opacity-40",
            )}
          />
          <span className="inline">{messageCategory.label}</span>
        </SelectItem>
      ))}
    </SelectGroup>
  );
}

export function ContactFormSubjectSelect({
  field,
  ...props
}: ContactFormSubjectSelectProps) {
  // const [open, setOpen] = useState<boolean>(false);
  // const [selected, setSelected] = useState<MessageCategory | null>(null);

  const selectedCategory: MessageCategory | null = useMemo(() => {
    return (
      messageCategories.find((category) => category.value === field.value) ||
      null
    );
  }, [field.value]);

  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={field.value}
      disabled={field.disabled}
    >
      <SelectTrigger className={props.triggerClassName}>
        <SelectValue placeholder="Select message category..." />
      </SelectTrigger>
      <SelectContent>
        {messageCategoryGroups.map((group) => (
          <MessageCategoryGroup
            key={group}
            group={group}
            selected={selectedCategory ?? null}
          />
        ))}
      </SelectContent>
    </Select>
  );
}
