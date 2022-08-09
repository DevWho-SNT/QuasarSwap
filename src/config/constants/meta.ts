import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'QuasarSwap',
  description:
    'The first AMM on Nova Network! Earn QSR through yield farming or win it in the Lottery, then stake it in Star Pools to earn more tokens! Initial Farm Offerings (launch model offered by QuasarSwap), and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancakesquad')) {
    basePath = '/pancakesquad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('QuasarSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Swap')} | ${t('QuasarSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('QuasarSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('QuasarSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('QuasarSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('QuasarSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('QuasarSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('QuasarSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('QuasarSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('QuasarSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('QuasarSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('QuasarSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('QuasarSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('QuasarSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('QuasarSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('QuasarSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('QuasarSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('QuasarSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('QuasarSwap Info & Analytics')}`,
        description: 'View statistics for QuasarSwap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('QuasarSwap Info & Analytics')}`,
        description: 'View statistics for QuasarSwap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('QuasarSwap Info & Analytics')}`,
        description: 'View statistics for QuasarSwap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('QuasarSwap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('QuasarSwap')}`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} | ${t('QuasarSwap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} | ${t('QuasarSwap')}`,
      }
    case '/pancakesquad':
      return {
        title: `${t('Pancake Squad')} | ${t('QuasarSwap')}`,
      }
    default:
      return null
  }
}
