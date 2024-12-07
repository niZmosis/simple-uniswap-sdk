[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / InternalLiquidityContext

# Type Alias: InternalLiquidityContext\<TFormat\>

> **InternalLiquidityContext**\<`TFormat`\>: `Omit`\<[`LiquidityContext`](LiquidityContext.md)\<`TFormat`\>, `"observer$"` \| `"unsubscribe"` \| `"execute"`\>

A subset of the LiquidityContext properties that are currently being traded.
Used internally by the Liquidity class.

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Defined in

packages/types/src/liquidity.types.ts:393