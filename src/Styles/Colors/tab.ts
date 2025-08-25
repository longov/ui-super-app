import Colors from './colors';
import { EText, TEXT_COLOR } from './text';

export enum ETab {
  'TAB_ACTIVE_TEXT' = 'TAB_ACTIVE_TEXT',
  'TAB_INACTIVE_TEXT' = 'TAB_INACTIVE_TEXT',
  'TAB_INACTIVE_INDICATOR' = 'TAB_INACTIVE_INDICATOR',
  'TAB_ACTIVE_INDICATOR' = 'TAB_ACTIVE_INDICATOR',
  'SCRIM_FILL' = 'SCRIM_FILL',
}

export const TAB_COLOR = {
  dark: {
    [ETab.TAB_INACTIVE_TEXT]: Colors.black_a0,
    [ETab.TAB_ACTIVE_TEXT]: Colors.y40,
    [ETab.TAB_INACTIVE_INDICATOR]: TEXT_COLOR.dark[EText.TEXT_SUBTLEST],
    [ETab.TAB_ACTIVE_INDICATOR]: Colors.y40,
    [ETab.SCRIM_FILL]: Colors.black_a80,
  },
  light: {
    [ETab.TAB_INACTIVE_TEXT]: Colors.white_a0,
    [ETab.TAB_ACTIVE_TEXT]: Colors.y50,
    [ETab.TAB_ACTIVE_INDICATOR]: Colors.y50,
    [ETab.TAB_INACTIVE_INDICATOR]: TEXT_COLOR.light[EText.TEXT_SUBTLEST],
    [ETab.SCRIM_FILL]: Colors.black_a80,
  },
};
