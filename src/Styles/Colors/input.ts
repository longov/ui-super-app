import Colors from './colors';

export enum EInputColor {
  FIELD_TEXT_ACTIVE = 'FIELD_TEXT_ACTIVE',
  FIELD_TEXT_LABEL = 'FIELD_TEXT_LABEL',
  FIELD_BORDER_ACTIVE = 'FIELD_BORDER_ACTIVE',
  FIELD_TEXT_PLACEHOLDER = 'FIELD_TEXT_PLACEHOLDER',
  FIELD_BORDER = 'FIELD_BORDER',
  FIELD_BORDER_ERROR = 'FIELD_BORDER_ERROR',
  FIELD_CARET = 'FIELD_CARET',
  FIELD_BACKGROUND = 'FIELD_BACKGROUND',
  FIELD_BACKGROUND_DISABLED = 'FIELD_BACKGROUND_DISABLED',
}

export const INPUT_COLOR = {
  dark: {
    [EInputColor.FIELD_TEXT_ACTIVE]: Colors.ng1,
    [EInputColor.FIELD_TEXT_LABEL]: Colors.ng40,
    [EInputColor.FIELD_BORDER_ACTIVE]: Colors.white_a30,
    [EInputColor.FIELD_TEXT_PLACEHOLDER]: Colors.ng60,
    [EInputColor.FIELD_BORDER]: Colors.white_a10,
    [EInputColor.FIELD_BORDER_ERROR]: Colors.r50,
    [EInputColor.FIELD_CARET]: Colors.y40,
    [EInputColor.FIELD_BACKGROUND]: Colors.white_a5,
    [EInputColor.FIELD_BACKGROUND_DISABLED]: Colors.white_a10,
  },
  light: {
    [EInputColor.FIELD_TEXT_ACTIVE]: Colors.ng100,
    [EInputColor.FIELD_TEXT_LABEL]: Colors.ng60,
    [EInputColor.FIELD_BORDER_ACTIVE]: Colors.black_a25,
    [EInputColor.FIELD_TEXT_PLACEHOLDER]: Colors.ng40,
    [EInputColor.FIELD_BORDER]: Colors.black_a5,
    [EInputColor.FIELD_BORDER_ERROR]: Colors.r50,
    [EInputColor.FIELD_CARET]: Colors.y60,
    [EInputColor.FIELD_BACKGROUND]: Colors.black_a3,
    [EInputColor.FIELD_BACKGROUND_DISABLED]: Colors.ng5,
  },
};
