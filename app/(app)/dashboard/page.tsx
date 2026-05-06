import {
  ArrowUpRight,
  CalendarCheck2,
  CheckCircle2,
  Flame,
  Goal,
  Plus,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from 'lucide-react'
import Link from 'next/link'
import { connection } from 'next/server'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const nextSteps = [
  'Cadastrar seu patrimônio atual',
  'Registrar sua primeira receita',
  'Registrar sua primeira despesa',
  'Criar uma meta financeira',
  'Montar sua rotina diária',
]

export default async function DashboardPage() {
  await connection()

  const today = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date())

  return (
    <div className='space-y-6'>
      <section className='flex flex-col justify-between gap-4 lg:flex-row lg:items-end'>
        <div className='space-y-2'>
          <Badge className='rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-100'>
            Dashboard inicial
          </Badge>

          <div>
            <h1 className='text-3xl font-black tracking-tight text-slate-950 sm:text-4xl'>
              Seu painel WstSide
            </h1>
            <p className='mt-2 text-sm font-medium capitalize text-slate-500'>
              {today}
            </p>
          </div>
        </div>

        <div className='flex gap-3'>
          <Button
            asChild
            className='h-11 rounded-2xl bg-emerald-600 px-5 font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700'
          >
            <Link href='/finances'>
              <Plus className='mr-2 size-4' />
              Novo registro
            </Link>
          </Button>
        </div>
      </section>

      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <Card className='rounded-[2rem] border-emerald-100 bg-white/85 shadow-xl shadow-emerald-950/5'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-emerald-700'>
                Patrimônio atual
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black text-slate-950'>
                R$ 0,00
              </CardTitle>
            </div>

            <div className='flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600'>
              <WalletCards className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 text-slate-500'>
              Comece cadastrando suas contas, reservas ou investimentos.
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border-blue-100 bg-white/85 shadow-xl shadow-emerald-950/5'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-blue-700'>
                Receitas do mês
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black text-slate-950'>
                R$ 0,00
              </CardTitle>
            </div>

            <div className='flex size-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600'>
              <TrendingUp className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 text-slate-500'>
              Entradas financeiras aparecerão aqui.
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border-red-100 bg-white/85 shadow-xl shadow-emerald-950/5'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-red-700'>
                Despesas do mês
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black text-slate-950'>
                R$ 0,00
              </CardTitle>
            </div>

            <div className='flex size-11 items-center justify-center rounded-2xl bg-red-50 text-red-600'>
              <TrendingDown className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 text-slate-500'>
              Saídas financeiras aparecerão aqui.
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border-orange-100 bg-white/85 shadow-xl shadow-emerald-950/5'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-orange-700'>
                Dias invicto
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black text-slate-950'>
                0 dias
              </CardTitle>
            </div>

            <div className='flex size-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600'>
              <Flame className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 text-slate-500'>
              Seu streak começa quando a rotina estiver ativa.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 xl:grid-cols-[1.2fr_0.8fr]'>
        <Card className='rounded-[2rem] border-slate-100 bg-white/85 shadow-xl shadow-emerald-950/5'>
          <CardHeader>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <CardTitle className='text-xl font-black text-slate-950'>
                  Resumo mensal
                </CardTitle>
                <CardDescription>
                  Visão inicial do seu fluxo financeiro.
                </CardDescription>
              </div>

              <Badge variant='outline' className='rounded-full'>
                V1
              </Badge>
            </div>
          </CardHeader>

          <CardContent className='grid gap-4 md:grid-cols-3'>
            <div className='rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5'>
              <p className='text-sm font-bold text-slate-500'>Saldo do mês</p>
              <p className='mt-2 text-2xl font-black text-slate-950'>R$ 0,00</p>
            </div>

            <div className='rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5'>
              <p className='text-sm font-bold text-slate-500'>Economia</p>
              <p className='mt-2 text-2xl font-black text-slate-950'>0%</p>
            </div>

            <div className='rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5'>
              <p className='text-sm font-bold text-slate-500'>Registros</p>
              <p className='mt-2 text-2xl font-black text-slate-950'>0</p>
            </div>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border-slate-100 bg-white/85 shadow-xl shadow-emerald-950/5'>
          <CardHeader>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <CardTitle className='text-xl font-black text-slate-950'>
                  Rotina de hoje
                </CardTitle>
                <CardDescription>
                  Progresso diário dos hábitos principais.
                </CardDescription>
              </div>

              <div className='flex size-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600'>
                <CalendarCheck2 className='size-5' />
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-bold text-slate-700'>Concluído</span>
              <span className='font-black text-slate-950'>0%</span>
            </div>

            <Progress value={0} />

            <Button
              asChild
              variant='outline'
              className='h-11 w-full rounded-2xl border-slate-200 bg-white font-semibold'
            >
              <Link href='/routine'>
                Criar rotina
                <ArrowUpRight className='ml-2 size-4' />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 xl:grid-cols-[0.8fr_1.2fr]'>
        <Card className='rounded-[2rem] border-slate-100 bg-white/85 shadow-xl shadow-emerald-950/5'>
          <CardHeader>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <CardTitle className='text-xl font-black text-slate-950'>
                  Metas financeiras
                </CardTitle>
                <CardDescription>
                  Suas metas simples aparecerão aqui.
                </CardDescription>
              </div>

              <div className='flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600'>
                <Goal className='size-5' />
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-4'>
            <div className='rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5'>
              <p className='text-sm font-bold text-slate-950'>
                Nenhuma meta ativa
              </p>
              <p className='mt-1 text-sm leading-6 text-slate-500'>
                Crie sua primeira meta para acompanhar progresso e prazo.
              </p>
            </div>

            <Button
              asChild
              variant='outline'
              className='h-11 w-full rounded-2xl border-slate-200 bg-white font-semibold'
            >
              <Link href='/goals'>
                Criar meta
                <ArrowUpRight className='ml-2 size-4' />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border-emerald-100 bg-emerald-950 text-white shadow-xl shadow-emerald-950/10'>
          <CardHeader>
            <CardTitle className='text-xl font-black'>
              Próximos passos da V1
            </CardTitle>
            <CardDescription className='text-emerald-50/70'>
              Complete essa base para liberar o dashboard real com dados.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-3'>
            {nextSteps.map((step, index) => (
              <div
                key={step}
                className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4'
              >
                <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm font-black text-emerald-100'>
                  {index + 1}
                </div>

                <p className='text-sm font-semibold text-emerald-50'>{step}</p>

                <CheckCircle2 className='ml-auto size-5 text-emerald-200/40' />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
