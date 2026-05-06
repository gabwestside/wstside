import type { ReactNode } from "react"
import { Suspense } from 'react'

import { PrivateAppLayout } from "@/components/layout/private-app-layout"
import { AppLoading } from "@/components/layout/app-loading"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<AppLoading />}>
      <PrivateAppLayout>{children}</PrivateAppLayout>
    </Suspense>
  )
}