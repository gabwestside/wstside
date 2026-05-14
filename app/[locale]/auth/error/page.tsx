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
      <div
        className='rounded-[1.5rem] border p-5'
        style={{
          background: 'color-mix(in srgb, var(--ws-danger) 10%, transparent)',
          borderColor: 'color-mix(in srgb, var(--ws-danger) 24%, transparent)',
        }}
      >
        <div className='flex gap-4'>
          <div
            className='flex size-10 shrink-0 items-center justify-center rounded-2xl text-white'
            style={{ background: 'var(--ws-danger)' }}
          >
            <AlertTriangle className='size-5' />
          </div>

          <div className='space-y-1'>
            <p className='font-bold ws-heading'>
              Não foi possível concluir esta ação
            </p>

            <p className='text-sm leading-6 ws-muted'>
              O link pode ter expirado, a sessão pode não estar mais ativa ou a
              solicitação pode estar inválida.
            </p>
          </div>
        </div>
      </div>

      {errorCode ? (
        <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
          <p className='text-sm font-bold ws-heading'>Código técnico</p>
          <p className='mt-1 break-words text-sm leading-6 ws-muted'>
            {errorCode}
          </p>
        </div>
      ) : (
        <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
          <p className='text-sm font-bold ws-heading'>Erro não especificado</p>
          <p className='mt-1 text-sm leading-6 ws-muted'>
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
    <main className='relative min-h-svh overflow-hidden ws-app-bg'>
      <section className='relative z-10 grid min-h-svh lg:grid-cols-[1fr_0.95fr]'>
        <div className='flex min-h-svh flex-col justify-between px-6 py-8 md:px-10 lg:px-14'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 items-center justify-center rounded-2xl ws-primary text-sm font-black shadow-lg'>
              W
            </div>

            <div>
              <p className='text-sm font-black uppercase tracking-[0.22em] ws-heading'>
                WstSide
              </p>
              <p className='text-xs font-medium ws-muted'>
                Life Operating System
              </p>
            </div>
          </div>

          <div className='mx-auto flex w-full max-w-md flex-1 items-center py-10'>
            <Card className='w-full overflow-hidden rounded-[2rem] border ws-border ws-surface shadow-2xl backdrop-blur-xl'>
              <CardHeader className='space-y-4 pb-6'>
                <div className='flex items-center justify-between'>
                  <div
                    className='flex size-12 items-center justify-center rounded-2xl text-white shadow-lg'
                    style={{
                      background: 'var(--ws-danger)',
                      boxShadow:
                        '0 16px 40px color-mix(in srgb, var(--ws-danger) 25%, transparent)',
                    }}
                  >
                    <ShieldAlert className='size-6' />
                  </div>

                  <div
                    className='rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide'
                    style={{
                      color: 'var(--ws-danger)',
                      background:
                        'color-mix(in srgb, var(--ws-danger) 10%, transparent)',
                      borderColor:
                        'color-mix(in srgb, var(--ws-danger) 22%, transparent)',
                    }}
                  >
                    Erro
                  </div>
                </div>

                <div className='space-y-2'>
                  <CardTitle className='text-3xl font-black tracking-tight ws-heading'>
                    Algo deu errado
                  </CardTitle>

                  <CardDescription className='text-base leading-relaxed ws-muted'>
                    Não conseguimos concluir essa etapa de autenticação.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className='space-y-6'>
                <Suspense
                  fallback={
                    <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
                      <p className='text-sm ws-muted'>
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
                    className='h-12 w-full rounded-2xl ws-primary text-base font-semibold shadow-lg transition'
                  >
                    <Link href='/auth/login'>
                      <ArrowLeft className='mr-2 size-4' />
                      Voltar para login
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant='outline'
                    className='h-12 w-full rounded-2xl border ws-border ws-surface-solid text-base font-semibold ws-heading hover:bg-[var(--ws-primary-soft)] hover:text-[var(--ws-primary-text)]'
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

          <p className='text-center text-xs ws-muted md:text-left'>
            Se o problema continuar, gere um novo link ou tente entrar
            novamente.
          </p>
        </div>

        <aside className='relative hidden border-l ws-border ws-primary p-10 lg:block'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,currentColor_18%,transparent),transparent_32%),radial-gradient(circle_at_70%_80%,color-mix(in_srgb,currentColor_12%,transparent),transparent_28%)]' />

          <div className='relative z-10 flex h-full flex-col justify-between'>
            <div className='space-y-4'>
              <div className='inline-flex rounded-full border border-current/10 bg-current/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur'>
                Fluxo interrompido
              </div>

              <h1 className='max-w-xl text-5xl font-black leading-[0.95] tracking-tight'>
                Vamos colocar seu acesso de volta no caminho certo.
              </h1>

              <p className='max-w-md text-base leading-7 opacity-75'>
                Alguns links de autenticação têm validade limitada. Quando isso
                acontece, basta iniciar o fluxo novamente.
              </p>
            </div>

            <div className='grid gap-4'>
              <div className='rounded-[2rem] border border-current/10 bg-current/10 p-5 shadow-2xl backdrop-blur'>
                <p className='text-xs font-bold uppercase tracking-[0.18em] opacity-75'>
                  Caminho recomendado
                </p>
                <p className='mt-3 text-4xl font-black'>Tentar novamente</p>
                <p className='mt-2 text-sm opacity-75'>
                  Volte para o login ou solicite um novo link de recuperação.
                </p>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div className='rounded-[1.5rem] border border-current/10 bg-current/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide opacity-75'>
                    Login
                  </p>
                  <p className='mt-2 text-3xl font-black'>01</p>
                </div>

                <div className='rounded-[1.5rem] border border-current/10 bg-current/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide opacity-75'>
                    Link
                  </p>
                  <p className='mt-2 text-3xl font-black'>02</p>
                </div>

                <div className='rounded-[1.5rem] border border-current/10 bg-current/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide opacity-75'>
                    Acesso
                  </p>
                  <p className='mt-2 text-3xl font-black'>03</p>
                </div>
              </div>

              <Button
                asChild
                variant='secondary'
                className='h-12 rounded-2xl border border-current/10 bg-current/10 text-base font-semibold text-current hover:bg-current/15'
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
