import Colors from './colors';

export enum EMiscellaneous {
  'OVERLAY' = 'OVERLAY',
  'SKELETON_BACKGROUND' = 'SKELETON_BACKGROUND',
  'SKELETON_ELEMENT' = 'SKELETON_ELEMENT',
}

export const MISC_COLORS = {
  dark: {
    [EMiscellaneous.OVERLAY]: Colors.black_a80,
    [EMiscellaneous.SKELETON_BACKGROUND]: Colors.white_a5,
    [EMiscellaneous.SKELETON_ELEMENT]: Colors.white_a10,
  },
  light: {
    [EMiscellaneous.OVERLAY]: 'rgba(255,255,255,0.5)',
    [EMiscellaneous.SKELETON_BACKGROUND]: 'rgba(0,0,0,0.1)',
    [EMiscellaneous.SKELETON_ELEMENT]: 'rgba(0,0,0,0.3)',
  },
};
