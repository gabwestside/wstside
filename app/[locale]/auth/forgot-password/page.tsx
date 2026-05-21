import { AuthPageShell } from '@/components/auth/auth-page-shell'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell
      namespace='Auth.forgotPassword'
      hero={{
        badgeKey: 'heroBadge',
        titleKey: 'heroTitle',
        descriptionKey: 'heroDescription',
      }}
      highlightCard={{
        eyebrowKey: 'securityEyebrow',
        titleKey: 'securityTitle',
        descriptionKey: 'securityDescription',
      }}
      stats={[
        {
          labelKey: 'accountStep',
          value: '01',
        },
        {
          labelKey: 'emailStep',
          value: '02',
        },
        {
          labelKey: 'passwordStep',
          value: '03',
        },
      ]}
    >
      <ForgotPasswordForm />
    </AuthPageShell>
  )
}