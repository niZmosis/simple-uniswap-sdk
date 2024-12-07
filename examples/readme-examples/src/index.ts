/* eslint-disable @typescript-eslint/no-unused-vars */
import { Erc20Contract, PairContract } from '@dex-toolkit/contracts'
import { Tokens, DexFactory, TokenContract, TokenList } from '@dex-toolkit/core'
import { DexNumber } from '@dex-toolkit/number'
import { DexProvider } from '@dex-toolkit/provider'
import type {
  DexCustomNetwork,
  DexChainIdAndProviderContext,
} from '@dex-toolkit/types'
import {
  tradeDirectionMap,
  plsTestChainId,
  uniswapPairV2ABI,
  MAX_HEX_STRING,
  getAllTokenListSources,
  pulseXRouterV2ABI,
  defaultRouterMethodMapV2,
  uniswapFactoryV2ABI,
  PLSCoin,
  getVersionTagFromVersion,
} from '@dex-toolkit/utils'
import { ethers, Wallet } from 'ethers'

// ------------------------
// Initialization
// ------------------------

// Example: Initialization - Ethers Provider
export const initializationEthersProvider = async () => {
  const ethersProvider = new ethers.providers.JsonRpcProvider(
    'https://rpc.example.com',
    1,
  )
  const dexFactory = new DexFactory({
    providerContext: { ethersProvider },
    walletAddress: '0x1234...',
    dexContext: 'UNISWAP',
  })

  console.log(dexFactory)
}

// Example: Initialization - Ethers Signer
export const initializationEthersSigner = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.example.com',
    1,
  )
  const signer = new ethers.Wallet('0xPrivateKey', provider)

  const walletAddress = await signer.getAddress()

  const dexFactory = new DexFactory({
    providerContext: { ethersSigner: signer },
    walletAddress,
    dexContext: 'UNISWAP',
  })

  console.log(dexFactory)
}

// Example: Initialization - Pre-configured Networks
export const initializationPreConfiguredNetworks = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 1 },
    walletAddress: '0x1234...',
    dexContext: 'UNISWAP',
  })

  console.log(dexFactory)
}

// Example: Initialization - Custom RPC URL
export const initializationCustomRpc = async () => {
  const dexFactory = new DexFactory({
    providerContext: {
      chainId: 1,
      rpcUrl: 'https://rpc.example.com',
    },
    walletAddress: '0x1234...',
    dexContext: 'UNISWAP',
  })

  console.log(dexFactory)
}

// Example: Initialization - RPC URL with Authentication
export const initializationAuthenticatedRpc = async () => {
  const dexFactory = new DexFactory({
    providerContext: {
      chainId: 1,
      providerType: 'infura',
      apiKey: 'a0123456789abcdef0123456789abcdef',
    },
    walletAddress: '0x1234...',
    dexContext: 'UNISWAP',
  })

  console.log(dexFactory)
}

// Example: Initialization - Dex Provider
export const initializationDexProvider = async () => {
  const dexProvider = new DexProvider({
    chainId: 1,
    rpcUrl: 'https://rpc.example.com',
  })
  const dexFactory = new DexFactory({
    providerContext: dexProvider,
    walletAddress: '0x1234...',
    dexContext: 'UNISWAP',
  })

  console.log(dexFactory)
}

// ------------------------
// Trade
// ------------------------

