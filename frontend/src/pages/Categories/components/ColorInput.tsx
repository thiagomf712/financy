import { Controller, useFormContext } from 'react-hook-form'
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { type CategoryColorName, CategoryColorsList } from '@/utils/colorMap'
import type { CategoryFormData } from './FormCategory'

export function ColorInput() {
  const { control } = useFormContext<CategoryFormData>()

  return (
    <Controller
      name="color"
      control={control}
      render={({ field, fieldState }) => (
        <FieldSet>
          <FieldLegend>Cor</FieldLegend>
          <RadioGroup
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
            className="grid-cols-7 gap-x-2 gap-y-2"
          >
            {CategoryColorsList.map(colorName => (
              <ColorInputItem
                key={colorName}
                colorName={colorName as CategoryColorName}
                selected={field.value === colorName}
                isInvalid={fieldState.invalid}
              />
            ))}
          </RadioGroup>

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </FieldSet>
      )}
    />
  )
}

type ColorInputItemProps = {
  colorName: CategoryColorName
  selected: boolean
  isInvalid: boolean
}
function ColorInputItem({
  colorName,
  selected,
  isInvalid,
}: ColorInputItemProps) {
  const bgColorClass = bgColorsMap[colorName]

  return (
    <FieldLabel htmlFor={`color-input-${colorName}`}>
      <Field
        data-invalid={isInvalid}
        className={cn(
          'w-12.5 h-7.5 p-1 border border-gray-300 rounded-lg cursor-pointer',
          selected && 'border-brand-base'
        )}
      >
        <div className={cn('w-10 h-5 rounded-md', bgColorClass)} />

        <RadioGroupItem
          id={`color-input-${colorName}`}
          value={colorName}
          className="sr-only"
          aria-invalid={isInvalid}
        />
      </Field>
    </FieldLabel>
  )
}

const bgColorsMap: Record<CategoryColorName, string> = {
  green: 'bg-green-base',
  blue: 'bg-blue-base',
  purple: 'bg-purple-base',
  pink: 'bg-pink-base',
  red: 'bg-red-base',
  orange: 'bg-orange-base',
  yellow: 'bg-yellow-base',
}
