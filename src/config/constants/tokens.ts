import { ChainId, Token } from '@quasarswap/sdk'
import { serializeToken } from 'state/user/hooks/helpers'
import { CHAIN_ID } from './networks'
import { SerializedToken } from './types'

const { MAINNET, TESTNET } = ChainId

interface TokenList {
  [symbol: string]: Token
}

const defineTokens = <T extends TokenList>(t: T) => t

export const mainnetTokens = defineTokens({
  wbnb: new Token(
    MAINNET,
    '0x657a66332A65B535Da6C5d67b8cD1D410c161a08',
    18,
    'WSNT',
    'Wrapped SNT',
    'https://novanetwork.io/',
  ),
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  bnb: new Token(MAINNET, '0x657a66332A65B535Da6C5d67b8cD1D410c161a08', 18, 'BNB', 'BNB', 'https://www.binance.com/'),
  cake: new Token(
    MAINNET,
    '0x356c044B99e9378C1B28A1cAb2F95Cd65E877F33',
    18,
    'QSR',
    'QuasarSwap Token',
    'https://quasarswap.net/',
  ),
  busd: new Token(
    MAINNET,
    '0x1F5396f254EE25377A5C1b9c6BfF5f44e9294fFF',
    6,
    'nUSD',
    'nUSD',
    'https://docs.novanetwork.io/resources/official-addresses',
  ),
  dai: new Token(
    MAINNET,
    '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    18,
    'DAI',
    'Dai Stablecoin',
    'https://www.makerdao.com/',
  ),
  syrup: new Token(
    MAINNET,
    '0x52FaA596d47E8fa9B094D8c26E217040bc0602C1',
    18,
    'SBR',
    'Starburst Token',
    'https://quasarswap.net/',
  ),
  usdt: new Token(
    MAINNET,
    '0x31736FFe8C3E097762ec2ab9B84B2E9ba5dC2A26',
    18,
    'SHIT',
    'Standard High Intensity Trading Coin',
    'https://tether.to/',
  ),
  btcb: new Token(
    MAINNET,
    '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    18,
    'BTC',
    'Bridged BTC',
    'https://bitcoin.org/',
  ),
  ftm: new Token(
    MAINNET,
    '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
    18,
    'FTM',
    'Bridged FTM token',
    'https://fantom.foundation/',
  ),
  ust: new Token(
    MAINNET,
    '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
    18,
    'UST',
    'Wrapped UST Token',
    'https://mirror.finance/',
  ),
  eth: new Token(
    MAINNET,
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    18,
    'ETH',
    'Binance-Peg Ethereum Token',
    'https://ethereum.org/en/',
  ),
  usdc: new Token(
    MAINNET,
    '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    18,
    'USDC',
    'Binance-Peg USD Coin',
    'https://www.centre.io/usdc',
  ),
  /*wbnk: new Token(
    MAINNET,
    '0xCeA3FcB5681A057d612043c1138807a6ACdcCfE0',
    18,
    'wNBK',
    'Nova Token',
    'https://docs.novanetwork.io/nova-token/introduction',
  ),*/
  dkt: new Token(
    MAINNET,
    '0x7Ceb519718A80Dd78a8545AD8e7f401dE4f2faA7',
    18,
    'DKT',
    'Duelist King',
    'https://duelistking.com/',
  ),
  hotcross: new Token(
    MAINNET,
    '0x4FA7163E153419E0E1064e418dd7A99314Ed27b6',
    18,
    'HOTCROSS',
    'Hotcross Token',
    'https://www.hotcross.com/',
  ),
  belt: new Token(
    MAINNET,
    '0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f',
    18,
    'BELT',
    'Belt Token',
    'https://beta.belt.fi/',
  ),
  watch: new Token(
    MAINNET,
    '0x7A9f28EB62C791422Aa23CeAE1dA9C847cBeC9b0',
    18,
    'WATCH',
    'Yieldwatch Token',
    'https://yieldwatch.net/',
  ),
  bry: new Token(
    MAINNET,
    '0xf859Bf77cBe8699013d6Dbc7C2b926Aaf307F830',
    18,
    'BRY',
    'Berry Token',
    'https://berrydata.co/',
  ),
  wsote: new Token(
    MAINNET,
    '0x541E619858737031A1244A5d0Cd47E5ef480342c',
    18,
    'wSOTE',
    'Soteria Token',
    'https://soteria.finance/',
  ),
  helmet: new Token(
    MAINNET,
    '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
    18,
    'Helmet',
    'Helmet Token',
    'https://www.helmet.insure/',
  ),
  ten: new Token(
    MAINNET,
    '0xdFF8cb622790b7F92686c722b02CaB55592f152C',
    18,
    'TEN',
    'Tenet Token',
    'https://www.tenet.farm/',
  ),
  // Stuff we don't need, but we don't have time to fix
  era: new Token(MAINNET, '0x6f9F0c4ad9Af7EbD61Ac5A1D4e0F2227F7B0E5f9', 18, 'ERA', 'Era Token', 'https://www.era7.io/'),
  qsd: new Token(
    MAINNET,
    '0x07AaA29E63FFEB2EBf59B33eE61437E1a91A3bb2',
    18,
    'QSD',
    'QIAN second generation dollar',
    'https://chemix.io/home',
  ),
  froyo: new Token(
    MAINNET,
    '0xe369fec23380f9F14ffD07a1DC4b7c1a9fdD81c9',
    18,
    'FROYO',
    'Froyo Games',
    'https://froyo.games/',
  ),
  dpt: new Token(
    MAINNET,
    '0xE69cAef10A488D7AF31Da46c89154d025546e990',
    18,
    'DPT',
    'Diviner Protocol',
    'https://diviner.finance/',
  ),
  bondly: new Token(
    MAINNET,
    '0x96058f8C3e16576D9BD68766f3836d9A33158f89',
    18,
    'BONDLY',
    'Bondly Token',
    'https://www.bondly.finance/',
  ),
  safemoon: new Token(
    MAINNET,
    '0x8076C74C5e3F5852037F31Ff0093Eeb8c8ADd8D3',
    9,
    'SAFEMOON',
    'Safemoon Token',
    'https://safemoon.net/',
  ),
  itam: new Token(
    MAINNET,
    '0x04C747b40Be4D535fC83D09939fb0f626F32800B',
    18,
    'ITAM',
    'Itam Network Token',
    'https://itam.network/',
  ),
  ccar: new Token(
    MAINNET,
    '0x50332bdca94673F33401776365b66CC4e81aC81d',
    18,
    'CCAR',
    'CryptoCars',
    'https://cryptocars.me/',
  ),
  bttold: new Token(
    MAINNET,
    '0x8595F9dA7b868b1822194fAEd312235E43007b49',
    18,
    'BTTOLD',
    'Binance-Peg BitTorrent Token (Old)',
    'https://www.bittorrent.com/',
  ),
  lazio: new Token(
    MAINNET,
    '0x77d547256A2cD95F32F67aE0313E450Ac200648d',
    8,
    'LAZIO',
    'FC Lazio Fan Token',
    'https://launchpad.binance.com/en/subscription/LAZIO_BNB',
  ),
  porto: new Token(
    MAINNET,
    '0x49f2145d6366099e13B10FbF80646C0F377eE7f6',
    8,
    'PORTO',
    'FC Porto Fan Token',
    'https://launchpad.binance.com/en/subscription/PORTO_BNB',
  ),
  santos: new Token(
    MAINNET,
    '0xA64455a4553C9034236734FadDAddbb64aCE4Cc7',
    8,
    'SANTOS',
    'FC Santos Fan Token',
    'https://launchpad.binance.com/en/launchpool/SANTOS_BNB',
  ),
  //NFTs for Voting
  qlb: new Token(
    MAINNET,
    '0x7116F61094BC91c15Aef3Ef14A94144a05692784',
    6,
    'QLB ',
    'QLB',
    'https://docs.novanetwork.io/resources/official-addresses',
  ),
} as const)

