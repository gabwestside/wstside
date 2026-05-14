'use client'

import { ArrowRight, Landmark, PiggyBank, WalletCards } from 'lucide-react'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import {
  createFinancialAccountAction,
  type FinancialAccountState,
} from '@/app/[locale]/(app)/finances/actions'
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
      className='h-12 w-full rounded-2xl ws-primary text-base font-semibold shadow-lg disabled:cursor-not-allowed disabled:opacity-70'
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
    <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
      <CardHeader className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex size-12 items-center justify-center rounded-2xl ws-primary shadow-lg'>
            <WalletCards className='size-6' />
          </div>

          <div className='rounded-full border ws-border ws-primary-soft px-3 py-1 text-xs font-bold uppercase tracking-wide'>
            Patrimônio
          </div>
        </div>

        <div>
          <CardTitle className='text-2xl font-black tracking-tight ws-heading'>
            Cadastrar patrimônio atual
          </CardTitle>
          <CardDescription className='mt-2 leading-6 ws-muted'>
            Registre contas, reservas, investimentos ou qualquer valor que
            componha seu patrimônio.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form action={formAction} className='space-y-5'>
          {state.error ? (
            <Alert className='rounded-2xl border border-[color-mix(in_srgb,var(--ws-danger)_28%,transparent)] bg-[color-mix(in_srgb,var(--ws-danger)_10%,transparent)] text-[var(--ws-danger)]'>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          ) : null}

          {state.success ? (
            <Alert className='rounded-2xl border ws-border ws-primary-soft'>
              <AlertDescription>{state.success}</AlertDescription>
            </Alert>
          ) : null}

          <div className='space-y-2'>
            <Label htmlFor='name' className='font-semibold ws-heading'>
              Nome
            </Label>

            <div className='relative'>
              <Landmark className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 ws-muted' />
              <Input
                id='name'
                name='name'
                placeholder='Ex: Nubank, Reserva, Tesouro Direto'
                required
                className='h-12 rounded-2xl border ws-border ws-surface-muted pl-11 text-base shadow-none placeholder:text-[var(--ws-muted)] focus-visible:ring-[var(--ws-primary)]'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='type' className='font-semibold ws-heading'>
              Tipo
            </Label>

            <select
              id='type'
              name='type'
              required
              defaultValue=''
              className='h-12 w-full rounded-2xl border ws-border ws-surface-muted px-4 text-base ws-heading outline-none transition focus:ring-2 focus:ring-[var(--ws-primary)]'
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
            <Label htmlFor='balance' className='font-semibold ws-heading'>
              Valor atual
            </Label>

            <div className='relative'>
              <PiggyBank className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 ws-muted' />
              <Input
                id='balance'
                name='balance'
                placeholder='Ex: 2500,00'
                required
                inputMode='decimal'
                className='h-12 rounded-2xl border ws-border ws-surface-muted pl-11 text-base shadow-none placeholder:text-[var(--ws-muted)] focus-visible:ring-[var(--ws-primary)]'
              />
            </div>
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
