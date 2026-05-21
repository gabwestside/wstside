import { AuthPageShell } from '@/components/auth/auth-page-shell'
import { SignUpForm } from '@/components/auth/sign-up-form'

export default function SignUpPage() {
  return (
    <AuthPageShell
      namespace='Auth.signup'
      hero={{
        badgeKey: 'heroBadge',
        titleKey: 'heroTitle',
        descriptionKey: 'heroDescription',
      }}
      highlightCard={{
        eyebrowKey: 'firstStepEyebrow',
        titleKey: 'firstStepTitle',
        descriptionKey: 'firstStepDescription',
      }}
      stats={[
        {
          labelKey: 'financeStep',
          value: '01',
        },
        {
          labelKey: 'routineStep',
          value: '02',
        },
        {
          labelKey: 'goalsStep',
          value: '03',
        },
      ]}
    >
      <SignUpForm />
    </AuthPageShell>
  )
}
