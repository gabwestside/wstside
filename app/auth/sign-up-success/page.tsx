import { ArrowRight, CheckCircle2, MailCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function SignUpSuccessPage() {
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
                  <div className='flex size-12 items-center justify-center rounded-2xl ws-primary shadow-lg'>
                    <MailCheck className='size-6' />
                  </div>

                  <div className='rounded-full border ws-border ws-primary-soft px-3 py-1 text-xs font-bold uppercase tracking-wide'>
                    Quase lá
                  </div>
                </div>

                <div className='space-y-2'>
                  <CardTitle className='text-3xl font-black tracking-tight ws-heading'>
                    Confirme seu e-mail
                  </CardTitle>

                  <CardDescription className='text-base leading-relaxed ws-muted'>
                    Sua conta foi criada. Agora falta confirmar seu e-mail para
                    liberar o acesso ao WstSide.
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
                        Verifique sua caixa de entrada
                      </p>
                      <p className='text-sm leading-6 ws-muted'>
                        Enviamos um link de confirmação para o e-mail
                        cadastrado. Clique no link para ativar sua conta antes
                        de fazer login.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-3 rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
                  <p className='text-sm font-bold ws-heading'>
                    Não encontrou o e-mail?
                  </p>

                  <p className='text-sm leading-6 ws-muted'>
                    Confira a aba de promoções, spam ou lixo eletrônico. O envio
                    pode levar alguns minutos dependendo do provedor.
                  </p>
                </div>

                <Button
                  asChild
                  className='h-12 w-full rounded-2xl ws-primary text-base font-semibold shadow-lg transition'
                >
                  <Link href='/auth/login'>
                    Ir para login
                    <ArrowRight className='ml-2 size-4' />
                  </Link>
                </Button>

                <div className='text-center text-sm ws-muted'>
                  Usou o e-mail errado?{' '}
                  <Link
                    href='/auth/sign-up'
                    className='font-semibold text-[var(--ws-primary-text)] underline-offset-4 hover:underline'
                  >
                    Criar outra conta
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className='text-center text-xs ws-muted md:text-left'>
            Depois da confirmação, você poderá acessar seu painel pessoal.
          </p>
        </div>

        <aside className='relative hidden border-l ws-border ws-primary p-10 lg:block'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,currentColor_18%,transparent),transparent_32%),radial-gradient(circle_at_70%_80%,color-mix(in_srgb,currentColor_12%,transparent),transparent_28%)]' />

          <div className='relative z-10 flex h-full flex-col justify-between'>
            <div className='space-y-4'>
              <div className='inline-flex rounded-full border border-current/10 bg-current/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur'>
                Conta criada
              </div>

              <h1 className='max-w-xl text-5xl font-black leading-[0.95] tracking-tight'>
                O primeiro passo do seu sistema pessoal foi dado.
              </h1>

              <p className='max-w-md text-base leading-7 opacity-75'>
                Confirme seu e-mail e comece a construir sua central de
                finanças, rotina, metas e evolução.
              </p>
            </div>

            <div className='grid gap-4'>
              <div className='rounded-[2rem] border border-current/10 bg-current/10 p-5 shadow-2xl backdrop-blur'>
                <div className='flex items-center gap-3'>
                  <div className='flex size-11 items-center justify-center rounded-2xl bg-current/10'>
                    <Sparkles className='size-5 opacity-75' />
                  </div>

                  <div>
                    <p className='text-xs font-bold uppercase tracking-[0.18em] opacity-75'>
                      Próxima etapa
                    </p>
                    <p className='mt-1 text-xl font-black'>Ativar sua conta</p>
                  </div>
                </div>

                <p className='mt-4 text-sm leading-6 opacity-75'>
                  Após confirmar o e-mail, você será liberado para entrar no
                  ambiente privado do WstSide.
                </p>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div className='rounded-[1.5rem] border border-current/10 bg-current/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide opacity-75'>
                    Conta
                  </p>
                  <p className='mt-2 text-3xl font-black'>OK</p>
                </div>

                <div className='rounded-[1.5rem] border border-current/10 bg-current/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide opacity-75'>
                    E-mail
                  </p>
                  <p className='mt-2 text-3xl font-black'>→</p>
                </div>

                <div className='rounded-[1.5rem] border border-current/10 bg-current/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide opacity-75'>
                    Acesso
                  </p>
                  <p className='mt-2 text-3xl font-black'>ON</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}