// Example: Getting a Quote
export const getQuoteExample = async () => {
  // Create a factory which can be used to create a swap, liquidity pool, etc for the given configuration.
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0x1234...',
    dexContext: ['PULSEX'], // Pass in one or multiple DEXes
    /**
     * The format in which the trade context's number values will be returned.
     *
     * - `'readable'`: Returns a human-readable string with grouping (thousands separators) and specified decimal places (e.g., "1,234.567").
     * - `'decimal'`: Outputs a precise decimal string representation without grouping, maintaining the decimal places specified (e.g., "1234.567").
     * - `'wei'`: Outputs the value in its smallest unit, suitable for precise blockchain interactions (e.g., "1000000000000000000" for 1 Ether).
     * - `'hex'`: Returns a hexadecimal string representation, useful for encoding values in blockchain transactions (e.g., "0x158e460913d000000000").
     * - `'dexnumber'`: Returns the current instance as a `DexNumber` object.
     * - `'bignumber'`: Returns an instance of `BigNumber` from `bignumber.js`.
     * - `'ethers'`: Returns a `BigNumber` instance from `ethers.js`.
     * - `'bigint'`: Converts and returns the value as a native JavaScript `BigInt`.
     */
    format: { type: 'readable' },
  })

  // Create a trade from the factory
  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
    toTokenAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
  })

  // Generate a trade quote
  const quote = await trade.quote('100')

  console.log(quote)

  // Example of the trade quote containing various information about the swap,
  // including `transaction` which can be used to execute the swap.
  // @ts-ignore
  const exampleConsoleLog = {
    /**
     * The tag of the DEX used for the trade.
     */
    dexTag: 'PULSEX',
    /**
     * The protocol of the DEX used for the trade.
     */
    protocol: 'protocolV2',
    /**
     * The version of the DEX used for the trade.
     */
    version: { major: 1, minor: 0, patch: 0 },
    /**
     * The direction of the trade, indicating whether the trade is an input (buy) or output (sell) operation.
     */
    tradeDirection: 'input',
    /**
     * The base amount to be converted in the trade, represented as a string.
     */
    baseConvertRequest: '100',
    /**
     * The minimum amount to receive from the trade, accounting for slippage.
     * Undefined when the trade direction is output.
     */
    minAmountConvertQuote: '1032.042070',
    /**
     * The maximum amount that can be sent for the trade.
     * Undefined when the trade direction is input.
     */
    maximumSent: undefined,
    /**
     * The expected amount to be received or converted from the trade.
     */
    expectedConvertQuote: '1037.228211',
    /**
     * The liquidity provider fee for the trade, which can be a single number (v2) or an array of numbers (v3).
     * Undefined when wrapping/unwrapping tokens.
     */
    liquidityProviderFee: '0.300000000000000000',
    /**
     * The liquidity provider fee as a percentage for the trade, which can be a single number (v2) or an array of numbers (v3).
     * Undefined when wrapping/unwrapping tokens.
     */
    liquidityProviderFeePercent: 0.003,
    /**
     * The Unix timestamp indicating when the trade expires.
     */
    tradeExpires: 1726098260,
    /**
     * The impact of the trade on the price of the assets being traded.
     * Undefined when price impact is disabled in the trade settings.
     */
    priceImpact: {
      /**
       * The 100-based percentage representing the price impact of the trade.
       * Undefined when price impact is disabled in the trade settings.
       */
      percentage: '0.32',
      /**
       * Whether the price impact is considered minimal, less than "0.01%".
       */
      isMinimal: false,
    },
    /**
     * The tokens involved in the route path of the trade.
     */
    routePathTokens: [
      {
        name: 'Uniswap token',
        symbol: 'UNI',
        decimals: 18,
        color: 'rgb(247, 30, 185)',
        chainId: 943,
        contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        standard: 'PRC20',
        logoUri:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
      },
      {
        name: 'Wrapped Pulse',
        symbol: 'WPLS',
        decimals: 18,
        color: 'rgb(5, 185, 213)',
        chainId: 943,
        contractAddress: '0x70499adEBB11Efd915E3b69E700c331778628707',
        standard: 'PRC20',
        logoUri:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0x70499adEBB11Efd915E3b69E700c331778628707/logo.png',
      },
      {
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6,
        color: '',
        chainId: 943,
        contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        standard: 'PRC20',
        logoUri:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
      },
    ],
    /**
     * A human-readable representation of the route path for the trade.
     */
    routePathText: 'UNI > WPLS > USDT',
    /**
     * The addresses of the tokens involved in the route path of the trade.
     */
    routePathAddresses: [
      '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      '0x70499adEBB11Efd915E3b69E700c331778628707',
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ],
    /**
     * The addresses of the pairs involved in the trade.
     */
    pairAddresses: [
      '0x7b813BB8df019Cb351CdD31151C208E9c02885A1',
      '0x362289D3Cf77BdD4c2523C83d0d6DB49231b5290',
    ] /**
     * A collection of attempted route quotes categorized by DEX type.
     */,
    attemptedRouteQuotes: {
      PULSEX: [
        {
          expectedConvertQuote: '1037.228211',
          expectedConvertQuoteOrTokenAmountInMaxWithSlippage: '1032.042070',
          transaction: {
            to: '0xDaE9dd3d1A52CfCe9d5F2fAC7fDe164D500E50f7',
            from: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1',
            data: '0x38ed17390000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000000000000003d83b65600000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000acae34847ab1c58e61f7caa8a5f7e755a08195b10000000000000000000000000000000000000000000000000000000066e2413700000000000000000000000000000000000000000000000000000000000000030000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f98400000000000000000000000070499adebb11efd915e3b69e700c331778628707000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7',
            value: '0x00',
          },
          tradeExpires: 1726103863,
          routePathTokens: [
            {
              name: 'Uniswap token',
              symbol: 'UNI',
              decimals: 18,
              color: 'rgb(247, 30, 185)',
              chainId: 943,
              contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
              standard: 'PRC20',
              logoUri:
                'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
            },
            {
              name: 'Wrapped Pulse',
              symbol: 'WPLS',
              decimals: 18,
              color: 'rgb(5, 185, 213)',
              chainId: 943,
              contractAddress: '0x70499adEBB11Efd915E3b69E700c331778628707',
              standard: 'PRC20',
              logoUri:
                'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0x70499adEBB11Efd915E3b69E700c331778628707/logo.png',
            },
            {
              name: 'Tether USD',
              symbol: 'USDT',
              decimals: 6,
              color: '',
              chainId: 943,
              contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
              standard: 'PRC20',
              logoUri:
                'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
            },
          ],
          routePathText: 'UNI > WPLS > USDT',
          routePathAddresses: [
            '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
            '0x70499adEBB11Efd915E3b69E700c331778628707',
            '0xdac17f958d2ee523a2206206994597c13d831ec7',
          ],
          pairAddresses: [
            '0x7b813BB8df019Cb351CdD31151C208E9c02885A1',
            '0x362289D3Cf77BdD4c2523C83d0d6DB49231b5290',
          ],
          dexTag: 'PULSEX',
          protocol: 'protocolV2',
          version: { major: 1, minor: 0, patch: 0 },
          liquidityProviderFeePercent: 0.003,
          tradeDirection: 'input',
        },
        {
          expectedConvertQuote: '1033.150867',
          expectedConvertQuoteOrTokenAmountInMaxWithSlippage: '1027.985113',
          transaction: {
            to: '0xDaE9dd3d1A52CfCe9d5F2fAC7fDe164D500E50f7',
            from: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1',
            data: '0x38ed17390000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000000000000003d45ced900000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000acae34847ab1c58e61f7caa8a5f7e755a08195b10000000000000000000000000000000000000000000000000000000066e2413700000000000000000000000000000000000000000000000000000000000000040000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f98400000000000000000000000070499adebb11efd915e3b69e700c331778628707000000000000000000000000826e4e896cc2f5b371cd7bb0bd929db3e3db67c0000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7',
            value: '0x00',
          },
          tradeExpires: 1726103863,
          routePathTokens: [
            {
              name: 'Uniswap token',
              symbol: 'UNI',
              decimals: 18,
              color: 'rgb(247, 30, 185)',
              chainId: 943,
              contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
              standard: 'PRC20',
              logoUri:
                'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
            },
            {
              name: 'Wrapped Pulse',
              symbol: 'WPLS',
              decimals: 18,
              color: 'rgb(5, 185, 213)',
              chainId: 943,
              contractAddress: '0x70499adEBB11Efd915E3b69E700c331778628707',
              standard: 'PRC20',
              logoUri:
                'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0x70499adEBB11Efd915E3b69E700c331778628707/logo.png',
            },
            {
              name: 'Dai Stablecoin',
              symbol: 'tDAI',
              decimals: 18,
              color: '',
              chainId: 943,
              contractAddress: '0x826e4e896CC2f5B371Cd7Bb0bd929DB3e3DB67c0',
              standard: 'PRC20',
              logoUri:
                'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0x826e4e896CC2f5B371Cd7Bb0bd929DB3e3DB67c0/logo.png',
            },
            {
              name: 'Tether USD',
              symbol: 'USDT',
              decimals: 6,
              color: '',
              chainId: 943,
              contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
              standard: 'PRC20',
              logoUri:
                'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
            },
          ],
          routePathText: 'UNI > WPLS > tDAI > USDT',
          routePathAddresses: [
            '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
            '0x70499adEBB11Efd915E3b69E700c331778628707',
            '0x826e4e896CC2f5B371Cd7Bb0bd929DB3e3DB67c0',
            '0xdac17f958d2ee523a2206206994597c13d831ec7',
          ],
          pairAddresses: [
            '0x7b813BB8df019Cb351CdD31151C208E9c02885A1',
            '0xA2D510bf42D2B9766DB186F44a902228E76ef262',
            '0xDfB8224F112a5500306Df87a18Eec140332ee1Dd',
          ],
          dexTag: 'PULSEX',
          protocol: 'protocolV2',
          version: { major: 1, minor: 0, patch: 0 },
          liquidityProviderFeePercent: 0.003,
          tradeDirection: 'input',
        },
      ],
    },
    /**
     * The transaction required for approving the maximum allowance.
     * Undefined when no approval is needed.
     */
    approvalTransaction: {
      to: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      from: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1',
      data: '0x095ea7b3000000000000000000000000dae9dd3d1a52cfce9d5f2fac7fde164d500e50f7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      value: '0x00',
    },
    /**
     * The info for the token being traded from (the input token).
     */
    fromTokenInfo: {
      token: {
        name: 'Uniswap token',
        symbol: 'UNI',
        decimals: 18,
        color: 'rgb(247, 30, 185)',
        chainId: 943,
        contractAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        standard: 'PRC20',
        logoUri:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
      },
      balance: '0',
      hasEnoughBalance: false,
      allowance: '79228162514264337593543950335',
      hasEnoughAllowance: true,
      isMaxAllowance: false,
      value: 0,
    },
    /**
     * The info for the token being traded to (the output token).
     */
    toTokenInfo: {
      token: {
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6,
        color: '',
        chainId: 943,
        contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        standard: 'PRC20',
        logoUri:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
      },
      balance: '0.042585',
      value: 0,
    },
    /**
     * The transaction object representing the trade.
     */
    transaction: {
      to: '0xDaE9dd3d1A52CfCe9d5F2fAC7fDe164D500E50f7',
      from: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1',
      data: '0x38ed17390000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000000000000003d83b65600000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000acae34847ab1c58e61f7caa8a5f7e755a08195b10000000000000000000000000000000000000000000000000000000066e22b5400000000000000000000000000000000000000000000000000000000000000030000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f98400000000000000000000000070499adebb11efd915e3b69e700c331778628707000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7',
      value: '0x00',
    },
    /**
     * The source of the estimated gas price for the trade.
     * Undefined when gas settings were not set in the trade settings.
     */
    gasPriceEstimatedBy: undefined,
  }
}

