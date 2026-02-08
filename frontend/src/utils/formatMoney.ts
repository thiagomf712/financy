export function formatMoneyInput(value: string) {
  const cleanValue = String(value).replace(/\D/g, '')

  if (!cleanValue) return '0,00'

  const paddedValue = cleanValue.padStart(3, '0')

  const cents = paddedValue.slice(-2)
  const integer = paddedValue.slice(0, -2)

  const integerClean = integer.replace(/^0+(?!$)/, '')

  const integerFormatted = integerClean.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return `${integerFormatted},${cents}`
}
