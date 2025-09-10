/**
 * @fileoverview Token component for rendering cryptocurrency token icons with chain indicators
 * @module Layout/Token
 */
import { type FC } from 'react';
import ImageRender from './ImageRender';
import { useThemeContext } from '../context/ThemeContext';
import _ from 'lodash';
import { convertPxToPt, width } from '../Styles/utils';
import genSelectedChain from '../utils/genSelectedChain';
import { COLORS, ESpacing } from '../Styles';
import { StyleSheet, View } from 'react-native';
import EBorderSize from '../Styles/borderSize';
import AWS_CHAINS from '../constants/awsChainImage';
import genAssetERC20 from '../utils/genAssetERC20';
import Text from './Text';

/**
 * Available token size presets in pt units
 * @enum {number}
 */
enum TOKEN_SIZE {
  tiny = convertPxToPt(12),
  xSmall = convertPxToPt(16),
  small = convertPxToPt(24),
  medium = convertPxToPt(32),
  large = convertPxToPt(40),
  xLarge = convertPxToPt(48),
}

/** Valid token size keys from TOKEN_SIZE enum */
type SizeKey = keyof typeof TOKEN_SIZE;

/**
 * Token component properties
 */
interface IToken {
  /** Token data object containing address and chain information */
  token: any;
  /** Whether to display the chain logo */
  isShowChain?: boolean;
  /** Size preset for the token icon */
  size?: SizeKey;
  /** Divisor to calculate chain logo size relative to token size */
  chainSizeDivide?: number;
  /** Additional styles for chain logo */
  styleChainLogo?: any;

  /** Additional style for token */
  styleToken?: any;
}

const Token: FC<IToken> = ({
  token,
  isShowChain,
  size = 'xLarge',
  chainSizeDivide = 2.5,
  styleChainLogo,
  styleToken,
}) => {
  const { useTheme } = useThemeContext();

  const selectedChain = genSelectedChain(token);
  const styles = useTheme('Token', style);
  const tokenSize = TOKEN_SIZE[size];
  const chainSize = TOKEN_SIZE[size] / chainSizeDivide;

  return (
    <View
      style={[
        styles.container,
        styleToken,
        {
          width: tokenSize,
        },
      ]}
    >
      <ImageRender
        errors={{
          check: true,
          token: _.pick(token, ['address', 'chain']),
          default: (
            <View
              style={[
                styles.tokenImgDefault,
                {
                  width: tokenSize,
                  height: tokenSize,
                  borderRadius: tokenSize / 2,
                },
              ]}
            >
              <Text>
                {_.get(
                  token,
                  'symbol',
                  _.get(token, 'info.symbol', '?')
                ).charAt(0)}
              </Text>
            </View>
          ),
        }}
        uri={genAssetERC20(token)}
        style={[
          styles.token,
          {
            width: tokenSize,
            height: tokenSize,
            borderRadius: tokenSize / 2,
          },
        ]}
      />

      {isShowChain &&
        (_.get(token, 'address') || _.get(selectedChain, 'isL2')) && (
          <View
            style={[
              styles.smallLogoView,
              styles.superSmallLogoView,
              styleChainLogo && styleChainLogo,
              {
                borderRadius: chainSize / 4,
              },
            ]}
          >
            <ImageRender
              uri={AWS_CHAINS(token.chain)}
              style={[
                {
                  width: chainSize,
                  height: chainSize,
                  borderRadius: chainSize / 4,
                },
              ]}
            />
          </View>
        )}
    </View>
  );
};

/**
 * Styles for Token component
 * @constant
 */
const style = StyleSheet.create({
  tokenBackground: {
    borderRadius: EBorderSize.small,
    backgroundColor: COLORS.BACKGROUND_3,
  },
  container: {
    position: 'relative',
  },
  tokenPaddingBg: {
    padding: convertPxToPt(2),
  },
  tokenImage: {
    width: width(13),
    height: width(13),
  },
  smallLogoView: {
    position: 'absolute',
    bottom: -ESpacing.space50,
    right: -ESpacing.space50,
    backgroundColor: COLORS.BACKGROUND_1,
    padding: ESpacing.space12,
  },
  smallLogoChain: {
    width: width(5.5),
    height: width(5.5),
    borderRadius: width(2.75),
  },
  superSmallLogoChain: {
    width: width(3.5),
    height: width(3.5),
    borderRadius: width(1.75),
  },
  tokenImgDefault: {
    backgroundColor: COLORS.BACKGROUND_3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Token;
