import { AuthPageShell } from '@/components/auth/auth-page-shell'
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <AuthPageShell
      namespace='Auth.login'
      hero={{
        badgeKey: 'heroBadge',
        titleKey: 'heroTitle',
        descriptionKey: 'heroDescription',
      }}
      highlightCard={{
        eyebrowKey: 'capitalMachine',
        titleKey: 'capitalValue',
        descriptionKey: 'capitalStart',
      }}
      stats={[
        {
          labelKey: 'routine',
          value: '0%',
        },
        {
          labelKey: 'goals',
          value: '0',
        },
      ]}
    >
      <LoginForm />
    </AuthPageShell>
  )
}
