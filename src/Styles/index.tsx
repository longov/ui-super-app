import { Dimensions, PixelRatio, StyleSheet } from 'react-native';
import {
  BACKGROUND,
  BORDER_COLORS,
  BUTTON_COLORS,
  EBackground,
  EBorder,
  EBottomSheet,
  EButtonColor,
  EIcon,
  EInputColor,
  ELink,
  EMiscellaneous,
  ETab,
  EText,
  EToast,
  ICON_COLOR,
  INPUT_COLOR,
  LINK_COLOR,
  MISC_COLORS,
  SHEET_COLORS,
  TAB_COLOR,
  TEXT_COLOR,
  TOAST,
} from './Colors';
import { EProcess, PROCESS_COLORS } from './Colors/process';
import FONTS_SIZE from './fontSize';
import FONTS_WEIGHT from './fontWeight';
import { ESpacing } from './spacing';
import EFontSize from './fontSize';

const MYWIDTH = Dimensions.get('window').width;

const width = (num: number) =>
  PixelRatio.roundToNearestPixel(MYWIDTH * (num / 100));

//Enum for the different TextStyles
export enum TEXT_TITLE {
  'TEXT_TITLE_XSMALL' = 'TEXT_TITLE_XSMALL',
  'TEXT_TITLE_SMALL' = 'TEXT_TITLE_SMALL',
  'TEXT_TITLE' = 'TEXT_TITLE',
  'TEXT_TITLE_LARGE' = 'TEXT_TITLE_LARGE',
  'TEXT_TITLE_XLARGE' = 'TEXT_TITLE_XLARGE',
}

export enum TEXT_UI {
  'TEXT_TINY' = 'TEXT_TINY',
  'TEXT_TINY_STRONG' = 'TEXT_TINY_STRONG',
  'TEXT_3XSMALL' = 'TEXT_3XSMALL',
  'TEXT_3XSMALL_STRONG' = 'TEXT_3XSMALL_STRONG',
  'TEXT_2XSMALL' = 'TEXT_2XSMALL',
  'TEXT_2XSMALL_STRONG' = 'TEXT_2XSMALL_STRONG',
  'TEXT_XSMALL' = 'TEXT_XSMALL',
  'TEXT_XSMALL_STRONG' = 'TEXT_XSMALL_STRONG',
  'TEXT_SMALL' = 'TEXT_SMALL',
  'TEXT_SMALL_STRONG' = 'TEXT_SMALL_STRONG',
  'TEXT_REGULAR' = 'TEXT_REGULAR',
  'TEXT_REGULAR_STRONG' = 'TEXT_REGULAR_STRONG',
  'TEXT_MEDIUM' = 'TEXT_MEDIUM',
  'TEXT_MEDIUM_STRONG' = 'TEXT_MEDIUM_STRONG',
  'TEXT_LARGE' = 'TEXT_LARGE',
  'TEXT_LARGE_STRONG' = 'TEXT_LARGE_STRONG',
  'TEXT_XLARGE' = 'TEXT_XLARGE',
  'TEXT_XLARGE_STRONG' = 'TEXT_XLARGE_STRONG',
  'TEXT_2XLARGE' = 'TEXT_2XLARGE',
  'TEXT_2XLARGE_STRONG' = 'TEXT_2XLARGE_STRONG',
  'TEXT_3XLARGE' = 'TEXT_3XLARGE',
  'TEXT_3XLARGE_STRONG' = 'TEXT_3XLARGE_STRONG',
}

export const COLORS = {
  ...EBackground,
  ...EMiscellaneous,
  ...EBorder,
  ...EText,
  ...EIcon,
  ...ELink,
  ...EInputColor,
  ...ETab,
  ...EToast,
  ...EBottomSheet,
  ...EProcess,
  ...EButtonColor,
  ...EInputColor,
};


export { FONTS_SIZE, FONTS_WEIGHT, ESpacing };

const CacheStyles = new Map();

// export const heightFooter = height(ios ? (isIphoneX ? 9 : 7.5) : 7.5);
// export const heightNavBar = height(ios ? (isIphoneX ? 12.5 : 11.5) : 11.5);
// export const topNavBarIOS = height(ios ? (isIphoneX ? 4 : 1.5) : 1.5);
// // export const heightSearchBar = height(4.5)
// // New design = 48/844 * 100;
// export const heightSearchBar = height(5.68);
// export const androidNavbarHeight = ios
//   ? 0
//   : Dimensions.get('screen').height - Dimensions.get('window').height;
// export const paddingButtonBottom = isIphoneX ? 0 : ios ? height(2) : height(3);
//
export const THEME_MODE = { light: 'light', dark: 'dark' };
export const backgroundBlurStyle = StyleSheet.create({
  dark: { backgroundColor: 'rgba(37,37,37,0.9)' },
  light: { backgroundColor: 'rgba(229, 229, 229, 0.9)' },
  darkMore: { backgroundColor: 'rgba(37,37,37,0.9)' },
  lightMore: { backgroundColor: 'rgba(245, 245, 245, 0.9)' },
});

