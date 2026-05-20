export const WSTSIDE_THEMES = [
  {
    value: 'theme-wstside-light',
    labelKey: 'wstsideLight.label',
    descriptionKey: 'wstsideLight.description',
    badgeKey: 'wstsideLight.badge',
    preview: ['#f4fbf7', '#059669', '#ffffff', '#0f172a'],
  },
  {
    value: 'theme-wstside-dark',
    labelKey: 'wstsideDark.label',
    descriptionKey: 'wstsideDark.description',
    badgeKey: 'wstsideDark.badge',
    preview: ['#020617', '#10b981', '#0f172a', '#e5e7eb'],
  },
  {
    value: 'theme-christmas',
    labelKey: 'christmas.label',
    descriptionKey: 'christmas.description',
    badgeKey: 'christmas.badge',
    preview: ['#fff7ed', '#166534', '#b91c1c', '#f59e0b'],
  },
  {
    value: 'theme-space-odyssey',
    labelKey: 'spaceOdyssey.label',
    descriptionKey: 'spaceOdyssey.description',
    badgeKey: 'spaceOdyssey.badge',
    preview: ['#020617', '#7c3aed', '#06b6d4', '#e0f2fe'],
  },
  {
    value: 'theme-spider',
    labelKey: 'spider.label',
    descriptionKey: 'spider.description',
    badgeKey: 'spider.badge',
    preview: ['#020617', '#dc2626', '#2563eb', '#f8fafc'],
  },
] as const

export const WSTSIDE_THEME_VALUES = WSTSIDE_THEMES.map((theme) => theme.value)

export const DEFAULT_WSTSIDE_THEME = 'theme-wstside-light'

export type WstSideTheme = (typeof WSTSIDE_THEMES)[number]['value']