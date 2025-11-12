import {
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  EyeIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline'

export const navigationItems = [
  { id: 'profile', label: 'Профиль', icon: UserIcon },
  { id: 'notification', label: 'Уведомления', icon: BellIcon },
  { id: 'security', label: 'Безопасность', icon: ShieldCheckIcon },
  { id: 'payments', label: 'Платежи', icon: CreditCardIcon },
  { id: 'privacy', label: 'Конфиденциальность', icon: EyeIcon },
  { id: 'appearance', label: 'Внешний вид', icon: DevicePhoneMobileIcon },
  { id: 'language', label: 'Язык', icon: LanguageIcon },
]
