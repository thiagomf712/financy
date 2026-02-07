import { zodResolver } from '@hookform/resolvers/zod'
import { LogOutIcon, MailIcon, UserRoundIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'
import { GetUserNameLetters } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth'

const updateProfileFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z
    .string()
    .min(1, 'O email é obrigatório')
    .email('Digite um email válido'),
})
type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { user, updateProfile, logout } = useAuthStore()
  const userLetter = GetUserNameLetters(user?.name || 'U')

  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      email: user?.email || '',
      name: user?.name || '',
    },
  })

  function handleLogout() {
    logout()

    navigate('/auth')
  }

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    setLoading(true)

    try {
      const updateResult = await updateProfile({
        name: data.name,
      })

      if (updateResult) {
        toast.success('Perfil atualizado com sucesso!')
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao atualizar o perfil. Tente novamente.'

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <></>
  }

  return (
    <div className="p-8 bg-white border border-gray-100 rounded-xl text-center sm:w-md mx-auto">
      <header>
        <div className="rounded-full bg-gray-300 size-16 mb-4 flex items-center justify-center text-2xl font-medium text-gray-800 mx-auto">
          {userLetter}
        </div>
        <p className="text-xl font-semibold text-gray-800">{user.name}</p>
        <p className="text-gray-500">{user.email}</p>
      </header>

      <Separator className="my-8" />

      <form
        onSubmit={form.handleSubmit(handleUpdateProfile)}
        className="flex flex-col gap-4 mt-8"
      >
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Nome completo</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="name"
                  placeholder="Seu nome completo"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="inline-start">
                  <UserRoundIcon />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          disabled
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="email"
                  placeholder="mail@exemplo.com"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="inline-start">
                  <MailIcon />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : (
                <FieldDescription>
                  O e-mail não pode ser alterado
                </FieldDescription>
              )}
            </Field>
          )}
        />

        <Button type="submit" className="mt-6" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </form>

      <Button
        type="button"
        variant="outline"
        className="mt-4 w-full"
        onClick={handleLogout}
      >
        <LogOutIcon className="text-danger" />
        Sair da conta
      </Button>
    </div>
  )
}