// Example: Multi-DEX Quote
export const getMultiDexQuote = async () => {
  const multiDexFactory = new DexFactory({
    providerContext: { chainId: 1 },
    walletAddress: '0x1234...',
    dexContext: [
      'UNISWAP',
      'SUSHISWAP',
      'PANCAKESWAP',
      // { YOUR_CUSTOM_DEX_CONFIG },
    ],
  })

  const tradeInstance = await multiDexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
  })

  const quote = await tradeInstance.quote('100')

  console.log(quote)
}

// Example: Trade Direction Input
export const tradeDirectionInput = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 1 },
    walletAddress: '0x1234...',
    dexContext: ['UNISWAP', 'SUSHISWAP', 'PANCAKESWAP'],
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
  })

  const fromTokenAmount = '100'

  // By default the trade direction is input
  let quote = await trade.quote(fromTokenAmount)
  // You may also specify it explicitly
  quote = await trade.quote({
    direction: 'input',
    fromAmount: fromTokenAmount,
  })

  // The quote will return the amount of the output tokens expected
  console.log(quote)
}

// Example: Trade Direction Output
export const tradeDirectionOutput = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 1 },
    walletAddress: '0x1234...',
    dexContext: ['UNISWAP', 'SUSHISWAP', 'PANCAKESWAP'],
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
  })

  const quote = await trade.quote({
    direction: 'output',
    toAmount: '100',
  })

  // The quote will return the amount of the input tokens needed to output 100 tokens
  console.log(quote)
}

// Example: Trade with Custom Settings
export const tradeWithCustomSettings = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 1 },
    walletAddress: '0x1234...',
    dexContext: 'UNISWAP',
    // Turn off price context
    multiPriceContext: undefined,
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
    // All settings are optional
    settings: {
      /**
       * The address that will receive the output tokens from the swap.
       * If not provided, the default is to send the output tokens to the address initiating the swap.
       *
       * @default ''
       */
      recipient: '0x1234...',
      /**
       * Slippage in percentage
       * For example, a value of 0.005 will be 0.5% or 50 bips.
       *
       * @default 0.005
       */
      slippage: 0.005,
      /**
       * The number of minutes before the transaction expires.
       *
       * @default 20
       */
      deadlineMinutes: 20,
      /**
       * Disable multihops, forcing direct routes.
       *
       * @default false
       */
      disableMultihops: false,
      /**
       * Prevent the built-in block listener from observing changes.
       *
       * @default false
       */
      disableObserver: false,
      /**
       * Number of blocks to skip between each quote, reducing the number of calls to the node.
       *
       * @default 0
       */
      observerBlockSkip: 3,
      /**
       * When `true`, disables the price impact calculation for the trade.
       *
       * @default false
       */
      disablePriceImpact: false,
      /**
       * When `true`, enables support for fee-on-transfer tokens (commonly used by deflationary tokens).
       * Fee-on-transfer tokens automatically deduct a percentage as a fee upon each transfer.
       *
       * @default false
       */
      hasFeeOnTransfer: false,
      /**
       * Filter to choose which DEX versions to use. Defaults to all.
       *
       * @default All protocols of targeted DEXs
       */
      protocolSettings: {
        protocolV2: {
          // Enables/disables all versions of the protocol
          enabled: true,
          // Optionally include/exclude versions
          includeVersions: [{ major: 1, minor: 0, patch: 0 }],
          excludeVersions: [{ major: 2, minor: 0, patch: 0 }],
        },
        protocolV3: {
          enabled: true,
          includeVersions: [{ major: 1, minor: 0, patch: 0 }],
          excludeVersions: [{ major: 2, minor: 0, patch: 0 }],
        },
      },
      /**
       * Gas price settings, where the `getGasPrice` function returns the gas price in GWEI.
       *
       * @default undefined
       */
      gasSettings: {
        getGasPrice: async () => '90',
      },
      /**
       * Whether to approve the the maximum token amount, or the exact token amount.
       *
       * @default true
       */
      approveMax: true,
      /**
       * Multiplier for the token approval amount to add a buffer.
       * Only applies when `approveMax` is false.
       * For example, a value of 1.05 represents a 5% buffer.
       *
       * @default 1.05
       */
      approvalBufferFactor: 1.05,
    },
  })

  const quote = await trade.quote('100')

  console.log(quote)
}

// Example: Trade with Price Context
export const tradeWithPriceContext = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0x1234...',
    dexContext: 'PULSEX',
    multiPriceContext: {
      priceCtxs: [
        { sourceType: 'coingecko', apiKey: 'your-api-key' },
        { sourceType: 'coinmarketcap', apiKey: 'your-api-key' },
        { sourceType: 'cryptocompare', apiKey: 'your-api-key' },
      ],
      /**
       * Describes the methods for calculating price from multiple sources.
       * - `min`: Select the minimum price.
       * - `max`: Select the maximum price.
       * - `median`: Select the median price.
       */
      calculationMethod: 'median',
    },
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
  })

  const quote = await trade.quote('100')

  console.log(quote)
}

// Example: Custom Network
export const tradeWithCustomNetwork = async () => {
  const chainId = 943
  const rpcUrl = 'https://rpc.v4.testnet.pulsechain.com'

  // Custom Network example (Optional)
  const customNetwork: DexCustomNetwork = {
    name: 'PulseChain Testnet',
    multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
    nativeCurrency: {
      name: 'Pulse',
      symbol: 'tPLS',
    },
    nativeWrappedTokenInfo: {
      name: 'Wrapped PLS',
      symbol: 'WPLS',
      decimals: 18,
      chainId,
      contractAddress: '0x70499adEBB11Efd915E3b69E700c331778628707',
      standard: 'PRC20',
    },
  }

  const providerChainIdContext: DexChainIdAndProviderContext = {
    chainId,
    // Optional. Provide if chainId is not supported out of the box, or you want to override the default rpc url
    rpcUrl,
    // Optional. Provide if you want to use a custom network not supported out of the box, or you want to override the default network
    customNetwork,
  }

  const dexFactory = new DexFactory({
    providerContext: providerChainIdContext,
    walletAddress: '0x1234...',
    dexContext: ['PULSEX'],
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
  })

  const quote = await trade.quote('100')

  console.log(quote)
}

