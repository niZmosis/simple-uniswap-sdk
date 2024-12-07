[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / CryptoCompareResponse

# Type Alias: CryptoCompareResponse

> **CryptoCompareResponse**: `object`

Represents the response from the CryptoCompare API.
The key is the token address, and the value contains price data in various currencies.

## Index Signature

 \[`key`: `Address`\]: `{ [key in PriceCurrencies]: number }`

## Defined in

packages/types/src/price-source.types.ts:131