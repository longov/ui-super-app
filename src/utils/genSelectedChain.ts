import _ from 'lodash';
import CHAIN_DATA from '../constants/chainData';

const genSelectedChain = (
  wallet: string | { chain: string } | string,
  isMulti?: boolean
) => {
  if (isMulti) return CHAIN_DATA.multiChain;

  const chainId = typeof wallet === 'string' ? wallet : _.get(wallet, 'chain');

  if (CHAIN_DATA[chainId]) return CHAIN_DATA[chainId];
  return {};
};

export default genSelectedChain;