const Portfolio = [
  ['#454545', '#252525'],
  ['#3e286a', '#a76bd7'],
  ['#7d39a6', '#ff6c93'],
  ['#00c1ff', '#9a00db'],

  ['#7080fb', '#5efbe8'],
  ['#1a6dac', '#78efa4'],
  ['#501543', '#f05f57'],
  ['#fe5355', '#ffb28a'],
];

const PortfolioLight = [
  ['#E5E5E5', '#C6C6C6'],
  ['#AA88E1', '#EBDAFF'],
  ['#B77DD2', '#FFB8CC'],
  ['#ADB9FF', '#E0AEFB'],
  ['#AABDFB', '#ADE4F6'],
  ['#A3DBFF', '#D9FEE7'],
  ['#C2809B', '#F7D2D0'],
  ['#F07979', '#FFC9B1'],
];

export const ColorsChart = [
  { bg: '#F0C43F', color: 'black' },
  { bg: '#CDA349', color: 'black' },
  { bg: '#a58b53', color: 'white' },
  { bg: '#454545', color: 'white' },
  { bg: '#5E5E5E', color: 'white' },
  { bg: '#7d7d7d', color: 'black' },
  { bg: '#9c9c9c', color: 'black' },
  { bg: '#b7b7b7', color: 'black' },
  { bg: '#d9d9d9', color: 'black' },
  { bg: '#FAFAFA', color: 'black' },
];

export const Colors = {
  GRAY_BORDER_TABBAR: '#171717',

  BROWN: '#9F7F5B',
  GRAY_LOTTERY: 'rgba(250,250,250,0.8)',
  GRAY_SWITCH: '#303030',

  BACK_DROP: 'rgba(15,15,15,0.4)',

  GRAY_DROPDOWN: '#303030',

  CHART: '#303030',
  GRAY_BORDER: '#2E2E2E',
  GRAY_BORDER2: '#2E2E2E',
  GRAY01: '#2e2e2e',

  GRAY0: '#000',
  GRAY05: '#0F0F0F',
  GRAY1: '#171717',
  GRAY15: '#1F1F1F',
  GRAY25: '#353535',
  GRAY2: 'rgba(255, 255, 255, 0.15)',
  GRAY21: 'rgba(255, 255, 255, 0.15)',
  GRAY3: '#696969',
  GRAY4: '#606060',
  GRAY5: '#696969',
  GRAY6: '#858585',
  GRAY7: '#606060',
  GRAY8: '#292929',
  GRAY9: '#9C9C9C',
  GRAY10: '#1A1A1A',
  GRAY11: '#BABABA',
  GRAY12: '#242424',

  // New Styles
  TEXT_SUB: '#A1A1A1',
  //#858585
  // End New Styles

  YELLOW0: '#A57A0E',
  YELLOW: '#F0C43F',
  YELLOW_NFT: '#4B4725',
  YELLOW2: '#FBCC34',
  GREEN: '#2AB24E',
  GREEN1: '#B3E4D5',
  GREEN2: '#34C759',
  RED: '#C82F1E',
  RED2: '#50130C',
  RED3: '#951B1B',
  PINK: '#FDB6BA',
  WHITE: '#FAFAFA',
  WHITE2: '#FAFAFA',
  ORANGE70: '#AD5C00',
  KYC_BADGE: '#577FDB',
  FORM_TITLE: '#8E7557',

  PINKY: '#6240BB',
  // BG component bottom bar
  BGB: '#0F0F0F',

  //New Colors
  ...BACKGROUND.dark,
  ...BORDER_COLORS.dark,
  ...LINK_COLOR.dark,
  ...ICON_COLOR.dark,
  ...TEXT_COLOR.dark,
  ...MISC_COLORS.dark,
  ...INPUT_COLOR.dark,
  ...BUTTON_COLORS.dark,
  ...TOAST.dark,
  ...SHEET_COLORS.dark,
  ...TAB_COLOR.dark,
  ...PROCESS_COLORS.dark,
};

