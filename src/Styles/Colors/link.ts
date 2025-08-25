import Colors from './colors';

export enum ELink {
  'LINK' = 'LINK',
  'LINK_ACTIVE' = 'LINK_ACTIVE',
}

export const LINK_COLOR = {
  dark: {
    [ELink.LINK]: Colors.y40,
    [ELink.LINK_ACTIVE]: Colors.y60,
  },
  light: {
    [ELink.LINK]: Colors.y50,
    [ELink.LINK_ACTIVE]: Colors.y70,
  },
};
