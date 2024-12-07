import type { Token } from '@dex-toolkit/types'
import type { ChainId } from '@ethereum-multicall/types'

import { blastMainChainId } from '../../chains/chainIds'
import { getImageUrlForToken } from '../logo-urls/logo-urls'

export class RINGToken {
  private static commonProps: Omit<
    Token,
    'chainId' | 'contractAddress' | 'standard'
  > = {
    name: 'Ring Governance Token',
    symbol: 'RING',
    decimals: 18,
    color: 'rgb(227, 92, 147)',
  }

  public static BLAST = {
    MAINNET: (): Token => {
      return {
        ...RINGToken.commonProps,
        chainId: blastMainChainId,
        contractAddress: '0x25F233C3E3676f9e900a89644a3FE5404d643c84',
        standard: 'ERC20',
        logoUri: getImageUrlForToken({
          tokenContractAddress: '0x25F233C3E3676f9e900a89644a3FE5404d643c84',
          tokenContractChainId: blastMainChainId,
        }),
      }
    },
  }

  public static getTokenForChainId(chainId: ChainId): Token | undefined {
    switch (chainId) {
      case blastMainChainId:
        return RINGToken.BLAST.MAINNET()
      default:
        return undefined
    }
  }
}