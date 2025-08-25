/**
 * @fileoverview Icon component implementation using IcoMoon font configuration
 */

import React, { type FC, type JSX } from 'react';
import coin98FontConfig from '../Font/selection.json';
//@ts-expect-error
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { Colors } from '../Styles';
import { StyleSheet, View } from 'react-native';
import { convertPxToPt, width } from '../Styles/utils';
import { useThemeContext } from '../context/ThemeContext';

const Coin98 = createIconSetFromIcoMoon(
  coin98FontConfig,
  'icomoon',
  'icomoon.ttf'
);

/**
 * Props interface for Icon component
 * @interface IProps
 * @property {string} name - The name of the icon from the IcoMoon font set
 * @property {number} [size=12] - Size of the icon in pt units
 * @property {keyof typeof Colors | string} [color='TEXT'] - Color of the icon
 * @property {keyof typeof Colors | string} [background] - Background color for the icon
 * @property {object | StyleSheet.NamedStyles<any>} [styleCustom] - Custom styles to apply
 * @property {any} [theme] - Theme value for re-rendering icon when theme changes
 */
interface IProps {
  name: string;
  size?: number;
  color?: keyof typeof Colors | string;
  background?: keyof typeof Colors | string;
  styleCustom?: object | StyleSheet.NamedStyles<any>;
  //for re-rendering icon in setting theme
  theme?: any;
}

/**
 * Icon component that renders custom icons using IcoMoon font configuration
 * Supports custom size, color, background and additional styling
 * @component
 * @param {IProps} props - Component properties
 * @returns {JSX.Element} Rendered icon component
 */
const Icon: FC<IProps> = ({
  name,
  size = convertPxToPt(12),
  color = 'TEXT',
  background,
  styleCustom,
}: IProps): JSX.Element => {
  const { useTheme, getThemeMode } = useThemeContext();
  const styles = useTheme('IconV2', style);

  const Colors = getThemeMode('color');

  return (
    <View style={[styles.container, styleCustom]}>
      {background && (
        <View
          style={[
            styles.backgroundContainer,
            {
              backgroundColor: Colors[background] || background,
              left: size / 5,
              top: size / 5,
              // top: size / 5,
              height: size - size / 3,
              width: size - size / 3,
            },
          ]}
        />
      )}
      <Coin98 name={name} size={size} color={Colors[color] || color} />
    </View>
  );
};

const style = StyleSheet.create({
  backgroundContainer: {
    overflow: 'hidden',
    position: 'absolute',
    width: width(2.5),
    borderRadius: width(100),
    // height: height(1)
    // left: width(2.7)
    // top: height(0.5)
  },
  container: {
    position: 'relative',
  },
});

export default React.memo(Icon);

// <View style={styles.containerKyc}>
//   <View style={styles.badgeVerified} />
// <Icon name="app_kyc_verified" color={COLORS.TEXT_INFORMATION} size={width(3.5)} />
// </View>
