export const WSTSIDE_THEMES = [
  {
    value: 'theme-wstside-light',
    label: 'WstSide Light',
    description: 'Tema padrão claro, verde e minimalista.',
    badge: 'Atual',
    preview: ['#f4fbf7', '#059669', '#ffffff', '#0f172a'],
  },
  {
    value: 'theme-wstside-dark',
    label: 'WstSide Dark',
    description: 'Tema escuro premium com verde esmeralda.',
    badge: 'Escuro',
    preview: ['#020617', '#10b981', '#0f172a', '#e5e7eb'],
  },
  {
    value: 'theme-christmas',
    label: 'Natal',
    description: 'Verde pinheiro, vermelho natalino e detalhes dourados.',
    badge: 'Sazonal',
    preview: ['#fff7ed', '#166534', '#b91c1c', '#f59e0b'],
  },
  {
    value: 'theme-space-odyssey',
    label: 'Odisseia Espacial',
    description: 'Azul profundo, roxo cósmico e brilho ciano.',
    badge: 'Cósmico',
    preview: ['#020617', '#7c3aed', '#06b6d4', '#e0f2fe'],
  },
  {
    value: 'theme-spider',
    label: 'Aranha Urbana',
    description: 'Tema vermelho e azul, inspirado em heróis urbanos.',
    badge: 'Hero',
    preview: ['#020617', '#dc2626', '#2563eb', '#f8fafc'],
  },
] as const

export const WSTSIDE_THEME_VALUES = WSTSIDE_THEMES.map((theme) => theme.value)

export const DEFAULT_WSTSIDE_THEME = 'theme-wstside-light'

export type WstSideTheme = (typeof WSTSIDE_THEMES)[number]['value']
