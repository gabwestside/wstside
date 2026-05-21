import { AuthPageShell } from '@/components/auth/auth-page-shell'
import { UpdatePasswordForm } from '@/components/auth/update-password-form'

export default function UpdatePasswordPage() {
  return (
    <AuthPageShell
      namespace='Auth.updatePassword'
      hero={{
        badgeKey: 'heroBadge',
        titleKey: 'heroTitle',
        descriptionKey: 'heroDescription',
      }}
      highlightCard={{
        eyebrowKey: 'protectionEyebrow',
        titleKey: 'protectionTitle',
        descriptionKey: 'protectionDescription',
      }}
      stats={[
        {
          labelKey: 'linkStep',
          value: 'OK',
        },
        {
          labelKey: 'passwordStep',
          value: '02',
        },
        {
          labelKey: 'accessStep',
          value: 'ON',
        },
      ]}
    >
      <UpdatePasswordForm />
    </AuthPageShell>
  )
}