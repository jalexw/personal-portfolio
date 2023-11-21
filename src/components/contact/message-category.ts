import {
  type LucideIcon,
  Hand,
  Heart,
  Presentation,
  AppWindow,
  TabletSmartphone,
  DatabaseZap,
  Bot,
  HelpCircle,
  Bug,
  Wrench,
  Rocket,
  Swords,
} from "lucide-react"

export const messageCategoryGroups = ['personal', 'business', 'misc'] as const;

export type MessageCategoryGroup = typeof messageCategoryGroups[number];

export type MessageCategory = {
  value: string;
  label: string;
  icon: LucideIcon;
  group: MessageCategoryGroup;
}

export const messageCategories = ([
  {
    value: "greetings",
    label: "Just trying to say hello!",
    icon: Hand,
    group: 'personal'
  },
  {
    value: "new-website",
    label: "Request a custom website",
    icon: AppWindow,
    group: 'business'
  },
  {
    value: "new-app",
    label: "Request a custom app",
    icon: TabletSmartphone,
    group: 'business'
  },
  {
    value: "new-database",
    label: "Request a custom database",
    icon: DatabaseZap,
    group: 'business'
  },
  {
    value: "new-ai",
    label: "Request a custom AI model/bot",
    icon: Bot,
    group: 'business'
  },
  {
    value: "new-system",
    label: "Request system design",
    icon: Rocket,
    group: 'business'
  },
  {
    value: "consulting",
    label: "Request consulting service",
    icon: Presentation,
    group: 'business'
  },
  {
    value: "code-review",
    label: "Request debug or code review",
    icon: Wrench,
    group: 'business'
  },
  {
    value: "bug-report",
    label: "Report a bug",
    icon: Bug,
    group: 'business'
  },
  {
    value: "duel",
    label: "Challenge me to a duel",
    icon: Swords,
    group: 'personal'
  },
  {
    value: "romance",
    label: "plz marry me",
    icon: Heart,
    group: 'personal'
  },
  {
    value: "other",
    label: "Other",
    icon: HelpCircle,
    group: 'misc'
  }
] as const) satisfies readonly MessageCategory[];

export const messageCategoryValues = messageCategories.map((category) => category.value);
export type MessageCategoryValue = typeof messageCategoryValues[number];

export const messageCategoryGroupLabelMap: Record<MessageCategoryGroup, string> = {
  business: 'Business',
  personal: 'Personal',
  misc: 'Miscellaneous'
}
