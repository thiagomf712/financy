import { useQuery } from '@apollo/client/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2Icon, SearchIcon } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
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
import { transactionTypeEnum } from '@/lib/graphql/types/transaction'

const transactionFilterFormSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE', 'ALL'], {
    invalid_type_error: 'Tipo de transação inválido',
    required_error: 'O tipo de transação é obrigatório',
  }),
  search: z.string(),
  date: z
    .object({
      from: z.date({
        invalid_type_error: 'Data inválida',
      }),
      to: z.date({
        invalid_type_error: 'Data inválida',
      }),
    })
    .optional(),
  categoryId: z.string().optional(),
})
export type TransactionFilterFormData = z.infer<
  typeof transactionFilterFormSchema
>

type FilterTransactionFormProps = {
  onFilter: (data: TransactionFilterFormData) => void
  loading: boolean
}
export function FilterTransactionForm({
  onFilter: handleFilter,
  loading,
}: FilterTransactionFormProps) {
  const {
    data,
    loading: categoriesLoading,
    error,
  } = useQuery<ListCategoriesNameData>(LIST_CATEGORIES_NAME)

  const form = useForm<TransactionFilterFormData>({
    resolver: zodResolver(transactionFilterFormSchema),
    defaultValues: {
      categoryId: 'none',
      type: 'ALL',
      search: '',
    },
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Ocorreu um erro ao carregar as categorias')
    }
  }, [error])

  const categories = data?.listCategories || []

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleFilter)}
        className="bg-white p-4 rounded-lg flex flex-col"
      >
        <div className="grid grid-cols-4 gap-4">
          <Controller
            name="search"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="transaction-filter-form-search">
                  Buscar
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="transaction-filter-form-search"
                    placeholder="Buscar por descrição"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="inline-start">
                    <SearchIcon />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="transaction-filter-form-type">
                  Tipo
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="transaction-filter-form-type"
                    className="min-w-30"
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Todos</SelectItem>
                    <SelectItem value={transactionTypeEnum.INCOME}>
                      Entradas
                    </SelectItem>
                    <SelectItem value={transactionTypeEnum.EXPENSE}>
                      Saídas
                    </SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {categoriesLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2Icon className="animate-spin size-10" />
            </div>
          ) : (
            <Controller
              name="categoryId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="transaction-filter-form-category">
                    Categoria
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="transaction-filter-form-category"
                      className="min-w-30"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Todas</SelectItem>

                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}

          <Controller
            name="date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="transaction-filter-form-date">
                  Data
                </FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="input" size="input">
                      <CalendarIcon />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, 'dd/MM/yyyy')} -{' '}
                            {format(field.value.to, 'dd/MM/yyyy')}
                          </>
                        ) : (
                          format(field.value.from, 'dd/MM/yyyy')
                        )
                      ) : (
                        <span>Selecione</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={field.value}
                      onSelect={field.onChange}
                      defaultMonth={field.value?.from}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Não to muito afim de fazer filtro ao mudar os campos */}
        <Button
          type="submit"
          size="sm"
          disabled={loading}
          className="mt-2 self-end"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </form>
    </FormProvider>
  )
}
