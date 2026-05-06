import { Loader2 } from 'lucide-react'

export function AppLoading() {
  return (
    <div className='flex min-h-svh items-center justify-center bg-[#f4fbf7] px-6'>
      <div className='flex flex-col items-center gap-4'>
        <div className='flex size-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'>
          <Loader2 className='size-6 animate-spin' />
        </div>

        <div className='text-center'>
          <p className='text-sm font-black uppercase tracking-[0.22em] text-slate-950'>
            WstSide
          </p>
          <p className='mt-1 text-sm text-slate-500'>
            Carregando seu painel...
          </p>
        </div>
      </div>
    </div>
  )
}
