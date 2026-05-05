import Link from 'next/link'
import { ArrowRight, CheckCircle2, MailCheck, Sparkles } from 'lucide-react'

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
                  <div className='flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'>
                    <MailCheck className='size-6' />
                  </div>

                  <div className='rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700'>
                    Quase lá
                  </div>
                </div>

                <div className='space-y-2'>
                  <CardTitle className='text-3xl font-black tracking-tight text-slate-950'>
                    Confirme seu e-mail
                  </CardTitle>

                  <CardDescription className='text-base leading-relaxed text-slate-500'>
                    Sua conta foi criada. Agora falta confirmar seu e-mail para
                    liberar o acesso ao WstSide.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className='space-y-6'>
                <div className='rounded-[1.5rem] border border-emerald-100 bg-emerald-50/70 p-5'>
                  <div className='flex gap-4'>
                    <div className='flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white'>
                      <CheckCircle2 className='size-5' />
                    </div>

                    <div className='space-y-1'>
                      <p className='font-bold text-slate-950'>
                        Verifique sua caixa de entrada
                      </p>
                      <p className='text-sm leading-6 text-slate-600'>
                        Enviamos um link de confirmação para o e-mail
                        cadastrado. Clique no link para ativar sua conta antes
                        de fazer login.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-3 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5'>
                  <p className='text-sm font-bold text-slate-950'>
                    Não encontrou o e-mail?
                  </p>

                  <p className='text-sm leading-6 text-slate-500'>
                    Confira a aba de promoções, spam ou lixo eletrônico. O envio
                    pode levar alguns minutos dependendo do provedor.
                  </p>
                </div>

                <Button
                  asChild
                  className='h-12 w-full rounded-2xl bg-emerald-600 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700'
                >
                  <Link href='/auth/login'>
                    Ir para login
                    <ArrowRight className='ml-2 size-4' />
                  </Link>
                </Button>

                <div className='text-center text-sm text-slate-500'>
                  Usou o e-mail errado?{' '}
                  <Link
                    href='/auth/sign-up'
                    className='font-semibold text-emerald-700 underline-offset-4 hover:underline'
                  >
                    Criar outra conta
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className='text-center text-xs text-slate-400 md:text-left'>
            Depois da confirmação, você poderá acessar seu painel pessoal.
          </p>
        </div>

        <aside className='relative hidden border-l border-emerald-100/70 bg-emerald-950 p-10 text-white lg:block'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.35),transparent_32%),radial-gradient(circle_at_70%_80%,rgba(45,212,191,0.2),transparent_28%)]' />

          <div className='relative z-10 flex h-full flex-col justify-between'>
            <div className='space-y-4'>
              <div className='inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100 backdrop-blur'>
                Conta criada
              </div>

              <h1 className='max-w-xl text-5xl font-black leading-[0.95] tracking-tight'>
                O primeiro passo do seu sistema pessoal foi dado.
              </h1>

              <p className='max-w-md text-base leading-7 text-emerald-50/75'>
                Confirme seu e-mail e comece a construir sua central de
                finanças, rotina, metas e evolução.
              </p>
            </div>

            <div className='grid gap-4'>
              <div className='rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-black/10 backdrop-blur'>
                <div className='flex items-center gap-3'>
                  <div className='flex size-11 items-center justify-center rounded-2xl bg-white/10'>
                    <Sparkles className='size-5 text-emerald-200' />
                  </div>

                  <div>
                    <p className='text-xs font-bold uppercase tracking-[0.18em] text-emerald-200'>
                      Próxima etapa
                    </p>
                    <p className='mt-1 text-xl font-black'>Ativar sua conta</p>
                  </div>
                </div>

                <p className='mt-4 text-sm leading-6 text-emerald-50/70'>
                  Após confirmar o e-mail, você será liberado para entrar no
                  ambiente privado do WstSide.
                </p>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div className='rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide text-emerald-200'>
                    Conta
                  </p>
                  <p className='mt-2 text-3xl font-black'>OK</p>
                </div>

                <div className='rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide text-emerald-200'>
                    E-mail
                  </p>
                  <p className='mt-2 text-3xl font-black'>→</p>
                </div>

                <div className='rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide text-emerald-200'>
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
