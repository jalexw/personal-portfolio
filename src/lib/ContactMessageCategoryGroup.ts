export const messageCategoryGroups = ["business", "personal", "misc"] as const;

export type MessageCategoryGroup = (typeof messageCategoryGroups)[number];

export const messageCategoryGroupLabelMap: Record<
  MessageCategoryGroup,
  string
> = {
  business: "Business",
  personal: "Personal",
  misc: "Miscellaneous",
};
