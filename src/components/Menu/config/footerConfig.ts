import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.quasarswap.net/official-resources/links',
      },
      {
        label: t('Brand Assets'),
        href: 'https://docs.quasarswap.net/additional-information/brand-assets',
      },
      {
        label: t('QSR token'),
        href: 'https://docs.quasarswap.net/quasar-token/quasar-token',
      },
      {
        label: '—',
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Guides'),
        href: 'https://docs.quasarswap.net/getting-started/',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/quasarswap',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.quasarswap.net',
      },
    ],
  },
]
