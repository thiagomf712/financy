import { BriefcaseBusinessIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CategoryColorName } from '@/utils/colorMap'
import { type CategoryIconName, CategoryIconsMap } from '@/utils/iconMap'

type CategoryIconProps = {
  iconName: CategoryIconName
  color: CategoryColorName
}

export function CategoryIcon({ iconName, color }: CategoryIconProps) {
  const Icon = CategoryIconsMap[iconName] ?? BriefcaseBusinessIcon
  const classesColors = colorClassesMap[color] ?? {
    background: 'bg-blue-light',
    icon: 'text-blue-base',
  }

  return (
    <div className={cn('size-10 p-3 rounded-lg', classesColors.background)}>
      <Icon className={cn('size-4', classesColors.icon)} />
    </div>
  )
}

const colorClassesMap: Record<
  CategoryColorName,
  { background: string; icon: string }
> = {
  blue: {
    background: 'bg-blue-light',
    icon: 'text-blue-base',
  },
  green: {
    background: 'bg-green-light',
    icon: 'text-green-base',
  },
  orange: {
    background: 'bg-orange-light',
    icon: 'text-orange-base',
  },
  purple: {
    background: 'bg-purple-light',
    icon: 'text-purple-base',
  },
  red: {
    background: 'bg-red-light',
    icon: 'text-red-base',
  },
  yellow: {
    background: 'bg-yellow-light',
    icon: 'text-yellow-base',
  },
  pink: {
    background: 'bg-pink-light',
    icon: 'text-pink-base',
  },
}
