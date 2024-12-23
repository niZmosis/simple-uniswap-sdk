[**@dex-toolkit/types v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/types](../README.md) / ITokenList

# Interface: ITokenList

Represents the interface for a token list factory.
A factory handles retrieving, fetching, and managing tokens and token lists.

## Properties

### \_chainId

> **\_chainId**: `number`

The chain ID associated with the token list factory.

#### Defined in

[packages/types/src/token-list.types.ts:97](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token-list.types.ts#L97)

***

### \_customNetwork?

> `optional` **\_customNetwork**: [`DexCustomNetwork`](../type-aliases/DexCustomNetwork.md)

(Optional) Custom network settings for the token list.

#### Defined in

[packages/types/src/token-list.types.ts:100](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token-list.types.ts#L100)

***

### \_tokenListSources

> **\_tokenListSources**: [`TokenListSource`](../type-aliases/TokenListSource.md)[]

The list of token list sources being used by the factory.

#### Defined in

[packages/types/src/token-list.types.ts:103](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token-list.types.ts#L103)

***

### \_tokens

> **\_tokens**: [`Token`](../type-aliases/Token.md)[]

The array of tokens managed by the factory.

#### Defined in

[packages/types/src/token-list.types.ts:106](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token-list.types.ts#L106)

## Methods

### fetchTokenLists()

> **fetchTokenLists**(): `Promise`\<[`Token`](../type-aliases/Token.md)[]\>

Fetches the token lists from all configured sources.

#### Returns

`Promise`\<[`Token`](../type-aliases/Token.md)[]\>

A promise that resolves to an array of `TokenListAsset` objects.

#### Defined in

[packages/types/src/token-list.types.ts:132](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token-list.types.ts#L132)

***

### getPredefinedToken()

> **getPredefinedToken**(`contractAddress`): `undefined` \| [`Token`](../type-aliases/Token.md)

Retrieves a predefined token based on the provided contract address.

#### Parameters

• **contractAddress**

The contract address of the token to look up.

• **contractAddress.contractAddress**: `string`

#### Returns

`undefined` \| [`Token`](../type-aliases/Token.md)

The matching `Token` object if found; otherwise, `undefined`.

#### Defined in

[packages/types/src/token-list.types.ts:114](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token-list.types.ts#L114)

***

### getTokens()

> **getTokens**(): `Promise`\<[`Token`](../type-aliases/Token.md)[]\>

Retrieves the complete list of tokens for the configured chain, including custom tokens.

#### Returns

`Promise`\<[`Token`](../type-aliases/Token.md)[]\>

A promise that resolves to an array of `TokenListAsset` objects.

#### Defined in

[packages/types/src/token-list.types.ts:125](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token-list.types.ts#L125)

***

### removeDuplicateTokens()

> **removeDuplicateTokens**(`tokens`): [`Token`](../type-aliases/Token.md)[]

Removes duplicate tokens from the provided list based on their contract addresses.

#### Parameters

• **tokens**: [`Token`](../type-aliases/Token.md)[]

An array of `Token` objects.

#### Returns

[`Token`](../type-aliases/Token.md)[]

An array of unique `Token` objects.

#### Defined in

[packages/types/src/token-list.types.ts:140](https://github.com/niZmosis/dex-toolkit/blob/3d8b41b44787b30fbea5de3ab4737662ffb61bc8/packages/types/src/token-list.types.ts#L140)