// Example: Custom DEX and Network
export const tradeWithCustomDexAndNetwork = async () => {
  const chainId = 943
  const ethersProvider = new ethers.providers.JsonRpcProvider(
    'https://rpc.v4.testnet.pulsechain.com',
    chainId,
  )

  const dexFactory = new DexFactory({
    // You could also use a chainId and an optional custom rpc url instead of an ethers provider
    providerContext: {
      ethersProvider,
      customNetwork: {
        name: 'PulseChain Testnet',
        multicallContractAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
        nativeCurrency: { name: 'Pulse', symbol: 'tPLS' },
        nativeWrappedTokenInfo: {
          name: 'Wrapped PLS',
          symbol: 'WPLS',
          decimals: 18,
          chainId,
          contractAddress: '0x70499adEBB11Efd915E3b69E700c331778628707',
          standard: 'PRC20',
        },
      },
    },
    walletAddress: '0x1234...',
    dexContext: [
      {
        dexType: 'CUSTOM',
        dexTag: 'CUSTOM_DEX_NAME',
        protocols: {
          protocolV2: {
            '1-0-0': {
              feePercent: 0.003,
              router: {
                address: '0x1715a3E4A142d8b698131108995174F37aEBA10D',
                abi: pulseXRouterV2ABI,
                methods: {
                  ...defaultRouterMethodMapV2,
                  // You can map custom method names to keep contracts compatible with other dexes
                  WETH: 'WPLS',
                },
              },
              factory: {
                address: '0x29eA7545DEf87022BAdc76323F373EA1e707C523',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
            '2-0-0': {
              feePercent: 0.003,
              router: {
                address: '0x98bf93ebf5c380C0e6Ae8e192A7e2AE08edAcc02',
                abi: pulseXRouterV2ABI,
                methods: {
                  ...defaultRouterMethodMapV2,
                  WETH: 'WPLS',
                },
              },
              factory: {
                address: '0x29eA7545DEf87022BAdc76323F373EA1e707C523',
                abi: uniswapFactoryV2ABI,
              },
              pair: {
                abi: uniswapPairV2ABI,
              },
            },
          },
        },
      },
    ],
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
  })

  const quote = await trade.quote('100')

  console.log('Custom DEX Quote:', quote)
}

// Example: Trade with Quote Changed Subscription
export const tradeWithTradeSubscription = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0x1234...',
    dexContext: 'PULSEX',
    format: { type: 'dexnumber' },
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
    settings: {
      /**
       * Number of blocks to skip between each quote, reducing the number of calls to the node.
       *
       * @default 0
       */
      observerBlockSkip: 3,
    },
  })

  const quote = await trade.quote('100')
  const targetAmount = '2000'

  // Listen for changes in our quote
  const subscription = quote.observer$.subscribe(
    async ({ blockNumber, latestQuote }) => {
      const hitTargetAmount = latestQuote.expectedConvertQuote.gte(
        DexNumber.fromUnshifted(
          targetAmount,
          latestQuote.toTokenInfo.token.decimals,
        ),
      )

      if (hitTargetAmount) {
        subscription.unsubscribe()
        // Or call unsubscribe from the quote
        // quote.unsubscribe()
        // Or call destroy to clean up all liquidity quotes and subscriptions
        // trade.destroy()

        const wallet = new Wallet('0xPrivateKey', trade.dexProvider.provider)

        if (latestQuote.approvalTransaction) {
          try {
            const response = await wallet.sendTransaction(
              latestQuote.approvalTransaction,
            )
            const receipt = await response.wait(1)

            console.log('Approval receipt', receipt)
          } catch (error) {
            console.log(error)
          }
        }

        const response = await wallet.sendTransaction(latestQuote.transaction)
        const receipt = await response.wait(1)

        console.log({ blockNumber, receipt })
      }
    },
  )
}

// Example: Manual Requote
export const manualRequote = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0x1234...',
    dexContext: 'PULSEX',
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
    settings: {
      // Disable the built in quote observer
      disableObserver: true,
    },
  })

  const quote = await trade.quote('100')

  // Here we use a block event to trigger the requote, but you can use any trigger you want
  trade.dexProvider.provider.on('block', async () => {
    console.log('Requoting...')
    await trade.requote(quote.id)
  })

  // When ever `requote` is executed, the stream will update if there are any changes to the quote
  const subscription = quote.observer$.subscribe(
    ({ blockNumber, latestQuote }) => {
      subscription.unsubscribe()
      // Or call unsubscribe from the quote
      // quote.unsubscribe()
      // Or call destroy to clean up all trade quotes and subscriptions
      // trade.destroy()

      console.log(
        `Quote changed (${blockNumber}): ${latestQuote.expectedConvertQuote} ${latestQuote.toTokenInfo.token.symbol}`,
      )
    },
  )
}

// Example: Executing a Trade with Approve and Swap
export const executeTradeWithApproval = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0x1234...',
    dexContext: 'PULSEX',
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
  })

  const quote = await trade.quote('100')

  const wallet = new Wallet('0xPrivateKey', trade.dexProvider.provider)

  if (quote.approvalTransaction) {
    try {
      const response = await wallet.sendTransaction(quote.approvalTransaction)
      const receipt = await response.wait(1)
      console.log('Approval receipt', receipt)
    } catch (error) {
      console.log(error)
    }
  }

  const response = await wallet.sendTransaction(quote.transaction)
  const receipt = await response.wait(1)

  console.log('Swap receipt', receipt)
}

// Example: Approving Custom Router Allowance
export const approveCustomRouterAllowance = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 1 },
    walletAddress: '0x1234...',
    dexContext: ['UNISWAP', 'SUSHISWAP', 'PANCAKESWAP'],
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
  })

  const transaction = await trade.generateApproveRouterAllowanceTransaction({
    dexTag: 'UNISWAP',
    protocol: 'protocolV2',
    version: { major: 1, minor: 0, patch: 0 },
    amount: '0.1',
  })

  console.log(transaction)

  const wallet = new Wallet('0xPrivateKey', trade.dexProvider.provider)

  const response = await wallet.sendTransaction(transaction)
  const receipt = await response.wait(1)

  console.log('Approval receipt', receipt)
}

// Example: Approving Max Router Allowance
export const approveMaxRouterAllowance = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 1 },
    walletAddress: '0x1234...',
    dexContext: ['UNISWAP', 'SUSHISWAP', 'PANCAKESWAP'],
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
  })

  const transaction = await trade.generateApproveRouterAllowanceTransaction({
    dexTag: 'UNISWAP',
    protocol: 'protocolV2',
    version: { major: 1, minor: 0, patch: 0 },
    // Omit amount to use the max allowance
  })

  console.log(transaction)

  const wallet = new Wallet('0xPrivateKey', trade.dexProvider.provider)

  const response = await wallet.sendTransaction(transaction)
  const receipt = await response.wait(1)

  console.log('Approval receipt', receipt)
}

// Example: Get Versioned Route Paths by DEX
export const getVersionedRoutePaths = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0x1234...',
    dexContext: 'PULSEX',
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
  })

  const versionedRoutePathsByDex = await trade.getVersionedRoutePathsByDex()

  console.log(versionedRoutePathsByDex)
}

// Example: Get Route Quotes
export const getRouteQuotes = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0x1234...',
    dexContext: 'PULSEX',
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
  })

  const routeQuotes = await trade.getRouteQuotes({
    amountToTrade: '100',
    tradeDirection: tradeDirectionMap.input,
  })

  console.log(routeQuotes)
}

// Example: Get Pool Reserves
export const getPoolReserves = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0x1234...',
    dexContext: 'PULSEX',
  })

  const trade = await dexFactory.createTrade({
    fromTokenAddress: '0x1234...',
    toTokenAddress: '0x5678...',
  })

  const reserves = await trade.getPoolReserves({
    pairAddresses: ['0x7b813BB8df019Cb351CdD31151C208E9c02885A1'],
    protocol: 'protocolV2',
    dexTag: 'PULSEX',
    version: { major: 1, minor: 0, patch: 0 },
  })

  console.log(reserves)
}

// ------------------------
// Liquidity
// ------------------------

