import { Loader2 } from 'lucide-react'

export function AppLoading() {
  return (
    <div className='flex min-h-svh items-center justify-center ws-app-bg px-6'>
      <div className='flex flex-col items-center gap-4'>
        <div className='flex size-14 items-center justify-center rounded-2xl ws-primary shadow-lg'>
          <Loader2 className='size-6 animate-spin' />
        </div>

        <div className='text-center'>
          <p className='text-sm font-black uppercase tracking-[0.22em] ws-heading'>
            WstSide
          </p>
          <p className='mt-1 text-sm ws-muted'>Carregando seu painel...</p>
        </div>
      </div>
    </div>
  )
}
