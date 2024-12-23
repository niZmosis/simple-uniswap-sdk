[**@dex-toolkit/types v1.0.0**](../../../README.md) • **Docs**

***

[Documentation v1.0.0](../../../../../packages.md) / [@dex-toolkit/types](../../../README.md) / [UniswapPoolV3Types](../README.md) / EventsContext

# Interface: EventsContext

## Methods

### Burn()

> **Burn**(`owner`, `tickLower`, `tickUpper`, `amount`, `amount0`, `amount1`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **owner**: `string`

• **tickLower**: `BigNumberish`

• **tickUpper**: `BigNumberish`

• **amount**: `BigNumberish`

• **amount0**: `BigNumberish`

• **amount1**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-pool-v3.types.ts:32](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-pool-v3.types.ts#L32)

***

### Collect()

> **Collect**(`owner`, `recipient`, `tickLower`, `tickUpper`, `amount0`, `amount1`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **owner**: `string`

• **recipient**: `string`

• **tickLower**: `BigNumberish`

• **tickUpper**: `BigNumberish`

• **amount0**: `BigNumberish`

• **amount1**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-pool-v3.types.ts:40](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-pool-v3.types.ts#L40)

***

### CollectProtocol()

> **CollectProtocol**(`sender`, `recipient`, `amount0`, `amount1`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **recipient**: `string`

• **amount0**: `BigNumberish`

• **amount1**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-pool-v3.types.ts:48](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-pool-v3.types.ts#L48)

***

### Flash()

> **Flash**(`sender`, `recipient`, `amount0`, `amount1`, `paid0`, `paid1`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **recipient**: `string`

• **amount0**: `BigNumberish`

• **amount1**: `BigNumberish`

• **paid0**: `BigNumberish`

• **paid1**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-pool-v3.types.ts:54](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-pool-v3.types.ts#L54)

***

### IncreaseObservationCardinalityNext()

> **IncreaseObservationCardinalityNext**(`observationCardinalityNextOld`, `observationCardinalityNextNew`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **observationCardinalityNextOld**: `BigNumberish`

• **observationCardinalityNextNew**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-pool-v3.types.ts:62](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-pool-v3.types.ts#L62)

***

### Initialize()

> **Initialize**(`sqrtPriceX96`, `tick`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sqrtPriceX96**: `BigNumberish`

• **tick**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-pool-v3.types.ts:66](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-pool-v3.types.ts#L66)

***

### Mint()

> **Mint**(`sender`, `owner`, `tickLower`, `tickUpper`, `amount`, `amount0`, `amount1`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **owner**: `string`

• **tickLower**: `BigNumberish`

• **tickUpper**: `BigNumberish`

• **amount**: `BigNumberish`

• **amount0**: `BigNumberish`

• **amount1**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-pool-v3.types.ts:67](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-pool-v3.types.ts#L67)

***

### SetFeeProtocol()

> **SetFeeProtocol**(`feeProtocol0Old`, `feeProtocol1Old`, `feeProtocol0New`, `feeProtocol1New`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **feeProtocol0Old**: `BigNumberish`

• **feeProtocol1Old**: `BigNumberish`

• **feeProtocol0New**: `BigNumberish`

• **feeProtocol1New**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-pool-v3.types.ts:76](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-pool-v3.types.ts#L76)

***

### Swap()

> **Swap**(`sender`, `recipient`, `amount0`, `amount1`, `sqrtPriceX96`, `liquidity`, `tick`): [`EventFilter`](../../../type-aliases/EventFilter.md)

#### Parameters

• **sender**: `string`

• **recipient**: `string`

• **amount0**: `BigNumberish`

• **amount1**: `BigNumberish`

• **sqrtPriceX96**: `BigNumberish`

• **liquidity**: `BigNumberish`

• **tick**: `BigNumberish`

#### Returns

[`EventFilter`](../../../type-aliases/EventFilter.md)

#### Defined in

[packages/types/src/abis/uniswap-pool-v3.types.ts:82](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/abis/uniswap-pool-v3.types.ts#L82)
