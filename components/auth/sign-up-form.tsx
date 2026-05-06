'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Eye,
  LockKeyhole,
  Mail,
  Sparkles,
  User,
} from 'lucide-react'

import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof motion.div>) {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    setIsLoading(true)
    setError(null)

    if (!trimmedName) {
      setError('Informe seu nome para continuar.')
      setIsLoading(false)
      return
    }

    if (!trimmedEmail) {
      setError('Informe seu e-mail para continuar.')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres.')
      setIsLoading(false)
      return
    }

    if (password !== repeatPassword) {
      setError('As senhas não conferem. Verifique e tente novamente.')
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            name: trimmedName,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (error) {
        throw error
      }

      router.push('/auth/sign-up-success')
    } catch {
      setError(
        'Não foi possível criar sua conta agora. Verifique os dados e tente novamente.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn('w-full', className)}
      {...props}
    >
      <Card className='overflow-hidden rounded-[2rem] border-emerald-100/70 bg-white/85 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl'>
        <CardHeader className='space-y-4 pb-6'>
          <div className='flex items-center justify-between'>
            <div className='flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'>
              <Sparkles className='size-6' />
            </div>

            <div className='rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700'>
              Cadastro
            </div>
          </div>

          <div className='space-y-2'>
            <CardTitle className='text-3xl font-black tracking-tight text-slate-950'>
              Crie sua conta
            </CardTitle>

            <CardDescription className='text-base leading-relaxed text-slate-500'>
              Comece a montar seu painel pessoal de finanças, rotina, metas e
              evolução.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className='space-y-5'>
            {error ? (
              <Alert className='rounded-2xl border-red-200 bg-red-50 text-red-700'>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <div className='space-y-2'>
              <Label
                htmlFor='name'
                className='text-sm font-semibold text-slate-700'
              >
                Nome
              </Label>

              <div className='relative'>
                <User className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                <Input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='Seu nome'
                  required
                  autoComplete='name'
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className='h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 text-base shadow-none focus-visible:ring-emerald-500'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='text-sm font-semibold text-slate-700'
              >
                E-mail
              </Label>

              <div className='relative'>
                <Mail className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='seu@email.com'
                  required
                  autoComplete='email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className='h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 text-base shadow-none focus-visible:ring-emerald-500'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='password'
                className='text-sm font-semibold text-slate-700'
              >
                Senha
              </Label>

              <div className='relative'>
                <LockKeyhole className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Crie uma senha'
                  required
                  autoComplete='new-password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className='h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 pr-11 text-base shadow-none focus-visible:ring-emerald-500'
                />
                <Eye className='pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-300' />
              </div>
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='repeat-password'
                className='text-sm font-semibold text-slate-700'
              >
                Confirmar senha
              </Label>

              <div className='relative'>
                <LockKeyhole className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                <Input
                  id='repeat-password'
                  name='repeat-password'
                  type='password'
                  placeholder='Digite a senha novamente'
                  required
                  autoComplete='new-password'
                  value={repeatPassword}
                  onChange={(event) => setRepeatPassword(event.target.value)}
                  className='h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 pr-11 text-base shadow-none focus-visible:ring-emerald-500'
                />
                <Eye className='pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-300' />
              </div>
            </div>

            <Button
              type='submit'
              disabled={isLoading}
              className='h-12 w-full rounded-2xl bg-emerald-600 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700'
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
              {!isLoading && <ArrowRight className='ml-2 size-4' />}
            </Button>

            <div className='pt-2 text-center text-sm text-slate-500'>
              Já tem uma conta?{' '}
              <Link
                href='/auth/login'
                className='font-semibold text-emerald-700 underline-offset-4 hover:underline'
              >
                Entrar
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
