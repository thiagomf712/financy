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
import {
  type CategoryIconName,
  CategoryIconsList,
  CategoryIconsMap,
} from '@/utils/iconMap'
import type { CategoryFormData } from './FormCategory'

export function IconInput() {
  const { control } = useFormContext<CategoryFormData>()

  return (
    <Controller
      name="icon"
      control={control}
      render={({ field, fieldState }) => (
        <FieldSet>
          <FieldLegend>Ícone</FieldLegend>
          <RadioGroup
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
            className="grid-cols-8 gap-x-2 gap-y-2"
          >
            {CategoryIconsList.map(iconName => (
              <IconInputItem
                key={iconName}
                iconName={iconName as CategoryIconName}
                selected={field.value === iconName}
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

type IconInputItemProps = {
  iconName: CategoryIconName
  selected: boolean
  isInvalid: boolean
}
function IconInputItem({ iconName, selected, isInvalid }: IconInputItemProps) {
  const Icon = CategoryIconsMap[iconName]

  return (
    <FieldLabel htmlFor={`icon-input-${iconName}`}>
      <Field
        data-invalid={isInvalid}
        className={cn(
          'size-10.5 p-2.5 border border-gray-300 rounded-lg',
          selected && 'border-brand-base'
        )}
      >
        <Icon className="size-5 text-gray-600" />

        <RadioGroupItem
          id={`icon-input-${iconName}`}
          value={iconName}
          className="sr-only"
          aria-invalid={isInvalid}
        />
      </Field>
    </FieldLabel>
  )
}
