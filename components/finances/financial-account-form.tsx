'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { ArrowRight, Landmark, PiggyBank, WalletCards } from 'lucide-react'

import {
  createFinancialAccountAction,
  type FinancialAccountState,
} from '@/app/(app)/finances/actions'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const initialState: FinancialAccountState = {}

const accountTypes = [
  'Conta corrente',
  'Reserva',
  'Investimento',
  'Dinheiro físico',
  'Outro',
]

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
      className='h-12 w-full rounded-2xl bg-emerald-600 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700'
    >
      {pending ? 'Salvando...' : 'Cadastrar patrimônio'}
      {!pending && <ArrowRight className='ml-2 size-4' />}
    </Button>
  )
}

export function FinancialAccountForm() {
  const [state, formAction] = useActionState(
    createFinancialAccountAction,
    initialState,
  )

  return (
    <Card className='rounded-[2rem] border-emerald-100 bg-white/85 shadow-xl shadow-emerald-950/5'>
      <CardHeader className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'>
            <WalletCards className='size-6' />
          </div>

          <div className='rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700'>
            Patrimônio
          </div>
        </div>

        <div>
          <CardTitle className='text-2xl font-black tracking-tight text-slate-950'>
            Cadastrar patrimônio atual
          </CardTitle>
          <CardDescription className='mt-2 leading-6 text-slate-500'>
            Registre contas, reservas, investimentos ou qualquer valor que
            componha seu patrimônio.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form action={formAction} className='space-y-5'>
          {state.error ? (
            <Alert className='rounded-2xl border-red-200 bg-red-50 text-red-700'>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          ) : null}

          {state.success ? (
            <Alert className='rounded-2xl border-emerald-200 bg-emerald-50 text-emerald-700'>
              <AlertDescription>{state.success}</AlertDescription>
            </Alert>
          ) : null}

          <div className='space-y-2'>
            <Label htmlFor='name' className='font-semibold text-slate-700'>
              Nome
            </Label>

            <div className='relative'>
              <Landmark className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
              <Input
                id='name'
                name='name'
                placeholder='Ex: Nubank, Reserva, Tesouro Direto'
                required
                className='h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 text-base shadow-none focus-visible:ring-emerald-500'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='type' className='font-semibold text-slate-700'>
              Tipo
            </Label>

            <select
              id='type'
              name='type'
              required
              defaultValue=''
              className='h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-700 outline-none transition focus:ring-2 focus:ring-emerald-500'
            >
              <option value='' disabled>
                Selecione uma categoria
              </option>
              {accountTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='balance' className='font-semibold text-slate-700'>
              Valor atual
            </Label>

            <div className='relative'>
              <PiggyBank className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400' />
              <Input
                id='balance'
                name='balance'
                placeholder='Ex: 2500,00'
                required
                inputMode='decimal'
                className='h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 text-base shadow-none focus-visible:ring-emerald-500'
              />
            </div>
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
