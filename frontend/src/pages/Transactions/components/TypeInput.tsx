import { CircleArrowDownIcon, CircleArrowUpIcon } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  type TransactionType,
  transactionTypeEnum,
  transactionTypeList,
} from '@/lib/graphql/types/transaction'
import { cn } from '@/lib/utils'
import type { TransactionFormData } from './FormTransaction'

export function TypeInput() {
  const { control } = useFormContext<TransactionFormData>()

  return (
    <Controller
      name="type"
      control={control}
      render={({ field, fieldState }) => (
        <FieldSet>
          <RadioGroup
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
            className="border rounded-lg border-gray-200 p-2 grid grid-cols-2 gap-0"
          >
            {transactionTypeList.map(type => (
              <ColorInputItem
                key={type}
                type={type}
                selected={field.value === type}
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
  type: TransactionType
  selected: boolean
  isInvalid: boolean
}
function ColorInputItem({ type, selected, isInvalid }: ColorInputItemProps) {
  const typeData = typeMap[type]

  return (
    <FieldLabel htmlFor={`type-input-${type}`} className="w-full">
      <Field
        data-invalid={isInvalid}
        orientation="horizontal"
        className={cn(
          'px-3 py-3.5 border border-transparent rounded-lg justify-center cursor-pointer gap-3',
          selected && typeData.border
        )}
      >
        <typeData.Icon
          className={cn(
            'size-4 w-4 text-gray-400',
            selected && typeData.activeIconColor
          )}
        />

        <p
          className={cn(
            'text-gray-600',
            selected && 'font-medium text-gray-800'
          )}
        >
          {typeData.label}
        </p>

        <RadioGroupItem
          id={`type-input-${type}`}
          value={type}
          className="sr-only"
          aria-invalid={isInvalid}
        />
      </Field>
    </FieldLabel>
  )
}

const typeMap: Record<
  TransactionType,
  {
    border: string
    Icon: React.ElementType
    activeIconColor: string
    label: string
  }
> = {
  [transactionTypeEnum.INCOME]: {
    border: 'border-success',
    Icon: CircleArrowUpIcon,
    activeIconColor: 'text-success',
    label: 'Receita',
  },
  [transactionTypeEnum.EXPENSE]: {
    border: 'border-danger',
    Icon: CircleArrowDownIcon,
    activeIconColor: 'text-danger',
    label: 'Despesa',
  },
}
