import { cn } from '@/lib/utils'
import type { CategoryColorName } from '@/utils/colorMap'

type CategoryTagProps = {
  title: string
  color: CategoryColorName
}

export function CategoryTag({ title, color }: CategoryTagProps) {
  const classesColors = colorClassesMap[color] ?? {
    background: 'bg-blue-light',
    text: 'text-blue-dark',
  }

  return (
    <div
      className={cn('px-3 py-1 rounded-full w-fit', classesColors.background)}
    >
      <span className={cn('font-medium text-sm', classesColors.text)}>
        {title}
      </span>
    </div>
  )
}

const colorClassesMap: Record<
  CategoryColorName,
  { background: string; text: string }
> = {
  blue: {
    background: 'bg-blue-light',
    text: 'text-blue-dark',
  },
  green: {
    background: 'bg-green-light',
    text: 'text-green-dark',
  },
  orange: {
    background: 'bg-orange-light',
    text: 'text-orange-dark',
  },
  purple: {
    background: 'bg-purple-light',
    text: 'text-purple-dark',
  },
  red: {
    background: 'bg-red-light',
    text: 'text-red-dark',
  },
  yellow: {
    background: 'bg-yellow-light',
    text: 'text-yellow-dark',
  },
  pink: {
    background: 'bg-pink-light',
    text: 'text-pink-dark',
  },
}
