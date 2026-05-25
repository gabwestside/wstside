import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type RadarMetric = {
  key: string
  label: string
  value: number
}

type DashboardOverviewCardProps = {
  title: string
  description: string
  periodLabel: string
  metrics: RadarMetric[]
}

// function getDiamondPoints(value: number) {
//   const centerX = 140
//   const centerY = 120
//   const maxRadius = 82
//   const radius = (Math.max(0, Math.min(value, 100)) / 100) * maxRadius

//   return [
//     `${centerX},${centerY - radius}`,
//     `${centerX + radius},${centerY}`,
//     `${centerX},${centerY + radius}`,
//     `${centerX - radius},${centerY}`,
//   ].join(' ')
// }

function getGridPoints(scale: number) {
  const centerX = 140
  const centerY = 120
  const maxRadius = 82 * scale

  return [
    `${centerX},${centerY - maxRadius}`,
    `${centerX + maxRadius},${centerY}`,
    `${centerX},${centerY + maxRadius}`,
    `${centerX - maxRadius},${centerY}`,
  ].join(' ')
}

export function DashboardOverviewCard({
  title,
  description,
  periodLabel,
  metrics,
}: DashboardOverviewCardProps) {
  const [top, right, bottom, left] = metrics

  return (
    <Card className='rounded-[2rem] border ws-border ws-surface shadow-xl'>
      <CardHeader>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <CardTitle className='text-2xl font-black ws-heading'>
              {title}
            </CardTitle>
            <CardDescription className='mt-1 ws-muted'>
              {description}
            </CardDescription>
          </div>

          <Badge className='rounded-full border ws-border ws-primary-soft px-3 py-1 text-xs font-bold text-[var(--ws-primary-text)] hover:bg-[var(--ws-primary-soft)]'>
            {periodLabel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className='flex justify-center'>
          <svg
            viewBox='0 0 280 250'
            className='h-64 w-full max-w-md overflow-visible'
            role='img'
          >
            {[1, 0.75, 0.5, 0.25].map((scale) => (
              <polygon
                key={scale}
                points={getGridPoints(scale)}
                fill='transparent'
                stroke='var(--ws-border)'
                strokeWidth='1'
              />
            ))}

            <line
              x1='140'
              y1='38'
              x2='140'
              y2='202'
              stroke='var(--ws-border)'
            />
            <line
              x1='58'
              y1='120'
              x2='222'
              y2='120'
              stroke='var(--ws-border)'
            />

            <polygon
              points={[
                `${140},${120 - (top.value / 100) * 82}`,
                `${140 + (right.value / 100) * 82},${120}`,
                `${140},${120 + (bottom.value / 100) * 82}`,
                `${140 - (left.value / 100) * 82},${120}`,
              ].join(' ')}
              fill='var(--ws-primary)'
              fillOpacity='0.18'
              stroke='var(--ws-primary)'
              strokeWidth='3'
              strokeLinejoin='round'
            />

            <text
              x='140'
              y='20'
              textAnchor='middle'
              className='fill-[var(--ws-primary-text)] text-xs font-black uppercase'
            >
              {top.label}
            </text>

            <text
              x='250'
              y='124'
              textAnchor='middle'
              className='fill-[var(--ws-muted)] text-xs font-black uppercase'
            >
              {right.label}
            </text>

            <text
              x='140'
              y='235'
              textAnchor='middle'
              className='fill-[var(--ws-muted)] text-xs font-black uppercase'
            >
              {bottom.label}
            </text>

            <text
              x='30'
              y='124'
              textAnchor='middle'
              className='fill-[var(--ws-muted)] text-xs font-black uppercase'
            >
              {left.label}
            </text>
          </svg>
        </div>

        <div className='grid gap-3 sm:grid-cols-4'>
          {metrics.map((metric) => (
            <div
              key={metric.key}
              className='rounded-[1.25rem] border ws-border ws-surface-muted p-4 text-center'
            >
              <p className='text-xs font-bold uppercase ws-muted'>
                {metric.label}
              </p>
              <p className='mt-1 text-xl font-black text-[var(--ws-primary-text)]'>
                {metric.value}%
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
