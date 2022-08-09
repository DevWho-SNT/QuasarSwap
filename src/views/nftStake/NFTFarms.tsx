import { useEffect, useCallback, useState, useMemo, useRef, createContext } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text, Button, ArrowForwardIcon, Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import { ChainId } from '@quasarswap/sdk'
import { NextLinkFromReactRouter } from 'components/NextLink'
import styled from 'styled-components'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import { useFarms, usePollFarmsWithUserData, usePriceCakeBusd } from 'state/nftStake/hooks'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { DeserializedNFTFarm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import orderBy from 'lodash/orderBy'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import { useUserNFTFarmStakedOnly, useUserFarmsViewMode } from 'state/user/hooks'
import { ViewMode } from 'state/user/actions'
import { useRouter } from 'next/router'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import Loading from 'components/Loading'
import ToggleView from 'components/ToggleView/ToggleView'
import { FarmWithAvailableValue } from './components/NFTFarmCard/NFTFarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import { RowProps } from './components/FarmTable/Row'
import { DesktopColumnSchema } from './components/types'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  z-index: 9;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }

  #staked-only-farms {
    border-radius: 18px;
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const FooterImg = styled.div`
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  z-index: 1;
`

const ListContainer = styled.div`
  position: relative;
  z-index: 2;
  padding: 20px 80px 380px;
`

const NUMBER_OF_FARMS_VISIBLE = 3

export const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const NFTFarms: React.FC = ({ children }) => {
  const { pathname } = useRouter()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded, poolLength } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useUserFarmsViewMode()
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const chosenFarmsLength = useRef(0)
  const { isMobile } = useMatchBreakpoints()

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollFarmsWithUserData(isArchived)

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useUserNFTFarmStakedOnly(isActive)

  const activeFarms = farmsLP.filter(
    (farm) =>
      farm.multiplier !== '0X' && !isArchivedPid(farm.pid) && (!poolLength || poolLength > farm.pid),
  )
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedNFTFarm[]): FarmWithAvailableValue[] => {
      let farmsToDisplayWithAPR: FarmWithAvailableValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.earningTokenPriceBusd) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.earningTokenPriceBusd)
        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity, farm.colAddresses[ChainId.MAINNET])
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }

        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithAvailableValue) => {
          return latinise(farm.colSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [cakePrice, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    const sortFarms = (farms: FarmWithAvailableValue[]): FarmWithAvailableValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithAvailableValue) => farm.apr + farm.lpRewardsApr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithAvailableValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithAvailableValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithAvailableValue) => Number(farm.liquidity), 'desc')
        case 'latest':
          return orderBy(farms, (farm: FarmWithAvailableValue) => Number(farm.pid), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      chosenFarms = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  chosenFarmsLength.current = chosenFarmsMemoized.length

  useEffect(() => {
    if (isIntersecting) {
      setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
        if (farmsCurrentlyVisible <= chosenFarmsLength.current) {
          return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
        }
        return farmsCurrentlyVisible
      })
    }
  }, [isIntersecting])

  const rowData = chosenFarmsMemoized.map((farm) => {
    const { collection, earningToken } = farm
    const tokenAddress = collection.address
    const quoteTokenAddress = earningToken.address
    const lpLabel = farm.colSymbol && farm.colSymbol.split(' ')[0].toUpperCase().replace('QSR', 'QSR Singlestake')

    const row: RowProps = {
      apr: {
        value: getDisplayApr(farm.apr, farm.lpRewardsApr),
        pid: farm.pid,
        multiplier: farm.multiplier,
        lpLabel,
        lpSymbol: farm.colSymbol,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: farm.apr,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        nft: farm.collection,
        earningToken: farm.earningToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    /*if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    }*/

    return <FlexLayout>{children}</FlexLayout>
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <NFTFarmsContext.Provider value={{ chosenFarmsMemoized }}>
      {/*<PageHeader>
        <Heading as="h1" scale="xxl" color="secondary" mb="24px">
          {t('Farms')}
        </Heading>
        <Heading scale="lg" color="text">
          {t('Stake LP tokens to earn.')}
        </Heading>
        <NextLinkFromReactRouter to="/farms/auction" id="lottery-pot-banner">
          <Button p="0" variant="text">
            <Text color="primary" bold fontSize="16px" mr="4px">
              {t('Community Auctions')}
            </Text>
            <ArrowForwardIcon color="primary" />
          </Button>
        </NextLinkFromReactRouter>
  </PageHeader>*/}
      <Page>
        <ControlContainer>
          <ViewControls>
            {
              //<ToggleView idPrefix="clickFarm" viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            }
            {/*<ToggleWrapper>
              <Toggle
                id="staked-only-farms"
                checked={stakedOnly}
                onChange={() => setStakedOnly(!stakedOnly)}
                scale="sm"
              />
              <Text color="white"> {t('Staked only')}</Text>
            </ToggleWrapper>*/}
            <FarmTabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} />
          </ViewControls>
          <FilterContainer>
            <LabelWrapper>
              <Text color="white" textTransform="uppercase">{t('Sort by')}</Text>
              <Select
                options={[
                  {
                    label: t('Hot'),
                    value: 'hot',
                  },
                  {
                    label: t('Earned'),
                    value: 'earned',
                  },
                  {
                    label: t('Latest'),
                    value: 'latest',
                  },
                ]}
                onOptionChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text color="white" textTransform="uppercase">{t('Search')}</Text>
              <SearchInput onChange={handleChangeQuery} placeholder="Search Farms" />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>

        <ListContainer>
          {renderContent()}
          {account && !userDataLoaded && stakedOnly && (
            <Flex justifyContent="center">
              <Loading />
            </Flex>
          )}
          <div ref={observerRef} />
          {
            // <StyledImage src="/images/decorations/3dpan.png" alt="Pancake illustration" width={120} height={103} />
          }
        </ListContainer>

        <FooterImg>
          {
            isMobile && <img src="/images/farms-bg-mobile.png" alt={'farms'} />
          }
          {
            !isMobile && <img src="/images/farms-bg.png" alt={'farms'} />
          }
        </FooterImg>
      </Page>
    </NFTFarmsContext.Provider>
  )
}

export const NFTFarmsContext = createContext({ chosenFarmsMemoized: [] })

export default NFTFarms
