import {
  BaggageClaimIcon,
  BookOpenIcon,
  BriefcaseBusinessIcon,
  CarFrontIcon,
  DumbbellIcon,
  GiftIcon,
  HeartPulseIcon,
  HouseIcon,
  MailboxIcon,
  PawPrintIcon,
  PiggyBankIcon,
  ReceiptTextIcon,
  ShoppingCartIcon,
  TicketIcon,
  ToolCaseIcon,
  UtensilsIcon,
} from 'lucide-react'

export const CategoryIconsMap = {
  'briefcase-business': BriefcaseBusinessIcon,
  'car-front': CarFrontIcon,
  'heart-pulse': HeartPulseIcon,
  'piggy-bank': PiggyBankIcon,
  'shopping-cart': ShoppingCartIcon,
  ticket: TicketIcon,
  'tool-case': ToolCaseIcon,
  utensils: UtensilsIcon,
  'paw-print': PawPrintIcon,
  house: HouseIcon,
  gift: GiftIcon,
  dumbbell: DumbbellIcon,
  'book-open': BookOpenIcon,
  'baggage-claim': BaggageClaimIcon,
  mailbox: MailboxIcon,
  'receipt-text': ReceiptTextIcon,
} as const satisfies Record<string, React.ElementType>

export type CategoryIconName = keyof typeof CategoryIconsMap

export const CategoryIconsList = Object.keys(CategoryIconsMap)
