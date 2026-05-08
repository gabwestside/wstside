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
          <Badge className='rounded-full border ws-border ws-primary-soft px-3 py-1 hover:bg-[var(--ws-primary-soft)]'>
            Dashboard inicial
          </Badge>

          <div>
            <h1 className='text-3xl font-black tracking-tight ws-heading sm:text-4xl'>
              Seu painel WstSide
            </h1>
            <p className='mt-2 text-sm font-medium capitalize ws-muted'>
              {today}
            </p>
          </div>
        </div>

        <div className='flex gap-3'>
          <Button
            asChild
            className='h-11 rounded-2xl ws-primary px-5 font-semibold shadow-lg'
          >
            <Link href='/finances'>
              <Plus className='mr-2 size-4' />
              Novo registro
            </Link>
          </Button>
        </div>
      </section>

      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-[var(--ws-primary-text)]'>
                Patrimônio atual
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black ws-heading'>
                R$ 0,00
              </CardTitle>
            </div>

            <div className='flex size-11 items-center justify-center rounded-2xl ws-primary-soft'>
              <WalletCards className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 ws-muted'>
              Comece cadastrando suas contas, reservas ou investimentos.
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-[var(--ws-info)]'>
                Receitas do mês
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black ws-heading'>
                R$ 0,00
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
              <TrendingUp className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 ws-muted'>
              Entradas financeiras aparecerão aqui.
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-[var(--ws-danger)]'>
                Despesas do mês
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black ws-heading'>
                R$ 0,00
              </CardTitle>
            </div>

            <div
              className='flex size-11 items-center justify-center rounded-2xl'
              style={{
                background:
                  'color-mix(in srgb, var(--ws-danger) 14%, transparent)',
                color: 'var(--ws-danger)',
              }}
            >
              <TrendingDown className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 ws-muted'>
              Saídas financeiras aparecerão aqui.
            </p>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-3'>
            <div>
              <CardDescription className='font-bold uppercase tracking-wide text-[var(--ws-warning)]'>
                Dias invicto
              </CardDescription>
              <CardTitle className='mt-2 text-3xl font-black ws-heading'>
                0 dias
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
              <Flame className='size-5' />
            </div>
          </CardHeader>

          <CardContent>
            <p className='text-sm leading-6 ws-muted'>
              Seu streak começa quando a rotina estiver ativa.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className='grid gap-4 xl:grid-cols-[1.2fr_0.8fr]'>
        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <CardTitle className='text-xl font-black ws-heading'>
                  Resumo mensal
                </CardTitle>
                <CardDescription className='ws-muted'>
                  Visão inicial do seu fluxo financeiro.
                </CardDescription>
              </div>

              <Badge
                variant='outline'
                className='rounded-full border ws-border ws-surface-muted ws-muted'
              >
                V1
              </Badge>
            </div>
          </CardHeader>

          <CardContent className='grid gap-4 md:grid-cols-3'>
            <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
              <p className='text-sm font-bold ws-muted'>Saldo do mês</p>
              <p className='mt-2 text-2xl font-black ws-heading'>R$ 0,00</p>
            </div>

            <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
              <p className='text-sm font-bold ws-muted'>Economia</p>
              <p className='mt-2 text-2xl font-black ws-heading'>0%</p>
            </div>

            <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
              <p className='text-sm font-bold ws-muted'>Registros</p>
              <p className='mt-2 text-2xl font-black ws-heading'>0</p>
            </div>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <CardTitle className='text-xl font-black ws-heading'>
                  Rotina de hoje
                </CardTitle>
                <CardDescription className='ws-muted'>
                  Progresso diário dos hábitos principais.
                </CardDescription>
              </div>

              <div
                className='flex size-11 items-center justify-center rounded-2xl'
                style={{
                  background:
                    'color-mix(in srgb, var(--ws-info) 14%, transparent)',
                  color: 'var(--ws-info)',
                }}
              >
                <CalendarCheck2 className='size-5' />
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-bold ws-heading'>Concluído</span>
              <span className='font-black ws-heading'>0%</span>
            </div>

            <Progress value={0} />

            <Button
              asChild
              variant='outline'
              className='h-11 w-full rounded-2xl border ws-border ws-surface-solid font-semibold ws-heading hover:bg-[var(--ws-primary-soft)] hover:text-[var(--ws-primary-text)]'
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
        <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
          <CardHeader>
            <div className='flex items-center justify-between gap-3'>
              <div>
                <CardTitle className='text-xl font-black ws-heading'>
                  Metas financeiras
                </CardTitle>
                <CardDescription className='ws-muted'>
                  Suas metas simples aparecerão aqui.
                </CardDescription>
              </div>

              <div className='flex size-11 items-center justify-center rounded-2xl ws-primary-soft'>
                <Goal className='size-5' />
              </div>
            </div>
          </CardHeader>

          <CardContent className='space-y-4'>
            <div className='rounded-[1.5rem] border ws-border ws-surface-muted p-5'>
              <p className='text-sm font-bold ws-heading'>Nenhuma meta ativa</p>
              <p className='mt-1 text-sm leading-6 ws-muted'>
                Crie sua primeira meta para acompanhar progresso e prazo.
              </p>
            </div>

            <Button
              asChild
              variant='outline'
              className='h-11 w-full rounded-2xl border ws-border ws-surface-solid font-semibold ws-heading hover:bg-[var(--ws-primary-soft)] hover:text-[var(--ws-primary-text)]'
            >
              <Link href='/goals'>
                Criar meta
                <ArrowUpRight className='ml-2 size-4' />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-border ws-primary shadow-xl'>
          <CardHeader>
            <CardTitle className='text-xl font-black'>
              Próximos passos da V1
            </CardTitle>
            <CardDescription className='opacity-75'>
              Complete essa base para liberar o dashboard real com dados.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-3'>
            {nextSteps.map((step, index) => (
              <div
                key={step}
                className='flex items-center gap-3 rounded-2xl border border-current/10 bg-current/10 p-4'
              >
                <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-current/10 text-sm font-black'>
                  {index + 1}
                </div>

                <p className='text-sm font-semibold'>{step}</p>

                <CheckCircle2 className='ml-auto size-5 opacity-40' />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
