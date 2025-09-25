import { View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import React, {
  type FC,
  type PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import _, { isEmpty } from 'lodash';
import LottieView from 'lottie-react-native';
import images from '../images';
import Icon from '../components/Icon';
import { ESIZE } from '../Styles/size';
import Text from '../components/Text';
import { COLORS, ESpacing, FONTS_SIZE, FONTS_WEIGHT, TEXT_UI } from '../Styles';
import { width } from '../Styles/utils';
import { useThemeContext } from 'react-native-ui-lib-js';
import sleep from '../utils/sleep';
import EBorderSize from '../Styles/borderSize';

interface Options {
  status:
    | 'error'
    | 'confirm'
    | 'success'
    | 'info'
    | 'processing'
    | 'longProcessing'
    | 'countdown'
    | 'loading';
  content: string;
  icon?: { name?: string; color?: string };
  description: string;
  action?: Function;
  hash?: string;
  chain?: string;
  timeout?: number;
  position?: number | string;
  iconComponent?: React.ReactNode;
}

const Toast = React.createContext({
  closeBadge: () => {},
  // eslint-disable-next-line @typescript-eslint/no-shadow
  setToast: (_: Partial<Options>) => {},
});

let timeout: any;

const ToastServices: FC<PropsWithChildren> = ({ children }) => {
  const pressed = useSharedValue<boolean>(false);
  const offset = useSharedValue<number>(400);
  const { useTheme } = useThemeContext();
  const styles = useTheme('ToastServices', style);

  const [options, setOptions] = useState<Partial<Options>>({});

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));
  //

  // Icon status
  const iconStatus = {
    error: {
      color: 'RED',
      icon: 'ic-v2-cross-cirlce',
      title: 'errorAlert',
    },
    confirm: {
      color: 'YELLOW',
      icon: 'app_info',
      title: 'confirm',
    },
    success: {
      color: 'GREEN',
      icon: 'app_check_cirlce',
      title: 'success',
    },
    info: {
      color: COLORS.ICON_SUBTLE,
      icon: 'ic-v2-signage-informative',
      title: 'notice',
    },
    loading: {
      color: 'YELLOW',
      icon: 'app_info',
      title: 'loading',
    },
  };

  const closeBadge = () => {
    offset.value = withSpring(400);
    timeout && clearTimeout(timeout);
    setOptions({});
  };

  const setToast = async (options: Partial<Options>) => {
    timeout && clearTimeout(timeout);
    await sleep(500);
    console.log('call');
    setOptions(options);
    offset.value = withSpring(0, { damping: 20 });
  };

  const value = {
    closeBadge,
    setToast,
  };

  const openBadge = () => {
    offset.value = withSpring(0);
  };

  // const onGoScan = () => {
  //   Linking.openURL(utils.generateScan(options?.hash, options?.chain, true))
  // }

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offset.value = event.translationY;
    })
    .onFinalize(() => {
      if (offset.value > 50) {
        offset.value = withSpring(400, { damping: 20 }, () => {
          runOnJS(closeBadge)();
        });
      } else {
        offset.value = withSpring(0);
      }
      pressed.value = false;
    });

  const tap = Gesture.Tap().onEnd(() => {
    runOnJS(openBadge)();
  });

  useEffect(() => {
    const _timeout = options?.timeout || 3000;
    timeout = setTimeout(() => {
      if (offset.value !== 0) return;
      offset.value = withSpring(400, {}, () => {
        runOnJS(closeBadge)();
      });
    }, _timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const composed = Gesture.Race(pan, tap);

  let componentRender = <View />;

  // network status badge

  //transfer status badge
  if (!isEmpty(options)) {
    // @ts-ignore
    const icon = iconStatus[options?.status];
    componentRender = (
      <Animated.View style={[styles.networkStatusContainer, animatedStyles]}>
        <GestureDetector gesture={composed}>
          <View style={styles.container}>
            {options?.status === 'loading' ? (
              <LottieView
                style={[styles.imgLottie]}
                source={images.subLoading}
                autoPlay
                loop
              />
            ) : options?.iconComponent ? (
              options.iconComponent
            ) : (
              <Icon
                name={_.get(options, 'icon.name', icon.icon)}
                size={ESIZE.size_300}
                color={_.get(options, 'icon.color', icon.color)}
              />
            )}
            <View style={styles.textContainer}>
              {options?.content && (
                <Text
                  type={TEXT_UI.TEXT_MEDIUM}
                  style={[
                    styles.textTitle,
                    options?.hash ? { width: width(58) } : { width: width(70) },
                  ]}
                >
                  {options?.content}
                </Text>
              )}
              {options?.description && (
                <Text
                  type={TEXT_UI.TEXT_XSMALL}
                  color={COLORS.TEXT_SUBTLE}
                  numberOfLines={2}
                  style={[
                    options?.hash ? { width: width(58) } : { width: width(70) },
                  ]}
                >
                  {options?.description}
                </Text>
              )}
            </View>
            {_.get(options, 'action') && (
              <Text
                onPress={_.get(options, 'action.callback', undefined)}
                style={styles.textDetail}
              >
                {_.get(options, 'title')}
              </Text>
            )}
          </View>
        </GestureDetector>
      </Animated.View>
    );
  }

  return (
    <>
      <Toast.Provider value={value}>
        {children}
        <View
          style={[
            styles.containerWrapper,
            {
              bottom: options?.position || '10%',
            },
          ]}
        >
          {componentRender}
        </View>
      </Toast.Provider>
    </>
  );
};

export default ToastServices;

export const useToastServices = () => React.useContext(Toast);

const style = {
  containerWrapper: {
    position: 'absolute',
    left: 0,
    width: '100%',
    alignItems: 'flex-start',
    bottom: '10%',
    overflow: 'hidden',
    paddingHorizontal: ESpacing.space250,
    zIndex: 9999,
  },
  networkStatusContainer: {
    width: '100%',
    borderRadius: EBorderSize.medium,
    paddingVertical: width(1),
    backgroundColor: COLORS.TOAST_FILL,
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'left',
    padding: ESpacing.space150,
    gap: ESpacing.space150,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: width(1),
  },
  textTitle: {
    color: COLORS.TEXT,
    marginTop: ESpacing.space50,
  },
  textDescription: {
    color: COLORS.TEXT_SUBTLE,
    width: width(70),
  },
  imgLottie: {
    height: width(10),
    width: width(10),
  },
  goDetail: {
    width: width(20),
  },
  textDetail: {
    fontSize: FONTS_SIZE.fontSize187,
    fontWeight: FONTS_WEIGHT.Regular,
    color: COLORS.TEXT_BRAND,
    width: width(20),
    padding: width(3),
    justifySelf: 'flex-end',
  },
};
