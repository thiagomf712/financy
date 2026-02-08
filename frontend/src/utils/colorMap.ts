export const CategoryColorsMap = {
  green: 'green',
  blue: 'blue',
  purple: 'purple',
  pink: 'pink',
  red: 'red',
  orange: 'orange',
  yellow: 'yellow',
} as const satisfies Record<string, string>

export type CategoryColorName = keyof typeof CategoryColorsMap

export const CategoryColorsList = Object.keys(CategoryColorsMap)
