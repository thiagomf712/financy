import { useQuery } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LIST_CATEGORIES_NAME,
  type ListCategoriesNameData,
} from '@/lib/graphql/queries/list-categories'
import { formatMoneyInput } from '@/utils/formatMoney'
import { TypeInput } from './TypeInput'

const transactionFormSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE'], {
    invalid_type_error: 'Tipo de transação inválido',
    required_error: 'O tipo de transação é obrigatório',
  }),
  description: z.string().min(1, 'A descrição é obrigatória'),
  amount: z.string().refine(value => {
    const parsed = parseFloat(value.replaceAll('.', '').replace(',', '.'))
    return !Number.isNaN(parsed) && parsed > 0
  }, 'O valor deve ser um número válido e maior que zero'),
  date: z.date({
    invalid_type_error: 'Data inválida',
    required_error: 'A data é obrigatória',
  }),
  categoryId: z.string().min(1, 'A categoria é obrigatória'),
})
export type TransactionFormData = z.infer<typeof transactionFormSchema>

type FormTransactionProps = {
  defaultValues?: Partial<TransactionFormData>
  onSubmit: (data: TransactionFormData) => void
  loading: boolean
}
export function FormTransaction({
  defaultValues,
  onSubmit,
  loading,
}: FormTransactionProps) {
  const {
    data,
    loading: categoriesLoading,
    error,
  } = useQuery<ListCategoriesNameData>(LIST_CATEGORIES_NAME)

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: defaultValues?.type || 'EXPENSE',
      description: defaultValues?.description || '',
      amount: defaultValues?.amount || '0,00',
      date: defaultValues?.date,
      categoryId: defaultValues?.categoryId ?? 'none',
    },
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Ocorreu um erro ao carregar as categorias')
    }
  }, [error])

  const categories = data?.listCategories || []

  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2Icon className="animate-spin size-10" />
      </div>
    )
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TypeInput />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="transaction-form-title">
                Descrição
              </FieldLabel>
              <Input
                {...field}
                id="transaction-form-title"
                placeholder="Ex. Almoço no restaurante"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="transaction-form-date">Data</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="input" size="input">
                      {field.value ? (
                        format(field.value, 'dd/MM/yyyy')
                      ) : (
                        <span>Selecione</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      defaultMonth={field.value}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="amount"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-1">
                <FieldLabel htmlFor="transaction-form-amount">Valor</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="transaction-form-amount"
                    placeholder="0,00"
                    aria-invalid={fieldState.invalid}
                    inputMode="numeric"
                    value={field.value}
                    onChange={e => {
                      const formattedValue = formatMoneyInput(e.target.value)
                      field.onChange(formattedValue)
                    }}
                  />
                  <InputGroupAddon align="inline-start">R$ </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="categoryId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="transaction-form-category">
                Categoria
              </FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="transaction-form-category"
                  className="min-w-30"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" className="sr-only">
                    Selecione
                  </SelectItem>

                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" disabled={loading} className="mt-6 w-full">
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </FormProvider>
  )
}