export const ColorsLight = {
  GRAY_BORDER_TABBAR: '#FAFAFA',

  BROWN: '#9F7F5B',
  GRAY_LOTTERY: 'rgba(0,0,0,0.9)',

  GRAY_SWITCH: '#E6E7E7',

  BACK_DROP: 'rgba(242,242,242,0.4)',
  GRAY_DROPDOWN: '#F5F5F5',

  CHART: '#E5E5E5',
  GRAY_BORDER: '#E5E5E5',
  GRAY_BORDER2: '#E5E5E5',
  GRAY01: '#FAFAFA',

  GRAY0: '#FFF',
  GRAY05: '#F2F2F2',
  GRAY1: '#F7F7F7',
  GRAY15: '#FFFFFF',
  GRAY25: '#E5E5E5',
  GRAY2: 'rgba(0,0,0,0.15)',
  GRAY21: '#FAFAFA',
  GRAY3: '#A1A1A1',
  GRAY4: '#E5E5E5',
  GRAY5: '#A1A1A1',
  GRAY6: '#858585',
  GRAY7: '#B6B6B6',
  GRAY10: '#E4E4E4',
  GRAY11: '#BABABA',
  GRAY12: '#F6F6F6',

  YELLOW0: '#A57A0E',
  YELLOW: '#F0C43F',
  YELLOW_NFT: '#4B4725',
  YELLOW2: '#FBCC34',
  GREEN: '#2AB24E',
  GREEN1: '#B3E4D5',
  GREEN2: '#34C759',
  RED: '#C82F1E',
  PINK: '#FDB6BA',
  WHITE: '#7D7D7D',
  ORANGE70: '#AD5C00',
  KYC_BADGE: '#3162D3',

  WHITE2: '#FAFAFA',
  RED2: '#50130C',

  PINKY: '#6240BB',
  // BG component bottom bar
  BGB: '#FAFAFA',

  //New Colors
  ...BACKGROUND.light,
  ...BORDER_COLORS.light,
  ...LINK_COLOR.light,
  ...ICON_COLOR.light,
  ...TEXT_COLOR.light,
  ...MISC_COLORS.light,
  ...INPUT_COLOR.light,
  ...BUTTON_COLORS.light,
  ...TOAST.light,
  ...SHEET_COLORS.light,
  ...TAB_COLOR.light,
  ...PROCESS_COLORS.light,
};

export const Font = {
  SEMI_BOLD: 'MiSansLatin-Semibold',
  REGULAR: 'MiSansLatin-Regular',
  MEDIUM: 'MiSansLatin-Medium',
  BOLD: 'MiSansLatin-Bold',
};

