'use client'

import { ArrowRight, Landmark, PiggyBank, WalletCards } from 'lucide-react'
import { useTranslations } from 'next-intl'
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
  {
    value: 'Conta corrente',
    labelKey: 'checkingAccount',
  },
  {
    value: 'Reserva',
    labelKey: 'reserve',
  },
  {
    value: 'Investimento',
    labelKey: 'investment',
  },
  {
    value: 'Dinheiro físico',
    labelKey: 'cash',
  },
  {
    value: 'Outro',
    labelKey: 'other',
  },
] as const

function SubmitButton() {
  const { pending } = useFormStatus()
  const t = useTranslations('Finances.accountForm')

  return (
    <Button
      type='submit'
      disabled={pending}
      className='h-12 w-full rounded-2xl ws-primary text-base font-semibold shadow-lg disabled:cursor-not-allowed disabled:opacity-70'
    >
      {pending ? t('submitting') : t('submit')}
      {!pending && <ArrowRight className='ml-2 size-4' />}
    </Button>
  )
}

export function FinancialAccountForm() {
  const t = useTranslations('Finances.accountForm')
  const tAccountTypes = useTranslations('Finances.accountTypes')

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
            {t('badge')}
          </div>
        </div>

        <div>
          <CardTitle className='text-2xl font-black tracking-tight ws-heading'>
            {t('title')}
          </CardTitle>

          <CardDescription className='mt-2 leading-6 ws-muted'>
            {t('description')}
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
              {t('name')}
            </Label>

            <div className='relative'>
              <Landmark className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 ws-muted' />
              <Input
                id='name'
                name='name'
                placeholder={t('namePlaceholder')}
                required
                className='h-12 rounded-2xl border ws-border ws-surface-muted pl-11 text-base shadow-none placeholder:text-[var(--ws-muted)] focus-visible:ring-[var(--ws-primary)]'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='type' className='font-semibold ws-heading'>
              {t('type')}
            </Label>

            <select
              id='type'
              name='type'
              required
              defaultValue=''
              className='h-12 w-full rounded-2xl border ws-border ws-surface-muted px-4 text-base ws-heading outline-none transition focus:ring-2 focus:ring-[var(--ws-primary)]'
            >
              <option value='' disabled>
                {t('typePlaceholder')}
              </option>

              {accountTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {tAccountTypes(type.labelKey)}
                </option>
              ))}
            </select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='balance' className='font-semibold ws-heading'>
              {t('balance')}
            </Label>

            <div className='relative'>
              <PiggyBank className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 ws-muted' />
              <Input
                id='balance'
                name='balance'
                placeholder={t('balancePlaceholder')}
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
