'use client'

import { ArrowRight, Eye, LockKeyhole, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

export function UpdatePasswordForm({ className }: { className?: string }) {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleUpdatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)
    setError(null)

    if (password.length < 6) {
      setError('A nova senha precisa ter pelo menos 6 caracteres.')
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

      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        throw error
      }

      router.push('/dashboard')
    } catch {
      setError(
        'Não foi possível atualizar sua senha. Solicite um novo link de recuperação e tente novamente.',
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
    >
      <Card className='overflow-hidden rounded-[2rem] border-emerald-100/70 bg-white/85 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl'>
        <CardHeader className='space-y-4 pb-6'>
          <div className='flex items-center justify-between'>
            <div className='flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'>
              <ShieldCheck className='size-6' />
            </div>

            <div className='rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700'>
              Segurança
            </div>
          </div>

          <div className='space-y-2'>
            <CardTitle className='text-3xl font-black tracking-tight text-slate-950'>
              Criar nova senha
            </CardTitle>

            <CardDescription className='text-base leading-relaxed text-slate-500'>
              Informe sua nova senha para recuperar o acesso ao WstSide.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpdatePassword} className='space-y-5'>
            {error ? (
              <Alert className='rounded-2xl border-red-200 bg-red-50 text-red-700'>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <div className='space-y-2'>
              <Label
                htmlFor='password'
                className='text-sm font-semibold text-slate-700'
              >
                Nova senha
              </Label>

              <div className='relative'>
                <LockKeyhole className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Digite sua nova senha'
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
                Confirmar nova senha
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

            <div className='rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5'>
              <p className='text-sm font-bold text-slate-950'>
                Dica de segurança
              </p>
              <p className='mt-1 text-sm leading-6 text-slate-500'>
                Use uma senha com letras, números e símbolos. Evite repetir
                senhas usadas em outros serviços.
              </p>
            </div>

            <Button
              type='submit'
              disabled={isLoading}
              className='h-12 w-full rounded-2xl bg-emerald-600 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700'
            >
              {isLoading ? 'Salvando...' : 'Salvar nova senha'}
              {!isLoading && <ArrowRight className='ml-2 size-4' />}
            </Button>

            <div className='pt-2 text-center text-sm text-slate-500'>
              Já atualizou sua senha?{' '}
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
