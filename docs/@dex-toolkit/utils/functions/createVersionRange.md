[**@dex-toolkit/utils v1.0.0**](../README.md) • **Docs**

***

[Documentation v1.0.0](../../../packages.md) / [@dex-toolkit/utils](../README.md) / createVersionRange

# Function: createVersionRange()

> **createVersionRange**(`start`, `end`): `Version`[]

Creates a range of versions between start and end versions (inclusive).
Useful for checking if a version falls within a supported range.

## Parameters

• **start**: `Version` \| \`$\{number\}-$\{number\}-$\{number\}\`

Starting version (inclusive)

• **end**: `Version` \| \`$\{number\}-$\{number\}-$\{number\}\`

Ending version (inclusive)

## Returns

`Version`[]

Array of Version objects representing the range

## Defined in

packages/utils/src/utils/version.utils.ts:300