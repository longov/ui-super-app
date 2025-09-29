import React, { type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Text from './Text';
import images from '../images';
import Icon from './Icon';
import { height, width } from '../Styles/utils';
import EBorderSize from '../Styles/borderSize';
import { useThemeContext } from 'react-native-ui-lib-js';

interface IEmptyData {
  isLoading?: boolean;
  isNoLogo?: boolean;
  name?: string;
  defaultStyle?: object;
  style?: object;
  stylesLottie?: object;
  image?: any;
  moreView?: any;
  title?: any;
  iconComponent?: React.ReactNode;
}

const Emptydata: FC<IEmptyData> = ({
  isNoLogo,
  stylesLottie,
  style,
  moreView,
  title,
  image,
  isLoading,
  iconComponent,
}) => {
  const { useTheme } = useThemeContext();

  const styles = useTheme('EmptyDataLib', styleInline);
  return (
    <View style={[styles.fullView, style]}>
      {isLoading ? (
        <LottieView
          style={[styles.imgLottie, stylesLottie]}
          source={images.subLoading}
          autoPlay
          loop
        />
      ) : (
        image ||
        (!isNoLogo && (
          <View style={styles.imageContainer}>
            {iconComponent ? (
              iconComponent
            ) : (
              <Icon name="ic98" size={width(20)} color="GRAY2" />
            )}
            {/*<Image source={images.grayLogo} style={styles.imgEmpty} />*/}
          </View>
        ))
      )}
      {title ? <Text style={styles.title}>{title}</Text> : moreView}
    </View>
  );
};

export default React.memo(Emptydata);

const styleInline = StyleSheet.create({
  imgEmpty: {
    height: width(13),
    width: width(13),
    resizeMode: 'contain',
  },
  imageContainer: {
    height: width(20),
    width: width(20),
    alignItems: 'center',
    borderRadius: EBorderSize.circle,
    // backgroundColor: 'GRAY1',
    justifyContent: 'center',
  },
  imgLottie: {
    height: height(8),
    width: width(20),
  },
  fullView: {
    height: height(75),
    width: width(100),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    color: 'GRAY3',
    textAlign: 'center',
    marginTop: height(1),
    marginBottom: height(2),
    maxWidth: width(50),
    alignSelf: 'center',
  },
});
