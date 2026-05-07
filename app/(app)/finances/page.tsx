import { redirect } from 'next/navigation'
import {
  ArrowUpRight,
  BadgeDollarSign,
  Landmark,
  PiggyBank,
  WalletCards,
} from 'lucide-react'

import { FinancialAccountForm } from '@/components/finances/financial-account-form'
import {
  FinancialAccountsList,
  type FinancialAccount,
} from '@/components/finances/financial-accounts-list'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'
import { formatCurrency } from '@/lib/formatters'

export default async function FinancesPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/auth/login')
  }

  const { data, error } = await supabase
    .from('financial_accounts')
    .select('id, name, type, balance, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const accounts = (data ?? []) as FinancialAccount[]

  const totalPatrimony = accounts.reduce(
    (total, account) => total + Number(account.balance),
    0,
  )

  const accountCount = accounts.length

  const investmentTotal = accounts
    .filter((account) => account.type === 'Investimento')
    .reduce((total, account) => total + Number(account.balance), 0)

  const reserveTotal = accounts
    .filter((account) => account.type === 'Reserva')
    .reduce((total, account) => total + Number(account.balance), 0)

  return (
    <div className='space-y-6'>
      <section className='flex flex-col justify-between gap-4 lg:flex-row lg:items-end'>
        <div className='space-y-2'>
          <Badge className='rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-100'>
            Finanças
          </Badge>

          <div>
            <h1 className='text-3xl font-black tracking-tight text-slate-950 sm:text-4xl'>
              Máquina de capital
            </h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-500'>
              Cadastre seu patrimônio atual para o WstSide começar a mapear sua
              base financeira.
            </p>
          </div>
        </div>
      </section>

      {error ? (
        <Card className='rounded-[2rem] border-red-100 bg-red-50 shadow-xl shadow-red-950/5'>
          <CardHeader>
            <CardTitle className='text-red-700'>
              Não foi possível carregar seus dados
            </CardTitle>
            <CardDescription className='text-red-600'>
              Tente atualizar a página ou entrar novamente.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <Card className='rounded-[2rem] border-emerald-100 bg-white/85 shadow-xl shadow-emerald-950/5'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-emerald-700'>
                Patrimônio total
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black text-slate-950'>
                {formatCurrency(totalPatrimony)}
              </CardTitle>
            </div>

            <div className='flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600'>
              <WalletCards className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 text-slate-500'>
              Soma de todos os ativos cadastrados.
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border-blue-100 bg-white/85 shadow-xl shadow-emerald-950/5'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-blue-700'>
                Itens cadastrados
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black text-slate-950'>
                {accountCount}
              </CardTitle>
            </div>

            <div className='flex size-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600'>
              <Landmark className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 text-slate-500'>
              Contas, reservas e investimentos.
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border-orange-100 bg-white/85 shadow-xl shadow-emerald-950/5'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-orange-700'>
                Reserva
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black text-slate-950'>
                {formatCurrency(reserveTotal)}
              </CardTitle>
            </div>

            <div className='flex size-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600'>
              <PiggyBank className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 text-slate-500'>
              Total marcado como reserva.
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border-violet-100 bg-white/85 shadow-xl shadow-emerald-950/5'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-violet-700'>
                Investimentos
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black text-slate-950'>
                {formatCurrency(investmentTotal)}
              </CardTitle>
            </div>

            <div className='flex size-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600'>
              <BadgeDollarSign className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 text-slate-500'>
              Total marcado como investimento.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 xl:grid-cols-[0.9fr_1.1fr]'>
        <FinancialAccountForm />

        <Card className='rounded-[2rem] border-slate-100 bg-white/85 shadow-xl shadow-emerald-950/5'>
          <CardHeader>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <CardTitle className='text-2xl font-black text-slate-950'>
                  Patrimônio cadastrado
                </CardTitle>
                <CardDescription>
                  Lista dos ativos que compõem seu patrimônio atual.
                </CardDescription>
              </div>

              <div className='hidden size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 sm:flex'>
                <ArrowUpRight className='size-5' />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <FinancialAccountsList accounts={accounts} />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
