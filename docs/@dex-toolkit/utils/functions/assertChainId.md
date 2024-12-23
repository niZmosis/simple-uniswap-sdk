[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / assertChainId

# Function: assertChainId()

> **assertChainId**(`value`, `errorCode`): `asserts value is number`

Asserts that the provided value is a valid `ChainId`.

## Parameters

• **value**: `any`

The value to check.

• **errorCode**: [`ErrorCodes`](../enumerations/ErrorCodes.md) = `ErrorCodes.functionArgumentError`

Optional error code to throw if assertion fails.

## Returns

`asserts value is number`

## Throws

`DexError` if the value is undefined or not a valid `ChainId`.

## Defined in

[packages/utils/src/chains/chain-utils.ts:34](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/utils/src/chains/chain-utils.ts#L34)
