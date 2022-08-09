import tokens from 'config/constants/tokens'
import { getCakeVaultAddress, getMasterChefAddress, getQLBAddress } from 'utils/addressHelpers'

const cakeLpAddress = '0x0e9768b0199e7b31852b4effb70031d860b812d6'

const CakeBalanceStrategy = {
  name: 'erc20-balance-of',
  params: {
    address: tokens.cake.address,
    decimals: 0,
    symbol: tokens.cake.symbol,
  },
}

const SyrupBalanceStrategy = {
  name: 'erc20-balance-of',
  params: {
    address: tokens.syrup.address,
    decimals: 0,
    symbol: tokens.syrup.symbol,
  },
}

const QLBBalanceStrategy = {
  name: 'erc721-with-multiplier',
  params: {
    address: getQLBAddress(),
    symbol: 'QLB',
    multiplier: '10000',
  },
}

const CakeVaultSharesStrategy = {
  name: 'contract-call',
  params: {
    address: getCakeVaultAddress(),
    decimals: 0,
    output: 'shares',
    methodABI: {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'userInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'shares',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'lastDepositedTime',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'cakeAtLastUserAction',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'lastUserActionTime',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
}

const CakeVaultPricePerFullShareStrategy = {
  name: 'contract-call',
  params: {
    address: getCakeVaultAddress(),
    decimals: 0,
    args: [],
    methodABI: {
      inputs: [],
      name: 'getPricePerFullShare',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
}

const UserStakeInCakePoolStrategy = {
  name: 'contract-call',
  params: {
    address: getMasterChefAddress(),
    decimals: 0,
    args: [0, '%{address}'],
    output: 'amount',
    methodABI: {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'userInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rewardDebt',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
}

const CakeBnbLpTotalSupplyStrategy = {
  name: 'contract-call',
  params: {
    address: cakeLpAddress,
    decimals: 0,
    args: [],
    methodABI: {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  },
}

const CakeBnbLpReserve0Strategy = {
  name: 'contract-call',
  params: {
    address: cakeLpAddress,
    decimals: 0,
    args: [],
    output: '_reserve0',
    methodABI: {
      constant: true,
      inputs: [],
      name: 'getReserves',
      outputs: [
        {
          internalType: 'uint112',
          name: '_reserve0',
          type: 'uint112',
        },
        {
          internalType: 'uint112',
          name: '_reserve1',
          type: 'uint112',
        },
        {
          internalType: 'uint32',
          name: '_blockTimestampLast',
          type: 'uint32',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  },
}

const CakeBnbLpCakeBnbBalanceStrategy = {
  name: 'contract-call',
  params: {
    address: getMasterChefAddress(),
    decimals: 0,
    args: [3, '%{address}'],
    output: 'amount',
    methodABI: {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'userInfo',
      outputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rewardDebt',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
}

function createPoolStrategy(poolAddress) {
  return {
    name: 'contract-call',
    params: {
      address: poolAddress,
      decimals: 0,
      output: 'amount',
      methodABI: {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'userInfo',
        outputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'rewardDebt',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    },
  }
}

export { createPoolStrategy }

export const snapshotStrategies = [
  CakeBalanceStrategy,
  SyrupBalanceStrategy,
  QLBBalanceStrategy,
  CakeVaultSharesStrategy,
  CakeVaultPricePerFullShareStrategy,
  UserStakeInCakePoolStrategy,
  CakeBnbLpTotalSupplyStrategy,
  CakeBnbLpReserve0Strategy,
  CakeBnbLpCakeBnbBalanceStrategy,
]
