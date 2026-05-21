import Link from 'next/link'

export default function GlobalNotFoundPage() {
  return (
    <main className='flex min-h-svh items-center justify-center ws-app-bg px-6'>
      <div className='w-full max-w-md rounded-[2rem] border ws-border ws-surface p-8 text-center shadow-2xl'>
        <div className='mx-auto flex size-14 items-center justify-center rounded-2xl ws-primary text-xl font-black'>
          404
        </div>

        <h1 className='mt-6 text-3xl font-black ws-heading'>
          Página não encontrada
        </h1>

        <p className='mt-2 text-sm leading-6 ws-muted'>
          A página solicitada não existe ou foi movida.
        </p>

        <Link
          href='/auth/login'
          className='mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl ws-primary text-sm font-bold shadow-lg'
        >
          Voltar para login
        </Link>
      </div>
    </main>
  )
}