export const testnetTokens = defineTokens({
  wbnb: new Token(
    TESTNET,
    '0x4440b01Ec3F552c109cf639CC8935264C2f705E1',
    18,
    'WSNT',
    'Wrapped SNT',
    'https://www.binance.com/',
  ),
  cake: new Token(
    TESTNET,
    '0x95F59266C18a5F2A7e3d8A2B6dd5A3ADc5035cFD',
    18,
    'QSR',
    'QuasarSwap Token',
    'https://quasarswap.net/',
  ),
  busd: new Token(
    TESTNET,
    '0xa608d517357433Ba1985932EB5d61B605a4aF7BB',
    18,
    'fUSD',
    'Fake USD',
    'https://www.paxos.com/busd/',
  ),
  syrup: new Token(
    TESTNET,
    '0x52FaA596d47E8fa9B094D8c26E217040bc0602C1',
    18,
    'SBR',
    'Starburst Token',
    'https://quasarswap.net/',
  ),
  bake: new Token(
    TESTNET,
    '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    18,
    'BAKE',
    'Bakeryswap Token',
    'https://www.bakeryswap.org/',
  ),
} as const)

const tokens = () => {
  const chainId = CHAIN_ID

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    return Object.keys(mainnetTokens).reduce((accum, key) => {
      return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] }
    }, {} as typeof testnetTokens & typeof mainnetTokens)
  }

  return mainnetTokens
}

const unserializedTokens = tokens()

type SerializedTokenList = Record<keyof typeof unserializedTokens, SerializedToken>

export const serializeTokens = () => {
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {} as SerializedTokenList)

  return serializedTokens
}

export default unserializedTokens