// Example: Add Liquidity
export const addLiquidity = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1',
    dexContext: ['PULSEX'],
    format: { type: 'readable' },
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    tokenBAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
  })

  const quote = await liquidity.addLiquidity({
    dexTag: 'PULSEX',
    protocol: 'protocolV2',
    version: { major: 1, minor: 0, patch: 0 },
    // Provide either the tokenA or tokenB amount and the other will be calculated automatically.
    // Provide both to override the calculated values.
    tokenAAmount: '100',
  })

  console.log(quote)

  // Example of the liquidity quote containing various information for adding liquidity.
  // @ts-ignore
  const exampleConsoleLog = {
    /** The unique ID for the context */
    id: 'f358a3a6-a6be-4eaf-a407-4f10fe76131b',

    /** The tag of the decentralized exchange (DEX) being used */
    dexTag: 'PULSEX',

    /** The protocol of the DEX being used */
    protocol: 'protocolV2',

    /** The version of the DEX used for liquidity */
    version: { major: 1, minor: 0, patch: 0 },

    /** The direction of the liquidity operation (add or remove) */
    liquidityDirection: 'add',

    /** The slippage tolerance for the liquidity operation, expressed as a decimal (e.g., 0.01 for 1%) */
    slippage: 0.005,

    /** The Unix timestamp after which the transaction will revert */
    deadline: 1731353101,

    /**
     * Set of transactions needed to enable token spending, if required.
     * V2: If removing liquidity and permit data is passed in, this will be set to undefined.
     */
    enableTransactions: {
      /** The transaction needed to enable spending of tokenA, if required */
      tokenA: {
        to: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7',
        from: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1',
        data: '0x095ea7b3000000000000000000000000dae9dd3d1a52cfce9d5f2fac7fde164d500e50f7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        value: '0x00',
      },
      /** The transaction needed to enable spending of tokenB, if required */
      tokenB: {
        to: '0x70499adEBB11Efd915E3b69E700c331778628707',
        from: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1',
        data: '0x095ea7b3000000000000000000000000dae9dd3d1a52cfce9d5f2fac7fde164d500e50f7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        value: '0x00',
      },
    },

    /** The main transaction that will perform the liquidity operation */
    transaction: {
      to: '0xDaE9dd3d1A52CfCe9d5F2fAC7fDe164D500E50f7',
      from: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1',
      data: '0xe8e337000000000000000000000000008a810ea8b121d08342e9e7696f4a9915cbe494b700000000000000000000000070499adebb11efd915e3b69e700c3317786287070000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000011e3644c037c1858b00000000000000000000000000000000000000000000000564d702d38f5e00000000000000000000000000000000000000000000000000011cc7eace9de08dd5000000000000000000000000acae34847ab1c58e61f7caa8a5f7e755a08195b10000000000000000000000000000000000000000000000000000000067325a0d',
      value: '0x00',
    },

    /** Information about the first token in the liquidity pair */
    tokenAInfo: {
      token: {
        name: 'PulseX',
        symbol: 'PLSX',
        decimals: 18,
        color: 'rgb(0, 254, 112)',
        chainId: 943,
        contractAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7',
        standard: 'PRC20',
        logoUri:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0x8a810ea8B121d08342E9e7696f4a9915cBE494B7/logo.png',
      },
      amount: '100.000000000000000000',
      balance: '9.250263818388626889',
      allowance: '9.250263818388626889',
      hasEnoughBalance: false,
      hasEnoughAllowance: false,
      isMaxAllowance: false,
      isCoin: false,
    },

    /** Information about the second token in the liquidity pair */
    tokenBInfo: {
      token: {
        name: 'Wrapped Pulse',
        symbol: 'WPLS',
        decimals: 18,
        color: 'rgb(5, 185, 213)',
        chainId: 943,
        contractAddress: '0x70499adEBB11Efd915E3b69E700c331778628707',
        standard: 'PRC20',
        logoUri:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0x70499adEBB11Efd915E3b69E700c331778628707/logo.png',
      },
      amount: '20.623747135949604235',
      balance: '0.511553843587478274',
      allowance: '0.000000000000000000',
      hasEnoughBalance: false,
      hasEnoughAllowance: false,
      isMaxAllowance: false,
      isCoin: false,
    },

    /** Information about the liquidity pool (LP) token */
    lpTokenInfo: {
      token: {
        chainId: 943,
        contractAddress: '0xFfd1fD891301D347ECaf4fC76866030387e97ED4',
        symbol: 'PLP',
        decimals: 18,
        name: 'PulseX LP',
        standard: 'PRC20',
      },
      amount: undefined,
      balance: '0.000000000000000000',
      allowance: '0.000000000000000000',
      hasEnoughBalance: undefined,
      hasEnoughAllowance: undefined,
      totalSupply: '173,485,006,421.031475748512189402',
      isCoin: false,
    },

    /** The current share of the pool */
    shareOfPool: '0.000000000000000000',

    /** The expected share of the pool after the liquidity operation */
    expectedShareOfPool: '0.000000026177118500',

    /** The current prices between the two tokens in the pool */
    prices: {
      aTokenPerBToken: '4.848779387218547690',
      bTokenPerAToken: '0.206237471359496042',
    },

    /** The expected amount of liquidity to be added or removed */
    expectedLiquidity: '45.413375890979069836',

    /** The minimum amount of liquidity acceptable for the operation, considering slippage */
    minLiquidity: '45.186309011524174486',
  }
}

// Example: Liquidity with Approve and Remove
export const removeLiquidity = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1',
    dexContext: ['PULSEX'],
    format: { type: 'readable' },
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    tokenBAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
  })

  const quote = await liquidity.removeLiquidity({
    dexTag: 'PULSEX',
    protocol: 'protocolV2',
    version: { major: 1, minor: 0, patch: 0 },
    lpTokenAmount: '0.1',
    minTokenAAmount: '1',
    minTokenBAmount: '5',
    permit: false,
    supportFeeOnTransferTokens: false,
  })

  console.log(quote)

  // Example of the liquidity quote containing various information for removing liquidity.
  // @ts-ignore
  const exampleConsoleLog = {
    /** The unique ID for the context */
    id: '8cad521b-02ec-45d7-b20e-45f3f2d8ddbf',

    /** The tag of the decentralized exchange (DEX) being used */
    dexTag: 'PULSEX',

    /** The protocol of the DEX being used */
    protocol: 'protocolV2',

    /** The version of the DEX used for liquidity */
    version: { major: 1, minor: 0, patch: 0 },

    /** The direction of the liquidity operation (add or remove) */
    liquidityDirection: 'remove',

    /** The slippage tolerance for the liquidity operation, expressed as a decimal (e.g., 0.01 for 1%) */
    slippage: 0.005,

    /** The Unix timestamp after which the transaction will revert */
    deadline: 1731353870,

    /** The main transaction that will perform the liquidity operation */
    transaction: {
      to: '0xDaE9dd3d1A52CfCe9d5F2fAC7fDe164D500E50f7',
      from: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1',
      data: '0xbaa2abde0000000000000000000000008a810ea8b121d08342e9e7696f4a9915cbe494b70000000000000000000000002b591e99afe9f32eaa6214f7b7629768c40eeb39000000000000000000000000000000000000000000000000016345785d8a00000000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000001dcd6500000000000000000000000000acae34847ab1c58e61f7caa8a5f7e755a08195b10000000000000000000000000000000000000000000000000000000067325d0d',
      value: '0x00',
    },

    /** Information about the first token in the liquidity pair */
    tokenAInfo: {
      token: {
        name: 'PulseX',
        symbol: 'PLSX',
        decimals: 18,
        color: 'rgb(0, 254, 112)',
        chainId: 943,
        contractAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7',
        standard: 'PRC20',
        logoUri:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0x8a810ea8B121d08342E9e7696f4a9915cBE494B7/logo.png',
      },
      amount: undefined,
      balance: '9.250263818388626889',
      allowance: '9.250263818388626889',
      hasEnoughBalance: undefined,
      hasEnoughAllowance: undefined,
      isCoin: false,
    },

    /** Information about the second token in the liquidity pair */
    tokenBInfo: {
      token: {
        name: 'HEX',
        symbol: 'HEX',
        decimals: 8,
        color: 'rgb(255, 7, 184)',
        chainId: 943,
        contractAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39',
        standard: 'PRC20',
        logoUri:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/pulse/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png',
      },
      amount: undefined,
      balance: '0.00000000',
      allowance: '0.00000000',
      hasEnoughBalance: undefined,
      hasEnoughAllowance: undefined,
      isCoin: false,
    },

    /** Information about the liquidity pool (LP) token */
    lpTokenInfo: {
      token: {
        chainId: 943,
        contractAddress: '0xf96B8c17610F379C021EC5565E45AF82AA6391b2',
        symbol: 'PLP',
        decimals: 18,
        name: 'PulseX LP',
        standard: 'PRC20',
      },
      amount: undefined,
      balance: '0.000000000000000000',
      allowance: '0.000000000000000000',
      hasEnoughBalance: undefined,
      hasEnoughAllowance: undefined,
      totalSupply: '3,571.226502511590054385',
      isCoin: false,
    },

    /** The current share of the pool */
    shareOfPool: '0.000000000000000000',

    /** The expected share of the pool after the liquidity operation */
    expectedShareOfPool: '0.000000000000000000',

    /** The current prices between the two tokens in the pool */
    prices: {
      aTokenPerBToken: '12,302,743,272,666.837920566679339782',
      bTokenPerAToken: '0.000000000000081282',
    },

    /** The expected amount of liquidity to be added or removed */
    expectedLiquidity: '0.100000000000000000',

    /** The minimum amount of liquidity acceptable for the operation, considering slippage */
    minLiquidity: '0.099500000000000000',
  }
}

