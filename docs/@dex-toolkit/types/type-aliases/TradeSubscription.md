[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / TradeSubscription

# Type Alias: TradeSubscription\<TFormat\>

> **TradeSubscription**\<`TFormat`\>: `object`

Internal subscription tracking

## Type Parameters

• **TFormat** *extends* [`TradeFormat`](TradeFormat.md)

## Type declaration

### context

> **context**: [`InternalTradeContext`](InternalTradeContext.md)\<`"dexnumber"`\>

The quote context

### isActive

> **isActive**: `boolean`

Whether the subscription is active

### subject

> **subject**: `Subject`\<[`ObservableTradeContext`](ObservableTradeContext.md)\<`TFormat`\>\>

The subject for the quote

## Defined in

packages/types/src/trade.types.ts:446