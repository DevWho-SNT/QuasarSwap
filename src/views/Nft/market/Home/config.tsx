import { LinkExternal } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config = (t: ContextApi['t']) => {
  return [
    {
      title: t('I sold an NFT, where’s my SNT?'),
      description: [
        t(
          'Trades are settled in WSNT, which is a wrapped version of SNT used on Nova Network. That means that when you sell an item, wSNT is sent to your wallet instead of SNT.',
        ),
        t('You can instantly swap your wSNT for SNT with no trading fees on QuasarSwap.'),
      ],
    },
    {
      title: t('When can I trade other NFT Collections?'),
      description: [
        t(
          'Soon! The current NFT Market is a basic version with early access to trading QuasarSwap NFTs only.',
        ),
        t('Other collections will be coming soon. We’ll make an announcement soon about the launch of the public Market.'),
      ],
    },
    {
      title: t('How can I list my NFT collection on the Market?'),
      description: [
        t('We will announce when listing becomes available.'),
      ],
    },
    {
      title: t('What are the fees?'),
      description: [
        t(
          '100% of all platform fees taken by QuasarSwap from sales are used to buy back and BURN QSR tokens in our weekly QSR burns.',
        ),
      ],
    },
  ]
}

export default config
