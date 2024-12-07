[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / AddLiquidityParamsBase

# Type Alias: AddLiquidityParamsBase\<TFormat\>

> **AddLiquidityParamsBase**\<`TFormat`\>: [`DexKey`](DexKey.md) & `object`

Base parameters for adding liquidity to a DEX pool.

## Type declaration

### tokenAAmount?

> `optional` **tokenAAmount**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The amount of the token to be added to the liquidity pool.

### tokenBAmount?

> `optional` **tokenBAmount**: [`TradeFormatValue`](TradeFormatValue.md)\<`TFormat`\>

The amount of the token to be added to the liquidity pool.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Defined in

packages/types/src/liquidity.types.ts:170