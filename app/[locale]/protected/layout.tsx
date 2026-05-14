import type { ReactNode } from 'react'
import { Suspense } from 'react'

import { AppLoading } from '@/components/layout/app-loading'
import { PrivateAppLayout } from '@/components/layout/private-app-layout'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<AppLoading />}>
      <PrivateAppLayout>{children}</PrivateAppLayout>
    </Suspense>
  )
}
