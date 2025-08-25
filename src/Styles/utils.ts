import { Dimensions, PixelRatio, Platform } from 'react-native';

const MYWIDTH = Dimensions.get('window').width;
const MYHEIGHT = Dimensions.get('window').height;

export const isIphoneX = Platform.OS === 'ios' && MYHEIGHT >= 812;
export const ios = Platform.OS === 'ios';

export const width = (num: any) =>
  PixelRatio.roundToNearestPixel(MYWIDTH * (num / 100));

export const convertPxToPt = (px: number) => {
  return width((px / 390) * 100);
};
export const height = (num: number) =>
  PixelRatio.roundToNearestPixel(MYHEIGHT * (num / 100));

export const topNavBarIOS = height(
  Platform.OS === 'ios' ? (isIphoneX ? 4 : 1.5) : 1.5
);
