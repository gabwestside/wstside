import {
  ArrowUpRight,
  BadgeDollarSign,
  Landmark,
  PiggyBank,
  WalletCards,
} from 'lucide-react'
import { redirect } from 'next/navigation'

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
import { formatCurrency } from '@/lib/formatters'
import { createClient } from '@/lib/supabase/server'

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
          <Badge className='rounded-full border ws-border ws-primary-soft px-3 py-1 hover:bg-[var(--ws-primary-soft)]'>
            Finanças
          </Badge>

          <div>
            <h1 className='text-3xl font-black tracking-tight ws-heading sm:text-4xl'>
              Máquina de capital
            </h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 ws-muted'>
              Cadastre seu patrimônio atual para o WstSide começar a mapear sua
              base financeira.
            </p>
          </div>
        </div>
      </section>

      {error ? (
        <Card className='rounded-[2rem] border ws-border ws-surface-muted shadow-xl'>
          <CardHeader>
            <CardTitle className='text-[var(--ws-danger)]'>
              Não foi possível carregar seus dados
            </CardTitle>
            <CardDescription className='text-[var(--ws-danger)] opacity-80'>
              Tente atualizar a página ou entrar novamente.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-[var(--ws-primary-text)]'>
                Patrimônio total
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black ws-heading'>
                {formatCurrency(totalPatrimony)}
              </CardTitle>
            </div>

            <div className='flex size-11 items-center justify-center rounded-2xl ws-primary-soft'>
              <WalletCards className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 ws-muted'>
              Soma de todos os ativos cadastrados.
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-[var(--ws-info)]'>
                Itens cadastrados
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black ws-heading'>
                {accountCount}
              </CardTitle>
            </div>

            <div
              className='flex size-11 items-center justify-center rounded-2xl'
              style={{
                background:
                  'color-mix(in srgb, var(--ws-info) 14%, transparent)',
                color: 'var(--ws-info)',
              }}
            >
              <Landmark className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 ws-muted'>
              Contas, reservas e investimentos.
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-[var(--ws-warning)]'>
                Reserva
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black ws-heading'>
                {formatCurrency(reserveTotal)}
              </CardTitle>
            </div>

            <div
              className='flex size-11 items-center justify-center rounded-2xl'
              style={{
                background:
                  'color-mix(in srgb, var(--ws-warning) 14%, transparent)',
                color: 'var(--ws-warning)',
              }}
            >
              <PiggyBank className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 ws-muted'>
              Total marcado como reserva.
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-[var(--ws-primary-text)]'>
                Investimentos
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black ws-heading'>
                {formatCurrency(investmentTotal)}
              </CardTitle>
            </div>

            <div className='flex size-11 items-center justify-center rounded-2xl ws-primary-soft'>
              <BadgeDollarSign className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 ws-muted'>
              Total marcado como investimento.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 xl:grid-cols-[0.9fr_1.1fr]'>
        <FinancialAccountForm />

        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <CardTitle className='text-2xl font-black ws-heading'>
                  Patrimônio cadastrado
                </CardTitle>
                <CardDescription className='ws-muted'>
                  Lista dos ativos que compõem seu patrimônio atual.
                </CardDescription>
              </div>

              <div className='hidden size-11 items-center justify-center rounded-2xl ws-primary-soft sm:flex'>
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
