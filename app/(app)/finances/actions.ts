'use server'

import { revalidatePath } from 'next/cache'

import { parseCurrencyInput } from '@/lib/formatters'
import { createClient } from '@/lib/supabase/server'

export type FinancialAccountState = {
  error?: string
  success?: string
}

export async function createFinancialAccountAction(
  _previousState: FinancialAccountState,
  formData: FormData,
): Promise<FinancialAccountState> {
  const name = String(formData.get('name') ?? '').trim()
  const type = String(formData.get('type') ?? '').trim()
  const rawBalance = String(formData.get('balance') ?? '').trim()

  if (!name) {
    return {
      error: 'Informe o nome da conta ou ativo.',
    }
  }

  if (!type) {
    return {
      error: 'Selecione o tipo do patrimônio.',
    }
  }

  if (!rawBalance) {
    return {
      error: 'Informe o valor atual.',
    }
  }

  const balance = parseCurrencyInput(rawBalance)

  if (balance === null || balance < 0) {
    return {
      error: 'Informe um valor válido maior ou igual a zero.',
    }
  }

  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return {
      error: 'Sua sessão expirou. Faça login novamente.',
    }
  }

  const { error } = await supabase.from('financial_accounts').insert({
    user_id: user.id,
    name,
    type,
    balance,
  })

  if (error) {
    return {
      error: 'Não foi possível cadastrar esse patrimônio agora.',
    }
  }

  revalidatePath('/finances')
  revalidatePath('/dashboard')

  return {
    success: 'Patrimônio cadastrado com sucesso.',
  }
}

export async function deleteFinancialAccountAction(formData: FormData) {
  const accountId = String(formData.get('accountId') ?? '')

  if (!accountId) {
    return
  }

  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return
  }

  await supabase
    .from('financial_accounts')
    .delete()
    .eq('id', accountId)
    .eq('user_id', user.id)

  revalidatePath('/finances')
  revalidatePath('/dashboard')
}
