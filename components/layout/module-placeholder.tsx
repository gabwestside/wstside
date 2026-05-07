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
      <Card className='w-full max-w-xl rounded-[2rem] border ws-border ws-surface shadow-2xl'>
        <CardHeader className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex size-12 items-center justify-center rounded-2xl ws-primary shadow-lg'>
              <Construction className='size-6' />
            </div>

            <Badge className='rounded-full border ws-border ws-primary-soft px-3 py-1 hover:bg-[var(--ws-primary-soft)]'>
              {badge}
            </Badge>
          </div>

          <div>
            <CardTitle className='text-3xl font-black tracking-tight ws-heading'>
              {title}
            </CardTitle>
            <CardDescription className='mt-2 text-base leading-7 ws-muted'>
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Button
            asChild
            className='h-12 w-full rounded-2xl ws-primary text-base font-semibold shadow-lg'
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
