'use client'

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
  MailCheck,
  ShieldCheck,
} from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

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
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export function ForgotPasswordForm({
  className,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<'div'>,
  | 'onAnimationStart'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragEnter'
  | 'onDragOver'
  | 'onDragLeave'
  | 'onDrop'
>) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleForgotPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedEmail = email.trim()

    setIsLoading(true)
    setError(null)

    if (!trimmedEmail) {
      setError('Informe seu e-mail para continuar.')
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.resetPasswordForEmail(
        trimmedEmail,
        {
          redirectTo: `${window.location.origin}/auth/update-password`,
        },
      )

      if (error) {
        throw error
      }

      setSuccess(true)
    } catch {
      setError(
        'Não foi possível enviar o e-mail de recuperação agora. Verifique o e-mail e tente novamente.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={cn('w-full', className)}
        {...props}
      >
        <Card className='w-full overflow-hidden rounded-[2rem] border ws-border ws-surface shadow-2xl backdrop-blur-xl'>
          <CardHeader className='space-y-4 pb-6'>
            <div className='flex items-center justify-between'>
              <div className='flex size-12 items-center justify-center rounded-2xl ws-primary shadow-lg'>
                <MailCheck className='size-6' />
              </div>

              <div className='rounded-full border ws-border ws-primary-soft px-3 py-1 text-xs font-bold uppercase tracking-wide'>
                Enviado
              </div>
            </div>

            <div className='space-y-2'>
              <CardTitle className='text-3xl font-black tracking-tight ws-heading'>
                Verifique seu e-mail
              </CardTitle>

              <CardDescription className='text-base leading-relaxed ws-muted'>
                Enviamos as instruções para redefinir sua senha.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className='space-y-6'>
            <div className='rounded-[1.5rem] border ws-border ws-primary-soft p-5'>
              <div className='flex gap-4'>
                <div className='flex size-10 shrink-0 items-center justify-center rounded-2xl ws-primary'>
                  <CheckCircle2 className='size-5' />
                </div>

                <div className='space-y-1'>
                  <p className='font-bold ws-heading'>
                    Link de recuperação solicitado
                  </p>
                  <p className='text-sm leading-6 ws-muted'>
                    Se o e-mail informado estiver cadastrado, você receberá um
                    link para criar uma nova senha.
                  </p>
                </div>
              </div>
            </div>

            <div className='space-y-3 rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
              <p className='text-sm font-bold ws-heading'>Não encontrou?</p>

              <p className='text-sm leading-6 ws-muted'>
                Confira sua caixa de entrada, promoções, spam ou lixo
                eletrônico. O e-mail pode levar alguns minutos para chegar.
              </p>
            </div>

            <Button
              asChild
              className='h-12 w-full rounded-2xl ws-primary text-base font-semibold shadow-lg transition'
            >
              <Link href='/auth/login'>
                Voltar para login
                <ArrowRight className='ml-2 size-4' />
              </Link>
            </Button>

            <button
              type='button'
              onClick={() => setSuccess(false)}
              className='mx-auto flex items-center justify-center text-sm font-semibold text-[var(--ws-primary-text)] underline-offset-4 hover:underline'
            >
              <ArrowLeft className='mr-2 size-4' />
              Enviar para outro e-mail
            </button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={cn('w-full', className)}
      {...props}
    >
      <Card className='overflow-hidden rounded-[2rem] border ws-border ws-surface shadow-2xl backdrop-blur-xl'>
        <CardHeader className='space-y-4 pb-6'>
          <div className='flex items-center justify-between'>
            <div className='flex size-12 items-center justify-center rounded-2xl ws-primary shadow-lg'>
              <ShieldCheck className='size-6' />
            </div>

            <div className='rounded-full border ws-border ws-primary-soft px-3 py-1 text-xs font-bold uppercase tracking-wide'>
              Recuperar
            </div>
          </div>

          <div className='space-y-2'>
            <CardTitle className='text-3xl font-black tracking-tight ws-heading'>
              Redefinir senha
            </CardTitle>

            <CardDescription className='text-base leading-relaxed ws-muted'>
              Informe seu e-mail e enviaremos um link para você criar uma nova
              senha.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleForgotPassword} className='space-y-5'>
            {error ? (
              <Alert
                className='rounded-2xl border text-[var(--ws-danger)]'
                style={{
                  background:
                    'color-mix(in srgb, var(--ws-danger) 10%, transparent)',
                  borderColor:
                    'color-mix(in srgb, var(--ws-danger) 24%, transparent)',
                }}
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='text-sm font-semibold ws-heading'
              >
                E-mail
              </Label>

              <div className='relative'>
                <Mail className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 ws-muted' />
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='seu@email.com'
                  required
                  autoComplete='email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className='h-12 rounded-2xl border ws-border ws-surface-muted pl-11 text-base shadow-none placeholder:text-[var(--ws-muted)] focus-visible:ring-[var(--ws-primary)]'
                />
              </div>
            </div>

            <Button
              type='submit'
              disabled={isLoading}
              className='h-12 w-full rounded-2xl ws-primary text-base font-semibold shadow-lg transition disabled:cursor-not-allowed disabled:opacity-70'
            >
              {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
              {!isLoading && <ArrowRight className='ml-2 size-4' />}
            </Button>

            <div className='pt-2 text-center text-sm ws-muted'>
              Lembrou sua senha?{' '}
              <Link
                href='/auth/login'
                className='font-semibold text-[var(--ws-primary-text)] underline-offset-4 hover:underline'
              >
                Entrar
              </Link>
            </div>

            <div className='text-center text-sm ws-muted'>
              Ainda não tem conta?{' '}
              <Link
                href='/auth/sign-up'
                className='font-semibold text-[var(--ws-primary-text)] underline-offset-4 hover:underline'
              >
                Criar conta
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
