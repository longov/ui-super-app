import Colors from './colors';

export enum EProcess {
  'CIRCLE_TRACK_FILL' = 'PROCESS_CIRCLE_TRACK_FILL',
  'BAR_ON_BACKGROUND_TRACK_FILL' = 'PROCESS_BAR_ON_BACKGROUND_TRACK_FILL',
  'ON_BACKGROUND_INDICATOR' = 'PROCESS_ON_BACKGROUND_INDICATOR',
  'BAR_TRACK_FILL' = 'PROCESS_BAR_TRACK_FILL',
  'PROGRESS_INDICATOR' = 'PROGRESS_INDICATOR',
}

export const PROCESS_COLORS: Record<
  'light' | 'dark',
  Record<EProcess, string>
> = {
  dark: {
    [EProcess.CIRCLE_TRACK_FILL]: Colors.white_a10,
    [EProcess.BAR_ON_BACKGROUND_TRACK_FILL]: Colors.white_a10,
    [EProcess.ON_BACKGROUND_INDICATOR]: Colors.y40,
    [EProcess.BAR_TRACK_FILL]: Colors.white_a10,
    [EProcess.PROGRESS_INDICATOR]: Colors.y40,
  },
  light: {
    [EProcess.CIRCLE_TRACK_FILL]: Colors.white_a10,
    [EProcess.BAR_ON_BACKGROUND_TRACK_FILL]: Colors.white_a10,
    [EProcess.ON_BACKGROUND_INDICATOR]: Colors.y40,
    [EProcess.BAR_TRACK_FILL]: Colors.white_a10,
    [EProcess.PROGRESS_INDICATOR]: Colors.black_a10,
  },
};