// Example: Remove Liquidity with Permit
export async function removeLiquidityWithPermit() {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.example.com',
    1,
  )
  const signer = new ethers.Wallet('0xPrivateKey', provider)

  const walletAddress = await signer.getAddress()

  const dexFactory = new DexFactory({
    // Must provide a signer for permit generation
    providerContext: { ethersSigner: signer },
    walletAddress,
    dexContext: ['UNISWAP', 'SUSHISWAP', 'PANCAKESWAP'],
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    tokenBAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
    settings: {
      // Set this to true if you want the permit to approve the max amount
      approveMax: true,
    },
  })

  const quote = await liquidity.removeLiquidity({
    dexTag: 'UNISWAP',
    protocol: 'protocolV2',
    version: { major: 1, minor: 0, patch: 0 },
    lpTokenAmount: '0.1',
    minTokenAAmount: '1',
    minTokenBAmount: '5',
    // Set this to true if you want to auto generate the permit signature
    // Or set to false or omit if you don't want to use permit
    permit: true,
    // If you want to manually provide the permit signature
    // permit: {
    //   approveMax: false,
    //   permitData: {
    //     v: 2,
    //     r: '0xYourPermitSignature',
    //     s: '0xYourPermitSignature',
    //   },
    // },
    supportFeeOnTransferTokens: false, // Deflationary tokens
  })

  console.log(quote)

  const { approvalReceipts, transactionReceipt } =
    (await quote.execute?.({
      approvalConfirmations: 1,
      transactionConfirmations: 1,
    })) ?? {}

  console.log('Approval receipts', approvalReceipts)
  console.log('Remove liquidity receipt', transactionReceipt)
}

// Example: Liquidity with Approve and Add
export const addLiquidityWithApproval = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1',
    dexContext: 'PULSEX',
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    tokenBAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
  })

  const quote = await liquidity.addLiquidity({
    dexTag: 'PULSEX',
    protocol: 'protocolV2',
    version: { major: 1, minor: 0, patch: 0 },
    tokenAAmount: '100',
  })

  const wallet = new Wallet('0xPrivateKey', liquidity.dexProvider.provider)

  if (quote.enableTransactions) {
    const approvalResults = await Promise.all(
      Object.values(quote.enableTransactions).map((tx) =>
        wallet.sendTransaction(tx).then((res) => res.wait(1)),
      ),
    )

    console.log('Approval receipts:', approvalResults)
  }

  if (quote.transaction) {
    const response = await wallet.sendTransaction(quote.transaction)
    const receipt = await response.wait(1)

    console.log('Add liquidity receipt:', receipt)
  }
}

// Example: Liquidity with Approve and Remove
export const removeLiquidityWithApproval = async () => {
  const dexFactory = new DexFactory({
    providerContext: { chainId: 943 },
    walletAddress: '0xAcAe34847aB1c58E61f7CAA8a5f7e755a08195b1',
    dexContext: 'PULSEX',
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    tokenBAddress: '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
  })

  const quote = await liquidity.removeLiquidity({
    lpTokenAmount: '0.1',
    minTokenAAmount: '1',
    minTokenBAmount: '5',
    protocol: 'protocolV2',
    dexTag: 'PULSEX',
    version: { major: 1, minor: 0, patch: 0 },
    supportFeeOnTransferTokens: false,
  })

  const wallet = new Wallet('0xPrivateKey', liquidity.dexProvider.provider)

  if (quote.enableTransactions?.lpToken) {
    const approvalResponse = await wallet.sendTransaction(
      quote.enableTransactions.lpToken,
    )
    const approvalReceipt = await approvalResponse.wait(1)

    console.log('Approval receipt:', approvalReceipt)
  }

  if (quote.transaction) {
    const response = await wallet.sendTransaction(quote.transaction)
    const receipt = await response.wait(1)

    console.log('Remove liquidity receipt:', receipt)
  }
}

// Example: Liquidity with Custom Settings
export const addLiquidityWithCustomSettings = async () => {
  const customSettingsFactory = new DexFactory({
    providerContext: { chainId: 1 },
    walletAddress: '0x1234...',
    dexContext: 'UNISWAP',
  })

  const liquidity = await customSettingsFactory.createLiquidity({
    tokenAAddress: '0x1234...',
    tokenBAddress: '0x5678...',
    // All settings are optional
    settings: {
      /**
       * The address that will receive the output tokens from the swap.
       * If not provided, the default is to send the output tokens to the address initiating the swap.
       *
       * @default ''
       */
      recipient: '0x1234...',
      /**
       * Slippage in percentage
       * For example, a value of 0.005 will be 0.5% or 50 bips.
       *
       * @default 0.005
       */
      slippage: 0.005,
      /**
       * The number of minutes before the transaction expires.
       *
       * @default 20
       */
      deadlineMinutes: 20,
      /**
       * Disable multihops, forcing direct routes.
       *
       * @default false
       */
      disableMultihops: false,
      /**
       * Prevent the built-in block listener from observing changes.
       *
       * @default false
       */
      disableObserver: false,
      /**
       * Number of blocks to skip between each quote, reducing the number of calls to the node.
       *
       * @default 0
       */
      observerBlockSkip: 3,
      /**
       * Filter to choose which DEX versions to use. Defaults to all.
       *
       * @default All protocols of targeted DEXs
       */
      protocolSettings: {
        protocolV2: {
          // Enables/disables all versions of the protocol
          enabled: true,
          // Optionally include/exclude versions
          includeVersions: [{ major: 1, minor: 0, patch: 0 }],
          excludeVersions: [{ major: 2, minor: 0, patch: 0 }],
        },
        protocolV3: {
          enabled: true,
          includeVersions: [{ major: 1, minor: 0, patch: 0 }],
          excludeVersions: [{ major: 2, minor: 0, patch: 0 }],
        },
      },
      /**
       * Gas price settings, where the `getGasPrice` function returns the gas price in GWEI.
       *
       * @default undefined
       */
      gasSettings: {
        getGasPrice: async () => '90',
      },
      /**
       * Whether to approve the the maximum token amount, or the exact token amount.
       *
       * @default true
       */
      approveMax: true,
      /**
       * Multiplier for the token approval amount to add a buffer.
       * Only applies when `approveMax` is false.
       * For example, a value of 1.05 represents a 5% buffer.
       *
       * @default 1.05
       */
      approvalBufferFactor: 1.05,

      // V3 Only settings

      /**
       * When `true`, enables the use of a price limit during the trade.
       * A price limit helps protect against unfavorable price movements during trade execution.
       *
       * @default false
       */
      enablePriceLimit: false,

      /**
       * When `true`, enables the use of a price limit during the trade.
       * A price limit helps protect against unfavorable price movements during trade execution.
       *
       * @default undefined
       */
      priceRange: {
        tickLower: 0,
        tickUpper: 10000,
      },

      /**
       * The fee tier for the trade.
       *
       * @default undefined
       */
      feeTier: 3_000,
    },
  })

  const quote = await liquidity.addLiquidity({
    dexTag: 'UNISWAP',
    protocol: 'protocolV3',
    version: { major: 1, minor: 0, patch: 0 },
    tokenBAmount: '100',
    feeTier: 3_000,
    priceRange: {
      tickLower: -60,
      tickUpper: 60,
    },
  })

  console.log('Custom settings liquidity quote:', quote)
}

