import { zodResolver } from '@hookform/resolvers/zod'
import { LockIcon, MailIcon, UserRoundPlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/stores/auth'

const authFormSchema = z.object({
  email: z
    .string()
    .min(1, 'O email é obrigatório')
    .email('Digite um email válido'),
  password: z.string().min(1, 'A senha é obrigatória'),
})
type AuthFormData = z.infer<typeof authFormSchema>

export function AuthPage() {
  const [loading, setLoading] = useState(false)
  const login = useAuthStore(state => state.login)

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleAuth(data: AuthFormData) {
    setLoading(true)

    try {
      const loginResult = await login({
        email: data.email,
        password: data.password,
      })

      if (loginResult) {
        toast.success('Login realizado com sucesso!')
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao fazer login. Tente novamente.'

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <img src={logo} alt="Financy Logo" />

      <div className="my-8 p-8 bg-white border border-gray-100 rounded-xl text-center sm:min-w-md">
        <header>
          <h1 className="text-xl font-bold text-gray-800">Fazer login</h1>
          <p className="text-gray-600">Entre na sua conta para continuar</p>
        </header>

        <form
          onSubmit={form.handleSubmit(handleAuth)}
          className="flex flex-col gap-4 mt-8"
        >
          <Controller
            name="email"
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="password"
                    placeholder="Digite sua senha"
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="inline-start">
                    <LockIcon />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" className="mt-6" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="my-6 relative">
          <Separator />
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
            ou
          </span>
        </div>

        <p className="text-gray-600 text-sm">Ainda não tem uma conta?</p>

        <Button variant="outline" className="w-full mt-4" asChild>
          <Link to="/signup">
            <UserRoundPlusIcon />
            Criar conta
          </Link>
        </Button>
      </div>
    </div>
  )
}
