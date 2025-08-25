import Colors from './colors';

export enum EBorder {
  'BORDER_1' = 'BORDER_1',
  'BORDER_1_SUBTLE' = 'BORDER_1_SUBTLE',
  'BORDER_2' = 'BORDER_2',
  'BORDER_2_SUBTLE' = 'BORDER_2_SUBTLE',
  'BORDER_3' = 'BORDER_3',
  'BORDER_3_SUBTLE' = 'BORDER_3_SUBTLE',
  'BORDER_ACTIVE' = 'BORDER_ACTIVE',
  'BORDER_ALPHA' = 'BORDER_ALPHA',
  'BORDER_ALPHA_INVERSE' = 'BORDER_ALPHA_INVERSE',
  'BORDER_ALPHA_SUBTLE' = 'BORDER_ALPHA_SUBTLE',
}

export const BORDER_COLORS = {
  dark: {
    [EBorder.BORDER_1]: Colors.ng92,
    [EBorder.BORDER_1_SUBTLE]: Colors.ng95,
    [EBorder.BORDER_2]: Colors.ng85,
    [EBorder.BORDER_2_SUBTLE]: Colors.ng90,
    [EBorder.BORDER_3]: Colors.ng80,
    [EBorder.BORDER_3_SUBTLE]: Colors.ng85,
    [EBorder.BORDER_ACTIVE]: Colors.y40,
    [EBorder.BORDER_ALPHA]: Colors.white_a10,
    [EBorder.BORDER_ALPHA_INVERSE]: Colors.black_a10,
    [EBorder.BORDER_ALPHA_SUBTLE]: Colors.white_a5,
  },
  light: {
    [EBorder.BORDER_1]: Colors.ng10,
    [EBorder.BORDER_1_SUBTLE]: Colors.ng8,
    [EBorder.BORDER_2]: Colors.ng8,
    [EBorder.BORDER_2_SUBTLE]: Colors.ng5,
    [EBorder.BORDER_3]: Colors.ng8,
    [EBorder.BORDER_3_SUBTLE]: Colors.ng1,
    [EBorder.BORDER_ACTIVE]: Colors.y50,
    [EBorder.BORDER_ALPHA]: Colors.black_a10,
    [EBorder.BORDER_ALPHA_INVERSE]: Colors.white_a10,
    [EBorder.BORDER_ALPHA_SUBTLE]: Colors.black_a5,
  },
};