// Example: Liquidity Add with Approve and Execute
export const liquidityAddWithApproveAndExecute = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.example.com',
    1,
  )
  const signer = new ethers.Wallet('0xPrivateKey', provider)

  const walletAddress = await signer.getAddress()

  const dexFactory = new DexFactory({
    // Must provide a signer to use the execute function
    providerContext: { ethersSigner: signer },
    walletAddress,
    dexContext: 'UNISWAP',
    format: { type: 'readable' },
  })

  const liquidity = await dexFactory.createLiquidity({
    tokenAAddress: '0x1dA01e84F3d4e6716F274c987Ae4bEE5DC3C8288', // BID
    tokenBAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  })

  const quote = await liquidity.addLiquidity({
    dexTag: 'UNISWAP',
    protocol: 'protocolV2',
    version: { major: 1, minor: 0, patch: 0 },
    tokenAAmount: '4000',
  })

  const { approvalReceipts, transactionReceipt } =
    (await quote.execute?.({
      approvalConfirmations: 1,
      transactionConfirmations: 1,
    })) ?? {}

  console.log('Approval receipts', approvalReceipts)
  console.log('Add liquidity receipt', transactionReceipt)
}

// ------------------------
// Provider (Dex Provider)
// ------------------------

// Example: Provider Initialization (Ethers)
export const initializeEthersProvider = () => {
  const ethersProvider = new ethers.providers.JsonRpcProvider(
    'https://rpc.example.com',
    1,
  )

  const dexProvider = new DexProvider({
    ethersProvider,
  })

  console.log(dexProvider)
}

// Example: Provider Initialization (Pre-configured)
export const initializePreConfiguredProvider = () => {
  const dexProvider = new DexProvider({
    chainId: 1,
  })

  console.log(dexProvider)
}

// Example: Provider Initialization (Custom)
export const initializeCustomProvider = () => {
  const dexProvider = new DexProvider({
    chainId: 1,
    rpcUrl: 'https://rpc.example.com',
  })

  console.log(dexProvider)
}

// Example: Provider Options
export const initializeProviderWithOptions = () => {
  const dexProvider = new DexProvider({
    chainId: 1,

    /**
     * Represents a custom network configuration.
     */
    customNetwork: {
      /** The name of the custom network. */
      name: 'Name of network',
      /** The address of the multicall contract for the network. */
      multicallContractAddress: '0x1234...',
    },

    /**
     * Whether to use the `tryAggregate` function for error handling.
     * If `true`, individual call failures do not cause the entire batch to fail.
     * Defaults to `false`.
     */
    tryAggregate: true,
    /**
     * Whether to enable batching when calls exceed configured size or count limits.
     * When enabled, calls that exceed `maxCallDataSize` or `maxCallsPerBatch` are split into multiple batches, resulting in multiple calls to the blockchain.
     * Defaults to `true`.
     */
    enableBatching: true,
    /**
     * Maximum allowed call data size (in bytes) for a single batch of calls.
     * Batches are split if the combined return data size exceeds this limit.
     * Defaults to `100000` bytes.
     */
    maxCallDataSize: 100_000,
    /**
     * Maximum number of calls allowed in a single batch.
     * Ensures that each batch stays within a manageable number of calls.
     * Defaults to `500` calls.
     */
    maxCallsPerBatch: 100,
  })

  console.log(dexProvider)
}

// ------------------------
// Token Contract
// ------------------------

// Example: Get Token
export const getTokenExample = async () => {
  const contract = new TokenContract({
    dexProviderContext: {
      chainId: 943,
    },
    dexContext: 'PULSEX',
    tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
  })

  const token = await contract.getToken()

  console.log(token)
}

// Example: Get Token with Custom Token List
export const getTokenWithCustomList = async () => {
  const chainId = 943

  const customTokenList = new TokenList({
    chainId,
    tokenListSources: [
      {
        name: 'Uniswap Labs Default',
        url: 'https://tokens.uniswap.org/',
        chainIds: [], // Filter by chainId, or leave empty to include all chains
      },
      // You could also extend the defaults by spreading the `getAllTokenListSources` from the utils package
      ...getAllTokenListSources(),
    ],
  })

  const contract = new TokenContract({
    dexProviderContext: {
      chainId,
    },
    dexContext: 'PULSEX',
    tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
    tokenList: customTokenList,
  })

  const token = await contract.getToken()

  console.log(token)
}

// Example: Get Balance of Coin
export const getBalanceOfCoin = async () => {
  const chainId = 943

  const contract = new TokenContract({
    dexProviderContext: {
      chainId,
    },
    dexContext: 'PULSEX',
    tokenContractAddress: PLSCoin.getTokenForChainId(chainId)!.contractAddress,
  })

  const balance = await contract.balanceOf({
    walletAddress: '0x1234...',
    format: { type: 'readable' },
  })

  console.log(balance)
}

// Example: Get Balance of Token
export const getBalanceOfToken = async () => {
  const contract = new TokenContract({
    dexProviderContext: {
      chainId: 943,
    },
    dexContext: 'PULSEX',
    tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
  })

  const balance = await contract.balanceOf({
    walletAddress: '0x1234...',
    format: { type: 'readable' },
  })

  console.log(balance)
}

// Example: Encode Approve Allowance Transaction Data
export const encodeApproveAllowance = () => {
  const dexTag = 'PULSEX'

  const contract = new TokenContract({
    dexProviderContext: {
      chainId: 943,
    },
    dexContext: dexTag,
    tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
  })

  const versionTag = getVersionTagFromVersion({
    major: 1,
    minor: 0,
    patch: 0,
  })

  const routerAddress =
    contract.dexConfigsByDex[dexTag]?.protocols.protocolV2?.[versionTag]?.router
      .address

  if (!routerAddress) {
    throw new Error('No router address found')
  }

  const data = contract.encodeApproveAllowanceData({
    spender: routerAddress,
    amount: DexNumber.fromShifted(MAX_HEX_STRING, 18),
  })

  console.log(data)
}

// Example: Interacting with Token Contract
export const interactWithTokenContract = async () => {
  const contract = new TokenContract({
    dexProviderContext: {
      chainId: 943,
    },
    dexContext: 'PULSEX',
    tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
  })

  const totalSupply = await contract.tokenContract.totalSupply()

  console.log(totalSupply)
}

// Example: Interacting with Token Contract using Multicall
export const interactWithTokenUsingMulticall = async () => {
  const contract = new TokenContract({
    dexProviderContext: {
      chainId: 943,
    },
    dexContext: 'PULSEX',
    tokenContractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNIToken
  })

  // Get the underlying token contract
  const tokenContract = contract.tokenContract

  const { blockNumber, results } = await tokenContract.call({
    name: tokenContract.nameCallContext(),
    decimals: tokenContract.decimalsCallContext(),
    symbol: tokenContract.symbolCallContext(),
    totalSupply: tokenContract.totalSupplyCallContext(),
    balanceOf: tokenContract.balanceOfCallContext('0x1234...'),
  })

  console.log('Multicall results:', {
    blockNumber,
    balance: results.balanceOf.value,
    name: results.name.value,
    symbol: results.symbol.value,
    totalSupply: results.totalSupply.value,
  })
}

