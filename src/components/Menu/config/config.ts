import { MenuItemsType, DropdownMenuItemType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Trade'),
    icon: 'Swap',
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Swap'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('Earn'),
    href: '/farms',
    icon: 'Earn',
    items: [
      {
        label: t('Farms'),
        href: '/farms',
      },
     {
       label: t('Pools'),
       href: '/pools', 
     },
     
    //  {
    //   label: t('Stake NFT'),
    //   href: '/nftstake',//nftstake
    // },
    ],
  },
  {
    label: t('NFTs'),
    icon: 'NFTs',
    href: '/404',
    items: [
      {
        label: t('Launch Badge NFTs'),
        href: 'https://launch.quasarswap.net/',
      },
      {
        label: t(' NFT Launch Pad (Coming Soon)'),
        href: '/404',
      },
    ],
  },
  {
    label: t('Community'),
    href: '/404',
    icon: 'Trophy',
    items: [
      {
        label: t('Voting'),
        href: '/voting',
      },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
      {
        label: t('Token Whitelisting'),
        href: 'https://forms.gle/8t5WHNtY3U1QytFC7',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      
    ],
  },

  {
    label: t('Resources'),
    href: '/404',
    icon: 'Trophy',
    items: [
      {
        label: t('Info'),
        href: 'https://docs.quasarswap.net/',
      },
      {
        type: DropdownMenuItemType.DIVIDER,
      },
      {
        label: t('Discord'),
        href: 'https://discord.gg/6Xd2h3SnaB',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Docs'),
        href: 'https://docs.quasarswap.net',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      
    ],
  },

  
  // {
  //   label: t('NFT'),
  //   href: `${nftsBaseUrl}`,
  //   icon: 'Nft',
  //   items: [
  //     {
  //       label: t('Overview'),
  //       href: `${nftsBaseUrl}`,
  //     },
  //     {
  //       label: t('Collections'),
  //       href: `${nftsBaseUrl}/collections`,
  //     },
  //     {
  //       label: t('Activity'),
  //       href: `${nftsBaseUrl}/activity`,
  //     },
  //   ],
  // },
  // {
  //   label: 'Resources',
  //   href: '/info',
  //   icon: 'More',
  //   items: [
  //     {
  //       label: t('Info'),
  //       href: '/info',
  //     },
  //     {
  //       label: t('IFO'),
  //       href: '/ifo',
  //     },
  //     {
  //       label: t('Voting'),
  //       href: '/voting',
  //     },
  //     {
  //       type: DropdownMenuItemType.DIVIDER,
  //     },
  //     {
  //       label: t('Leaderboard'),
  //       href: '/teams',
  //     },
  //     {
  //       type: DropdownMenuItemType.DIVIDER,
  //     },
  //     {
  //       label: t('Blog'),
  //       href: 'https://medium.com/pancakeswap',
  //       type: DropdownMenuItemType.EXTERNAL_LINK,
  //     },
  //     {
  //       label: t('Docs'),
  //       href: 'https://docs.pancakeswap.finance',
  //       type: DropdownMenuItemType.EXTERNAL_LINK,
  //     },
  //   ],
  // },
  
]

export default config