const useStyles = (themeMode: any) => {
  const getTheme = (type: string): Record<string, any> => {
    const keyChangeTheme = {
      backDropColor: {
        [THEME_MODE.dark]: 'transparent',
        [THEME_MODE.light]: 'rgba(239,239,239,0.7)',
      },
      cardCoinDetail: {
        [THEME_MODE.dark]: ['#151515', '#252525'],
        [THEME_MODE.light]: ['#E5E5E5', '#C6C6C6'],
      },
      gradientNFT: {
        [THEME_MODE.dark]: [
          'transparent',
          'rgba(0,0,0,0.5)',
          'rgba(0,0,0,0.8)',
        ],
        [THEME_MODE.light]: [
          'rgba(255,255,255,0.1)',
          'rgba(255,255,255,0.3)',
          'rgba(255,255,255,0.5)',
        ],
      },
      blurColorMore: {
        [THEME_MODE.dark]: backgroundBlurStyle.darkMore,
        [THEME_MODE.light]: backgroundBlurStyle.lightMore,
      },
      blurColor: {
        [THEME_MODE.dark]: backgroundBlurStyle.dark,
        [THEME_MODE.light]: backgroundBlurStyle.light,
      },

      blurModalUltra: {
        [THEME_MODE.dark]: 'ultraThinMaterialDark',
        [THEME_MODE.light]: 'ultraThinMaterialLight',
      },
      blurModal: {
        [THEME_MODE.dark]: 'chromeMaterialDark',
        [THEME_MODE.light]: 'ultraThinMaterialLight',
      },
      blurBox: {
        [THEME_MODE.dark]: 'chromeMaterialDark',
        [THEME_MODE.light]: 'ultraThinMaterialLight',
      },

      indicatorStyle: {
        [THEME_MODE.dark]: 'white',
        [THEME_MODE.light]: 'black',
      },
      statusBar: {
        [THEME_MODE.dark]: 'light-content',
        [THEME_MODE.light]: 'dark-content',
      },
      hozLogo: {
        [THEME_MODE.dark]: 'hozLogo',
        [THEME_MODE.light]: 'hozLogoWhite',
      },
      darkMode: {
        [THEME_MODE.dark]: 'darkMode',
        [THEME_MODE.light]: 'lightMode',
      },
      backgroundSwitch: {
        [THEME_MODE.dark]: Colors.GRAY8,
        [THEME_MODE.light]: ColorsLight.GRAY5,
      },
      storeGame: {
        [THEME_MODE.dark]: ['#2F2E2F', '#9383A3', '#302E2F'],
        [THEME_MODE.light]: ['#F1EEF3', '#DBCEE8', '#F1EEF3'],
      },
      portfolio: {
        [THEME_MODE.dark]: Portfolio,
        [THEME_MODE.light]: PortfolioLight,
      },
      color: {
        [THEME_MODE.dark]: Colors,
        [THEME_MODE.light]: ColorsLight,
      },
    };

    // @ts-ignore
    return (
      keyChangeTheme[type as keyof typeof keyChangeTheme]?.[themeMode] ??
      keyChangeTheme[type as keyof typeof keyChangeTheme]
    );
  };

  const createTheme = (styles: Record<string, any>, key: string) => {
    const themeModeRedux = themeMode;
    const keyTheme = key + themeModeRedux;

    // if (!isDev) {
    //   if (key) {
    //     const oldStyle = CacheStyles.get(keyTheme)
    //     if (oldStyle) {
    //       return oldStyle
    //     }
    //   }
    // }

    const colorTheme = getTheme('color');

    const keyColor = [
      'color',
      'backgroundColor',
      'borderBottomColor',
      'borderTopColor',
      'borderRightColor',
      'borderLeftColor',
      'shadowColor',
      'borderColor',
    ];

    const styleReturn: Record<string, any> = {};
    Object.keys(styles).forEach((item) => {
      const keyValue = styles[item];

      const smallKey = Object.keys(keyValue);

      if (smallKey.find((key) => keyColor.includes(key))) {
        const newKeyValue: Record<string, any> = {};
        smallKey.forEach((inside) => {
          const keyValueInside = keyValue[inside];

          newKeyValue[inside] = keyColor.includes(inside)
            ? (colorTheme as Record<string, any>)[keyValueInside] ||
              keyValueInside
            : keyValueInside;
        });
        styleReturn[item] = newKeyValue;
      } else {
        styleReturn[item] = keyValue;
      }
    });
    const styleCreated = StyleSheet.create(styleReturn);

    if (key) {
      CacheStyles.set(keyTheme, styleCreated);
    }
    return styleCreated;
  };

  const textDefault = () => {
    const color = getTheme('color') as Record<string, any>;

    const style = {
      color: color.TEXT,
      fontSize: width(4),
      backgroundColor: 'transparent',
      fontFamily: Font.REGULAR,
    };

    // @ts-ignore
    return StyleSheet.create(style);
  };

  const textTitle = (key: TEXT_TITLE) => {
    const color = getTheme('color');

    const style = {
      [TEXT_TITLE.TEXT_TITLE_XSMALL]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize225,
        // lineHeight: LINE_HEIGHT.normal,
        fontWeight: FONTS_WEIGHT.Semibold,
        fontFamily: Font.SEMI_BOLD,
      },
      [TEXT_TITLE.TEXT_TITLE_SMALL]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize250,
        fontWeight: FONTS_WEIGHT.Semibold,
        fontFamily: Font.SEMI_BOLD,
        // lineHeight: LINE_HEIGHT.tight
      },
      [TEXT_TITLE.TEXT_TITLE]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize300,
        fontWeight: FONTS_WEIGHT.Semibold,
        fontFamily: Font.SEMI_BOLD,
        // lineHeight: LINE_HEIGHT.tight
      },
      [TEXT_TITLE.TEXT_TITLE_LARGE]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize350,
        // backgroundColor: 'transparent',
        fontWeight: FONTS_WEIGHT.Semibold,
        fontFamily: Font.SEMI_BOLD,

        // lineHeight: LINE_HEIGHT.tight
      },
      [TEXT_TITLE.TEXT_TITLE_XLARGE]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize400,
        backgroundColor: 'transparent',
        fontWeight: FONTS_WEIGHT.Semibold,
        fontFamily: Font.SEMI_BOLD,
        // lineHeight: LINE_HEIGHT.tight
      },
    };

    // @ts-ignore
    return StyleSheet.create(style[key]);
  };

  const textUI = (key: TEXT_UI) => {
    const color = getTheme('color');

    const style = {
      [TEXT_UI.TEXT_TINY]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize100,
        fontWeight: FONTS_WEIGHT.Medium,
        fontFamily: Font.MEDIUM,
      },
      [TEXT_UI.TEXT_TINY_STRONG]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize100,
        fontFamily: Font.SEMI_BOLD,
        fontWeight: FONTS_WEIGHT.Semibold,
      },
      [TEXT_UI.TEXT_3XSMALL]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize125,
        fontWeight: FONTS_WEIGHT.Medium,
        fontFamily: Font.MEDIUM,
      },
      [TEXT_UI.TEXT_3XSMALL_STRONG]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize125,
        fontFamily: Font.SEMI_BOLD,
        fontWeight: FONTS_WEIGHT.Semibold,
      },
      [TEXT_UI.TEXT_2XSMALL]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize150,
        fontWeight: FONTS_WEIGHT.Medium,
        fontFamily: Font.MEDIUM,
      },
      [TEXT_UI.TEXT_2XSMALL_STRONG]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize150,
        fontFamily: Font.SEMI_BOLD,
        fontWeight: FONTS_WEIGHT.Semibold,
      },
      [TEXT_UI.TEXT_XSMALL]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize162,
        fontWeight: FONTS_WEIGHT.Medium,
        fontFamily: Font.MEDIUM,
      },
      [TEXT_UI.TEXT_XSMALL_STRONG]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize162,
        fontFamily: Font.SEMI_BOLD,
        fontWeight: FONTS_WEIGHT.Semibold,
      },
      [TEXT_UI.TEXT_SMALL]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize175,
        fontWeight: FONTS_WEIGHT.Medium,
        fontFamily: Font.MEDIUM,
      },
      [TEXT_UI.TEXT_SMALL_STRONG]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize175,
        fontFamily: Font.SEMI_BOLD,
        fontWeight: FONTS_WEIGHT.Semibold,
      },
      [TEXT_UI.TEXT_REGULAR]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize187,
        fontWeight: FONTS_WEIGHT.Regular,
        fontFamily: Font.REGULAR,
      },
      [TEXT_UI.TEXT_MEDIUM]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize187,
        fontWeight: FONTS_WEIGHT.Medium,
        // lineHeight: LINE_HEIGHT.normal,
      },
      [TEXT_UI.TEXT_MEDIUM_STRONG]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize187,
        fontFamily: Font.SEMI_BOLD,
        fontWeight: FONTS_WEIGHT.Semibold,
      },
      [TEXT_UI.TEXT_LARGE]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize200,
        fontFamily: Font.MEDIUM,
        fontWeight: FONTS_WEIGHT.Medium,
      },
      [TEXT_UI.TEXT_LARGE_STRONG]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize200,
        fontWeight: FONTS_WEIGHT.Semibold,
        fontFamily: Font.SEMI_BOLD,
      },
      [TEXT_UI.TEXT_REGULAR_STRONG]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize200,
        fontFamily: Font.MEDIUM,
        fontWeight: FONTS_WEIGHT.Medium,
      },
      [TEXT_UI.TEXT_XLARGE]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize225,
        fontFamily: Font.MEDIUM,
        fontWeight: FONTS_WEIGHT.Medium,
      },
      [TEXT_UI.TEXT_XLARGE_STRONG]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize225,
        fontFamily: Font.SEMI_BOLD,
        fontWeight: FONTS_WEIGHT.Semibold,
      },
      [TEXT_UI.TEXT_2XLARGE]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize250,
        fontWeight: FONTS_WEIGHT.Regular,
        fontFamily: Font.REGULAR,
      },
      [TEXT_UI.TEXT_2XLARGE_STRONG]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize250,
        fontFamily: Font.SEMI_BOLD,
        fontWeight: FONTS_WEIGHT.Semibold,
      },
      [TEXT_UI.TEXT_3XLARGE]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize300,
        // lineHeight: LINE_HEIGHT.normal,
        fontWeight: FONTS_WEIGHT.Medium,
        fontFamily: Font.MEDIUM,
      },
      [TEXT_UI.TEXT_3XLARGE_STRONG]: {
        color: color.TEXT,
        fontSize: FONTS_SIZE.fontSize300,
        // lineHeight: LINE_HEIGHT.normal,
        fontFamily: Font.SEMI_BOLD,
        fontWeight: FONTS_WEIGHT.Semibold,
      },
    };

    // @ts-ignore
    return StyleSheet.create(style[key]);
  };

  return {
    textDefault,
    getTheme,
    createTheme,
    textTitle,
    textUI,
  };
};

export default useStyles;