// ------------------------
// Tokens
// ------------------------

// Example: Get Multiple Tokens
export const getMultipleTokens = async () => {
  const tokens = new Tokens({
    dexProviderContext: {
      chainId: 943,
    },
    dexContext: 'PULSEX',
  })

  const results = await tokens.getTokens([
    '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
    '0x1da01e84f3d4e6716f274c987ae4bee5dc3c8288', // BID
    '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
    '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
  ])

  console.log(results)
}

// Example: Get Tokens with Custom Token List
export const getTokensWithCustomList = async () => {
  const customTokenList = new TokenList({
    chainId: 943,
    tokenListSources: [
      {
        name: 'Uniswap Labs Default',
        url: 'https://tokens.uniswap.org/',
        chainIds: [], // Filter by chainId, or leave empty to include all chains
      },
      // You could also extend the defaults by spreading the `getAllTokenListSources` from the utils package
      ...getAllTokenListSources(),
    ],
  })

  const tokens = new Tokens({
    dexProviderContext: {
      chainId: 943,
    },
    dexContext: 'PULSEX',
    tokenList: customTokenList,
  })

  const results = await tokens.getTokens([
    '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
    '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
    '0x1da01e84f3d4e6716f274c987ae4bee5dc3c8288', // BID
    '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
    '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
  ])

  console.log(results)
}

// Example: Get Allowance and Balance for Multiple Tokens
export const getAllowancesAndBalances = async () => {
  const tokenContract = new Tokens({
    dexProviderContext: {
      chainId: 943,
    },
    dexContext: 'PULSEX',
  })

  const multiTokenAllowanceAndBalance =
    await tokenContract.getAllowancesAndBalanceOf({
      walletAddress: '0x1234...',
      tokenContractAddresses: [
        '0x8a810ea8B121d08342E9e7696f4a9915cBE494B7', // PLSX
        '0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39', // HEX
        '0x1da01e84f3d4e6716f274c987ae4bee5dc3c8288', // BID
        '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
        '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
      ],
      format: { type: 'readable' },
    })

  console.log(multiTokenAllowanceAndBalance)
}

// Example: Get Token List with Allowances and Balances
export const getTokenListWithBalances = async () => {
  const tokenContract = new Tokens({
    dexProviderContext: {
      chainId: 943,
    },
    dexContext: 'PULSEX',
  })

  const tokenListWithAllowancesAndBalance =
    await tokenContract.getTokenListWithAllowancesAndBalance({
      walletAddress: '0x1234...',
      includeAllowance: true,
      format: { type: 'readable' },
    })

  console.log(tokenListWithAllowancesAndBalance)
}

// ------------------------
// Token List
// ------------------------

// Example: Get All Tokens from Token List
export const getAllTokensFromList = async () => {
  const tokenList = new TokenList({
    chainId: 943,
  })

  const tokens = await tokenList.getTokens()

  console.log('All tokens from token list:', tokens)
}

// Example: Get Single Token from Token List
export const getSingleTokenFromList = async () => {
  const tokenList = new TokenList({
    chainId: 943,
  })

  const token = tokenList.getPredefinedToken({
    contractAddress: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
  })

  console.log('Single token from token list:', token)
}

// Example: Get Token List Factory with Custom Token List
export const getTokenListWithCustomSources = async () => {
  const tokenList = new TokenList({
    chainId: plsTestChainId,
    tokenListSources: [
      {
        name: 'Uniswap Labs Default',
        url: 'https://tokens.uniswap.org/',
        chainIds: [],
      },
      ...getAllTokenListSources(),
    ],
  })

  const tokens = await tokenList.getTokens()

  console.log('Tokens from custom token list sources:', tokens)
}

// Example: Interacting with ERC20 Contract
export const interactWithERC20Contract = async () => {
  const erc20Contract = new Erc20Contract(
    {
      chainId: 943,
    },
    {
      address: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
    },
  )

  const totalSupply = await erc20Contract.totalSupply()

  console.log('Total supply of ERC20 token:', totalSupply)
}

// ------------------------
// Contracts
// ------------------------

// Example: Interacting with ERC20 Contract
export const interactingWithErc20Contract = async () => {
  const tokenContract = new Erc20Contract(
    {
      chainId: 943,
    },
    {
      address: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
    },
  )

  const totalSupply = await tokenContract.totalSupply()

  console.log(totalSupply)
}

// Example: Interacting with ERC20 Contract using Multicall
export const interactingWithErc20ContractMulticall = async () => {
  const tokenContract = new Erc20Contract(
    {
      chainId: 943,
    },
    {
      address: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
    },
  )

  const { blockNumber, results, originContext } = await tokenContract.call({
    // You can define the method calls explicitly like this...
    balanceOf: {
      methodName: 'balanceOf',
      methodParameters: ['0x1234...'],
    },
    // Or use the helpers from the contract
    balanceOfFriend: tokenContract.balanceOfCallContext('0x5678...'),
    name: tokenContract.nameCallContext(),
    symbol: tokenContract.symbolCallContext(),
    totalSupply: tokenContract.totalSupplyCallContext(),
  })

  const balanceOf = results.balanceOf.value
  const balanceOfFriend = results.balanceOfFriend.value
  const name = results.name.value
  const symbol = results.symbol.value
  const totalSupply = results.totalSupply.value

  console.log({
    originContext,
    blockNumber,
    balanceOf,
    balanceOfFriend,
    name,
    symbol,
    totalSupply,
  })
}

// Example: Preparing a multicall ContractContext with the ERC20 Contract
export const prepareMulticallContractContext = async () => {
  const dexProvider = new DexProvider({
    chainId: 943,
    tryAggregate: true,
    enableBatching: true,
    maxCallDataSize: 100_000,
  })

  const tokenContract = new Erc20Contract(dexProvider, {
    address: '0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b', // UNI
  })

  const tokenContractCallContext = tokenContract.prepareContractContext({
    balanceOf: tokenContract.balanceOfCallContext('0x1234...'),
    name: tokenContract.nameCallContext(),
    symbol: tokenContract.symbolCallContext(),
    totalSupply: tokenContract.totalSupplyCallContext(),
  })

  const pairContract = new PairContract(dexProvider, {
    address: '0xBa2dEE2861ddEAecd0ff1bAC44bc1f5DfCD35C0c', // AAVE/DAI pair
    abi: uniswapPairV2ABI,
  })

  const pairContractCallContext = pairContract.prepareContractContext({
    token0: pairContract.token0CallContext(),
    token1: pairContract.token1CallContext(),
    getReserves: pairContract.getReservesCallContext(),
  })

  const { blockNumber, contracts } = await dexProvider.call({
    tokenContract: tokenContractCallContext,
    pairContract: pairContractCallContext,
  })

  const { results: tokenResults, originContext } = contracts.tokenContract
  const { results: pairContractResults } = contracts.pairContract

  const balanceOf = tokenResults.balanceOf.value
  const name = tokenResults.name.value
  const symbol = tokenResults.symbol.value
  const totalSupply = tokenResults.totalSupply.value

  const token0 = pairContractResults.token0.value
  const token1 = pairContractResults.token1.value
  const reserves = pairContractResults.getReserves.value
  const { _reserve0, _reserve1, _blockTimestampLast } = reserves

  console.log({
    // Multicall results
    originContext,
    blockNumber,
    // Token results
    balanceOf,
    name,
    symbol,
    totalSupply,
    // Pair results
    token0,
    token1,
    _reserve0,
    _reserve1,
    _blockTimestampLast,
  })
}