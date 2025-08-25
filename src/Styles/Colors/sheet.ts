import Colors from './colors';
import { BACKGROUND, EBackground } from './background';

export enum EBottomSheet {
  LAYER_STACK_FILL = 'LAYER_STACK_FILL',
  BOTTOM_SHEET_FILL = 'BOTTOM_SHEET_FILL',
  BOTTOM_SHEET_HANDLE_FILL = 'BOTTOM_SHEET_HANDLE_FILL',
}

export const SHEET_COLORS = {
  dark: {
    [EBottomSheet.LAYER_STACK_FILL]: Colors.ng90,
    [EBottomSheet.BOTTOM_SHEET_FILL]: BACKGROUND.dark[EBackground.BACKGROUND_2],
    [EBottomSheet.BOTTOM_SHEET_HANDLE_FILL]: Colors.white_a10,
  },
  light: {
    [EBottomSheet.LAYER_STACK_FILL]: Colors.ng10,
    [EBottomSheet.BOTTOM_SHEET_FILL]:
      BACKGROUND.light[EBackground.BACKGROUND_1],
    [EBottomSheet.BOTTOM_SHEET_HANDLE_FILL]: Colors.black_a10,
  },
};
