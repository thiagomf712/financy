import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { type CategoryColorName, CategoryColorsMap } from '@/utils/colorMap'
import { type CategoryIconName, CategoryIconsMap } from '@/utils/iconMap'
import { ColorInput } from './ColorInput'
import { IconInput } from './IconInput'

const categoryFormSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().optional(),
  icon: z
    .string()
    .refine(
      value => CategoryIconsMap[value as CategoryIconName] !== undefined,
      {
        message: 'Ícone inválido',
      }
    ),
  color: z
    .string()
    .refine(
      value => CategoryColorsMap[value as CategoryColorName] !== undefined,
      {
        message: 'Cor inválida',
      }
    ),
})
export type CategoryFormData = z.infer<typeof categoryFormSchema>

type FormCategoryProps = {
  defaultValues?: Partial<CategoryFormData> & {
    icon?: CategoryIconName
    color?: CategoryColorName
  }
  onSubmit: (data: CategoryFormData) => void
  loading: boolean
}
export function FormCategory({
  defaultValues,
  onSubmit,
  loading,
}: FormCategoryProps) {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      icon: defaultValues?.icon || 'briefcase-business',
      color: defaultValues?.color || 'green',
    },
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="category-form-title">Título</FieldLabel>
              <Input
                {...field}
                id="category-form-title"
                placeholder="Ex. Alimentação"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="category-form-description">
                Descrição da categoria
              </FieldLabel>
              <Input
                {...field}
                id="category-form-description"
                placeholder="Descrição da categoria"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : (
                <FieldDescription>Opcional</FieldDescription>
              )}
            </Field>
          )}
        />

        <IconInput />

        <ColorInput />

        <Button type="submit" disabled={loading} className="mt-6 w-full">
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
    </FormProvider>
  )
}
