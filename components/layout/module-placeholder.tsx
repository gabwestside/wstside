import { ArrowLeft, Construction } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type ModulePlaceholderProps = {
  badge: string
  title: string
  description: string
}

export function ModulePlaceholder({
  badge,
  title,
  description,
}: ModulePlaceholderProps) {
  return (
    <div className='flex min-h-[calc(100svh-8rem)] items-center justify-center'>
      <Card className='w-full max-w-xl rounded-[2rem] border-emerald-100 bg-white/85 shadow-2xl shadow-emerald-950/5'>
        <CardHeader className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex size-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'>
              <Construction className='size-6' />
            </div>

            <Badge className='rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 hover:bg-emerald-100'>
              {badge}
            </Badge>
          </div>

          <div>
            <CardTitle className='text-3xl font-black tracking-tight text-slate-950'>
              {title}
            </CardTitle>
            <CardDescription className='mt-2 text-base leading-7 text-slate-500'>
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Button
            asChild
            className='h-12 w-full rounded-2xl bg-emerald-600 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700'
          >
            <Link href='/dashboard'>
              <ArrowLeft className='mr-2 size-4' />
              Voltar para dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
