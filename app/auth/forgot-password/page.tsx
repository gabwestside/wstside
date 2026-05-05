import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

export default function ForgotPasswordPage() {
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
            <ForgotPasswordForm />
          </div>

          <p className='text-center text-xs text-slate-400 md:text-left'>
            Recupere seu acesso e volte para seu painel pessoal.
          </p>
        </div>

        <aside className='relative hidden border-l border-emerald-100/70 bg-emerald-950 p-10 text-white lg:block'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.35),transparent_32%),radial-gradient(circle_at_70%_80%,rgba(45,212,191,0.2),transparent_28%)]' />

          <div className='relative z-10 flex h-full flex-col justify-between'>
            <div className='space-y-4'>
              <div className='inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100 backdrop-blur'>
                Recuperação de acesso
              </div>

              <h1 className='max-w-xl text-5xl font-black leading-[0.95] tracking-tight'>
                Volte para o controle da sua rotina.
              </h1>

              <p className='max-w-md text-base leading-7 text-emerald-50/75'>
                Solicite um link seguro para redefinir sua senha e continuar
                usando o WstSide normalmente.
              </p>
            </div>

            <div className='grid gap-4'>
              <div className='rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-black/10 backdrop-blur'>
                <p className='text-xs font-bold uppercase tracking-[0.18em] text-emerald-200'>
                  Segurança
                </p>
                <p className='mt-3 text-4xl font-black'>Link por e-mail</p>
                <p className='mt-2 text-sm text-emerald-50/70'>
                  Você receberá um link para criar uma nova senha com segurança.
                </p>
              </div>

              <div className='grid grid-cols-3 gap-4'>
                <div className='rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide text-emerald-200'>
                    Conta
                  </p>
                  <p className='mt-2 text-3xl font-black'>01</p>
                </div>

                <div className='rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide text-emerald-200'>
                    E-mail
                  </p>
                  <p className='mt-2 text-3xl font-black'>02</p>
                </div>

                <div className='rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur'>
                  <p className='text-xs font-bold uppercase tracking-wide text-emerald-200'>
                    Senha
                  </p>
                  <p className='mt-2 text-3xl font-black'>03</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}
