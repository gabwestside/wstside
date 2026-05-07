import { Trash2, WalletCards } from 'lucide-react'

import { deleteFinancialAccountAction } from '@/app/(app)/finances/actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/formatters'

export type FinancialAccount = {
  id: string
  name: string
  type: string
  balance: number
  created_at: string
}

type FinancialAccountsListProps = {
  accounts: FinancialAccount[]
}

export function FinancialAccountsList({
  accounts,
}: FinancialAccountsListProps) {
  if (accounts.length === 0) {
    return (
      <div className='rounded-[2rem] border border-dashed border-emerald-200 bg-emerald-50/50 p-8 text-center'>
        <div className='mx-auto flex size-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm'>
          <WalletCards className='size-7' />
        </div>

        <h3 className='mt-4 text-lg font-black text-slate-950'>
          Nenhum patrimônio cadastrado
        </h3>
        <p className='mt-2 text-sm leading-6 text-slate-500'>
          Cadastre sua primeira conta, reserva ou investimento para iniciar sua
          máquina de capital.
        </p>
      </div>
    )
  }

  return (
    <div className='grid gap-3'>
      {accounts.map((account) => (
        <div
          key={account.id}
          className='flex items-center justify-between gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50 p-4'
        >
          <div className='min-w-0'>
            <div className='flex flex-wrap items-center gap-2'>
              <p className='truncate font-bold text-slate-950'>
                {account.name}
              </p>
              <Badge
                variant='outline'
                className='rounded-full border-emerald-100 bg-white text-emerald-700'
              >
                {account.type}
              </Badge>
            </div>

            <p className='mt-1 text-sm font-black text-emerald-700'>
              {formatCurrency(Number(account.balance))}
            </p>
          </div>

          <form action={deleteFinancialAccountAction}>
            <input type='hidden' name='accountId' value={account.id} />
            <Button
              type='submit'
              variant='ghost'
              size='icon'
              className='size-10 rounded-2xl text-slate-400 hover:bg-red-50 hover:text-red-600'
              aria-label={`Excluir ${account.name}`}
            >
              <Trash2 className='size-4' />
            </Button>
          </form>
        </div>
      ))}
    </div>
  )
}
