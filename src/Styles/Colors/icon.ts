import Colors from './colors';

export enum EIcon {
  'ICON' = 'ICON',
  'ICON_SUBTLE' = 'ICON_SUBTLE',
  'ICON_DISABLED' = 'ICON_DISABLED',
  'ICON_ON_INVERSE' = 'ICON_ON_INVERSE',
  'ICON_ON_COLOR' = 'ICON_ON_COLOR',
  'ICON_ON_INVERSE_SUBTLE' = 'ICON_ON_INVERSE_SUBTLE',
  'ICON_INTERACTIVE' = 'ICON_INTERACTIVE',
  'ICON_INFORMATIVE' = 'ICON_INFORMATIVE',
  'ICON_SUCCEED' = 'ICON_SUCCEED',
  'ICON_ERROR' = 'ICON_ERROR',
  'ICON_WARNING' = 'ICON_WARNING',
  'ICON_BRAND' = 'ICON_BRAND',
}

export const ICON_COLOR = {
  dark: {
    [EIcon.ICON]: Colors.ng1,
    [EIcon.ICON_SUBTLE]: Colors.ng50,
    [EIcon.ICON_DISABLED]: Colors.white_a20,
    [EIcon.ICON_ON_INVERSE]: Colors.ng95,
    [EIcon.ICON_ON_INVERSE_SUBTLE]: Colors.ng40,
    [EIcon.ICON_ON_COLOR]: Colors.ng8,
    [EIcon.ICON_INTERACTIVE]: Colors.y40,
    [EIcon.ICON_INFORMATIVE]: Colors.b30,
    [EIcon.ICON_SUCCEED]: Colors.gr60,
    [EIcon.ICON_ERROR]: Colors.r50,
    [EIcon.ICON_WARNING]: Colors.or50,
    [EIcon.ICON_BRAND]: Colors.y40,
  },
  light: {
    [EIcon.ICON]: Colors.ng95,
    [EIcon.ICON_SUBTLE]: Colors.ng50,
    [EIcon.ICON_DISABLED]: Colors.black_a20,
    [EIcon.ICON_ON_INVERSE]: Colors.ng5,
    [EIcon.ICON_ON_COLOR]: Colors.ng60,
    [EIcon.ICON_ON_INVERSE_SUBTLE]: Colors.ng8,
    [EIcon.ICON_INTERACTIVE]: Colors.y50,
    [EIcon.ICON_INFORMATIVE]: Colors.b50,
    [EIcon.ICON_SUCCEED]: Colors.gr60,
    [EIcon.ICON_ERROR]: Colors.r50,
    [EIcon.ICON_WARNING]: Colors.or50,
    [EIcon.ICON_BRAND]: Colors.y40,
  },
};
