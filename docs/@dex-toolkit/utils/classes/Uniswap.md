[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / Uniswap

# Class: Uniswap

App:
[Uniswap](https://app.uniswap.org/swap)

V2 Deployments:
[V2 Deployment Addresses](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/v2-deployments)

V3 Deployments:
[V3 Deployment Addresses](https://docs.uniswap.org/contracts/v3/reference/deployments/)

## Constructors

### new Uniswap()

> **new Uniswap**(): [`Uniswap`](Uniswap.md)

#### Returns

[`Uniswap`](Uniswap.md)

## Properties

### ARBITRUM

> `static` **ARBITRUM**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### SEPOLIA()

> **SEPOLIA**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/uniswap.dex.ts:54](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/uniswap.dex.ts#L54)

***

### AVALANCHE

> `static` **AVALANCHE**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/uniswap.dex.ts:147](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/uniswap.dex.ts#L147)

***

### BASE

> `static` **BASE**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### SEPOLIA()

> **SEPOLIA**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/uniswap.dex.ts:208](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/uniswap.dex.ts#L208)

***

### BLAST

> `static` **BLAST**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/uniswap.dex.ts:301](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/uniswap.dex.ts#L301)

***

### CELO

> `static` **CELO**: `object`

#### ALFAJORES()

> **ALFAJORES**: () => `DexConfig`

##### Returns

`DexConfig`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/uniswap.dex.ts:362](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/uniswap.dex.ts#L362)

***

### ETH

> `static` **ETH**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### SEPOLIA()

> **SEPOLIA**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/uniswap.dex.ts:445](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/uniswap.dex.ts#L445)

***

### POLYGON

> `static` **POLYGON**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/uniswap.dex.ts:564](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/uniswap.dex.ts#L564)

***

### ZKSYNC

> `static` **ZKSYNC**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/uniswap.dex.ts:726](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/uniswap.dex.ts#L726)

***

### ZORA

> `static` **ZORA**: `object`

#### MAINNET()

> **MAINNET**: () => `DexConfig`

##### Returns

`DexConfig`

#### SEPOLIA()

> **SEPOLIA**: () => `DexConfig`

##### Returns

`DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/uniswap.dex.ts:625](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/uniswap.dex.ts#L625)

## Methods

### getAllDexConfigs()

> `static` **getAllDexConfigs**(): `DexConfig`[]

#### Returns

`DexConfig`[]

#### Defined in

[packages/utils/src/exchanges/configs/uniswap.dex.ts:804](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/uniswap.dex.ts#L804)

***

### getDexConfig()

> `static` **getDexConfig**(`chainId`): `undefined` \| `DexConfig`

#### Parameters

• **chainId**: `number`

#### Returns

`undefined` \| `DexConfig`

#### Defined in

[packages/utils/src/exchanges/configs/uniswap.dex.ts:769](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/exchanges/configs/uniswap.dex.ts#L769)
