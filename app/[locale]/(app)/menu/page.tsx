import { Settings2, Sparkles } from 'lucide-react'

import { ThemeSelector } from '@/components/settings/theme-selector'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LanguageSelector } from '@/components/settings/language-selector'
import { useTranslations } from 'next-intl'

export default function MenuPage() {
  const t = useTranslations('Settings');
  return (
    <div className='space-y-6'>
      <section className='flex flex-col justify-between gap-4 lg:flex-row lg:items-end'>
        <div className='space-y-2'>
          <Badge className='rounded-full ws-primary-soft px-3 py-1 hover:ws-primary-soft'>
            Configurações
          </Badge>

          <div>
            <h1 className='text-3xl font-black tracking-tight ws-heading sm:text-4xl'>
              Central do WstSide
            </h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 ws-muted'>
              Gerencie preferências visuais, temas e ajustes gerais da sua
              experiência.
            </p>
          </div>
        </div>
      </section>

      <section className='grid gap-4 xl:grid-cols-[0.85fr_1.15fr]'>
        <Card className='rounded-[2rem] border ws-surface'>
          <CardHeader className='space-y-4'>
            <div className='flex size-12 items-center justify-center rounded-2xl ws-primary shadow-lg'>
              <Settings2 className='size-6' />
            </div>

            <div>
              <CardTitle className='text-2xl font-black ws-heading'>
                Aparência
              </CardTitle>
              <CardDescription className='mt-2 leading-6 ws-muted'>
                Escolha um tema para mudar a identidade visual do WstSide.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <div className='rounded-[1.5rem] border p-5 ws-surface-muted'>
              <div className='flex items-start gap-3'>
                <div className='flex size-10 shrink-0 items-center justify-center rounded-2xl ws-primary-soft'>
                  <Sparkles className='size-5' />
                </div>

                <div>
                  <p className='font-bold ws-heading'>
                    Tema salvo automaticamente
                  </p>
                  <p className='mt-1 text-sm leading-6 ws-muted'>
                    A escolha fica armazenada no navegador e será aplicada nas
                    próximas visitas.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-surface'>
          <CardHeader>
            <CardTitle className='text-2xl font-black ws-heading'>
              Temas disponíveis
            </CardTitle>
            <CardDescription className='ws-muted'>
              Selecione uma identidade visual para o app.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ThemeSelector />
          </CardContent>
        </Card>

        <Card className='rounded-[2rem] border ws-surface'>
          <CardHeader>
            <CardTitle className='text-2xl font-black ws-heading'>
              {t('language')}
            </CardTitle>
            <CardDescription className='ws-muted'>
              {t('languageDescription')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LanguageSelector />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
