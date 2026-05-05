'use client'

import { ArrowRight, Eye, LockKeyhole, Mail, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import { loginAction, LoginState } from '@/app/auth/login/actions'
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

const initialState: LoginState = {
  error: '',
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
      className='h-12 w-full rounded-2xl bg-emerald-600 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700'
    >
      {pending ? 'Entrando...' : 'Entrar no WstSide'}
      {!pending && <ArrowRight className='ml-2 size-4' />}
    </Button>
  )
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className='w-full'
    >
      <Card className='overflow-hidden rounded-[2rem] border-emerald-100/70 bg-white/85 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl'>
        <CardHeader className='space-y-4 pb-6'>
          <div className='flex items-center justify-between'>
            <div className='flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'>
              <Sparkles className='size-6' />
            </div>

            <div className='rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700'>
              V1
            </div>
          </div>

          <div className='space-y-2'>
            <CardTitle className='text-3xl font-black tracking-tight text-slate-950'>
              Bem-vindo de volta
            </CardTitle>

            <CardDescription className='text-base leading-relaxed text-slate-500'>
              Entre para acessar seu painel pessoal de rotina, finanças, metas e
              evolução.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form action={formAction} className='space-y-5'>
            {state.error ? (
              <Alert className='rounded-2xl border-red-200 bg-red-50 text-red-700'>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            ) : null}

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
                  className='h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 text-base shadow-none focus-visible:ring-emerald-500'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between gap-3'>
                <Label
                  htmlFor='password'
                  className='text-sm font-semibold text-slate-700'
                >
                  Senha
                </Label>

                <Link
                  href='/auth/forgot-password'
                  className='text-sm font-medium text-emerald-700 underline-offset-4 hover:underline'
                >
                  Esqueci minha senha
                </Link>
              </div>

              <div className='relative'>
                <LockKeyhole className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Digite sua senha'
                  required
                  autoComplete='current-password'
                  className='h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 pr-11 text-base shadow-none focus-visible:ring-emerald-500'
                />
                <Eye className='pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-300' />
              </div>
            </div>

            <SubmitButton />

            <div className='pt-2 text-center text-sm text-slate-500'>
              Ainda não tem conta?{' '}
              <Link
                href='/auth/sign-up'
                className='font-semibold text-emerald-700 underline-offset-4 hover:underline'
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
