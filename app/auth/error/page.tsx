import {
  AlertTriangle,
  ArrowLeft,
  Home,
  RefreshCw,
  ShieldAlert,
} from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const errorCode = params?.error

  return (
    <div className='space-y-6'>
      <div className='rounded-[1.5rem] border border-red-100 bg-red-50/80 p-5'>
        <div className='flex gap-4'>
          <div className='flex size-10 shrink-0 items-center justify-center rounded-2xl bg-red-500 text-white'>
            <AlertTriangle className='size-5' />
          </div>

          <div className='space-y-1'>
            <p className='font-bold text-slate-950'>
              Não foi possível concluir esta ação
            </p>

            <p className='text-sm leading-6 text-slate-600'>
              O link pode ter expirado, a sessão pode não estar mais ativa ou a
              solicitação pode estar inválida.
            </p>
          </div>
        </div>
      </div>

      {errorCode ? (
        <div className='rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5'>
          <p className='text-sm font-bold text-slate-950'>Código técnico</p>
          <p className='mt-1 break-words text-sm leading-6 text-slate-500'>
            {errorCode}
          </p>
        </div>
      ) : (
        <div className='rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5'>
          <p className='text-sm font-bold text-slate-950'>
            Erro não especificado
          </p>
          <p className='mt-1 text-sm leading-6 text-slate-500'>
            Nenhum código de erro foi informado. Tente iniciar o fluxo
            novamente.
          </p>
        </div>
      )}
    </div>
  )
}

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  return (
    <main className='relative min-h-svh overflow-hidden bg-[#f4fbf7]'>
      <div className='absolute left-[-10%] top-[-10%] size-72 rounded-full bg-emerald-300/30 blur-3xl' />
      <div className='absolute bottom-[-12%] right-[-10%] size-80 rounded-full bg-teal-300/25 blur-3xl' />
      <div className='absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-3xl' />

      <section className='relative z-10 grid min-h-svh lg:grid-cols-[1fr_0.95fr]'>
        <div className='flex min-h-svh flex-col justify-between px-6 py-8 md:px-10 lg:px-14'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-950/15'>
              W
            </div>

            <div>
              <p className='text-sm font-black uppercase tracking-[0.22em] text-slate-950'>
                WstSide
              </p>
              <p className='text-xs font-medium text-slate-500'>
                Life Operating System
              </p>
            </div>
          </div>

          <div className='mx-auto flex w-full max-w-md flex-1 items-center py-10'>
            <Card className='w-full overflow-hidden rounded-[2rem] border-emerald-100/70 bg-white/85 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl'>
              <CardHeader className='space-y-4 pb-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex size-12 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/25'>
                    <ShieldAlert className='size-6' />
                  </div>

                  <div className='rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-700'>
                    Erro
                  </div>
                </div>

                <div className='space-y-2'>
                  <CardTitle className='text-3xl font-black tracking-tight text-slate-950'>
                    Algo deu errado
                  </CardTitle>

                  <CardDescription className='text-base leading-relaxed text-slate-500'>
                    Não conseguimos concluir essa etapa de autenticação.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className='space-y-6'>
                <Suspense
                  fallback={
                    <div className='rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5'>
                      <p className='text-sm text-slate-500'>
                        Carregando detalhes do erro...
                      </p>
                    </div>
                  }
                >
                  <ErrorContent searchParams={searchParams} />
                </Suspense>

                <div className='grid gap-3'>
                  <Button
                    asChild
                    className='h-12 w-full rounded-2xl bg-emerald-600 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700'
                  >
                    <Link href='/auth/login'>
                      <ArrowLeft className='mr-2 size-4' />
                      Voltar para login
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant='outline'
                    className='h-12 w-full rounded-2xl border-slate-200 bg-white text-base font-semibold text-slate-700 hover:bg-slate-50'
                  >
                    <Link href='/auth/forgot-password'>
                      <RefreshCw className='mr-2 size-4' />
                      Recuperar acesso
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className='text-center text-xs text-slate-400 md:text-left'>
            Se o problema continuar, gere um novo link ou tente entrar
            novamente.
          </p>
        </div>

        <aside className='relative hidden border-l border-emerald-100/70 bg-emerald-950 p-10 text-white lg:block'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.35),transparent_32%),radial-gradient(circle_at_70%_80%,rgba(45,212,191,0.2),transparent_28%)]' />

          <div className='relative z-10 flex h-full flex-col justify-between'>
            <div className='space-y-4'>
              <div className='inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100 backdrop-blur'>
                Fluxo interrompido
              </div>

              <h1 className='max-w-xl text-5xl font-black leading-[0.95] tracking-tight'>
                Vamos colocar seu acesso de volta no caminho certo.
              </h1>

              <p className='max-w-md text-base leading-7 text-emerald-50/75'>
                Alguns links de autenticação têm validade limitada. Quando isso
                acontece, basta iniciar o fluxo novamente.
              </p>
            </div>

            <div className='grid gap-4'>
              <div className='rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-black/10 backdrop-blur'>
                <p className='text-xs font-bold uppercase tracking-[0.18em] text-emerald-200'>
                  Caminho recomendado
                </p>
                <p className='mt-3 text-4xl font-black'>Tentar novamente</p>
                <p className='mt-2 text-sm text-emerald-50/70'>
                  Volte para o login ou solicite um novo link de recuperação.
                </p>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div className='rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide text-emerald-200'>
                    Login
                  </p>
                  <p className='mt-2 text-3xl font-black'>01</p>
                </div>

                <div className='rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide text-emerald-200'>
                    Link
                  </p>
                  <p className='mt-2 text-3xl font-black'>02</p>
                </div>

                <div className='rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide text-emerald-200'>
                    Acesso
                  </p>
                  <p className='mt-2 text-3xl font-black'>03</p>
                </div>
              </div>

              <Button
                asChild
                variant='secondary'
                className='h-12 rounded-2xl border border-white/10 bg-white/10 text-base font-semibold text-white hover:bg-white/15'
              >
                <Link href='/'>
                  <Home className='mr-2 size-4' />
                  Ir para início
                </Link>
              </Button>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}
