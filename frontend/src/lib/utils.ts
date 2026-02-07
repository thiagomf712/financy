import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function GetUserNameLetters(name: string) {
  const nameParts = name.split(' ')
  const firstLetter = nameParts[0][0] || ''
  const secondLetter = nameParts[1] ? nameParts[1][0] : ''

  return (firstLetter + secondLetter).toUpperCase()
}
