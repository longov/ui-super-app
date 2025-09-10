import { get, size } from 'lodash';
import { CHAIN_ID } from '../constants/chainData';

function genAssetERC20(token?: any) {
  if (!token) return;
  if (
    size(get(token, 'info.image', get(token, 'info.logo', token.image))) > 0 ||
    size(token.ownLogo) > 0 ||
    size(token.logo) > 0
  ) {
    return (
      token.logo ||
      token.ownLogo ||
      get(token, 'info.image', get(token, 'info.logo', token.image))
    );
  }

  const isLogoURI = size(token.logoURI) > 0;
  if (isLogoURI && token.chain !== CHAIN_ID.ether) return token.logoURI;

  if (isLogoURI && !token.logoURI.includes('.svg')) {
    if (token.logoURI.includes('ipfs')) {
      const idIPFS = token.logoURI.replace('ipfs://', '');
      return `https://cloudflare-ipfs.com/ipfs/${idIPFS}`;
    }
    if (token.logoURI.includes('https')) return token.logoURI;
  }

  const chainPrefix = {
    [CHAIN_ID.ether]: 'ethereum',
    [CHAIN_ID.binanceSmart]: 'smartchain',
    [CHAIN_ID.heco]: 'heco',
    [CHAIN_ID.kucoin]: 'kcc',
    [CHAIN_ID.solana]: 'solana',
    [CHAIN_ID.avax]: 'avalanchec',
    [CHAIN_ID.xDai]: 'xdai',
    [CHAIN_ID.celo]: 'celo',
    [CHAIN_ID.tomo]: 'tomochain',
    [CHAIN_ID.fantom]: 'fantom',
    [CHAIN_ID.optimism]: 'optimism',
    [CHAIN_ID.matic]: 'polygon',
    [CHAIN_ID.zkSyncPolygon]: 'polygonzkevm',
  };

  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainPrefix[token.chain]}/assets/${
    token.address
  }/logo.png`;
}

export default genAssetERC20;
