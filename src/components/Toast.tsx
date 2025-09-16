// @ts-nocheck
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { type AlertType, View } from 'react-native';
import Animated, {
  ZoomInEasyDown,
  ZoomOutEasyDown,
} from 'react-native-reanimated';
import { convertPxToPt, height, width } from '../Styles/utils';
import _ from 'lodash';
import Icon from './Icon';
import Text from './Text';
import EBorderSize from '../Styles/borderSize';
import { EText } from '../Styles/Colors';
import { TEXT_UI } from '../Styles';
import { useThemeContext } from '../context/ThemeContext';

export const TOAST_TYPE = {
  error: 'error',
  confirm: 'confirm',
  success: 'success',
  info: 'info',
};

const COMPONENT_TYPE = {
  error: {
    color: 'RED',
    icon: 'app_error',
    title: 'errorAlert',
  },
  info: {
    color: 'YELLOW',
    icon: 'app_info',
    title: 'notice',
  },
  confirm: {
    color: 'YELLOW',
    icon: 'app_info',
    title: 'confirm',
  },
  success: {
    color: 'GREEN',
    icon: 'app_check',
    title: 'success',
  },
};
height(10);
interface Options {
  message: string;
  icon: string;
  title: string;
  subActionTitle?: string;
  timeClose?: number;
  iconComponent?: React.ReactNode;
}

interface PassProps {
  autoClose: boolean;
  type: typeof TOAST_TYPE;
}

interface RefAction {
  open: (message: string, passProps?: Partial<PassProps>) => any;
  close: () => void;
}

interface Props {}

let timeoutClose: NodeJS.Timeout;
// timeClose,type
// _underscore for unused pre-var;
const Toast = forwardRef<RefAction, Props>((_props, ref) => {
  const refAlert = useRef<AlertType>(null);
  const { useTheme } = useThemeContext();

  const [options, setOptions] = useState<Partial<Options>>({});
  const styles = useTheme('Alert', style);

  // @ts-ignore
  const componentModule = COMPONENT_TYPE[_.get(options, 'type', 'success')];

  const open = (message, passProps) => {
    if (!message) return;

    if (_.get(options, 'message')) {
      return;
    }
    setOptions({ message: message.toString(), ...passProps });
    // const autoClose = get(passProps, 'autoClose', true)
    // const isConfirmErr = get(passProps, 'type') === ALERT_TYPE.confirm || get(passProps, 'type') === ALERT_TYPE.error
    // if (!isConfirmErr && autoClose) {
    timeoutClose = setTimeout(
      () => {
        passProps?.callback && passProps.callback();
        onDismissAlert();
      },
      _.get(options, 'timeClose') || 2500
    );
    // }
  };

  const [isOut, setOut] = useState();

  const onDismissAlert = (_callback?: () => void) => {
    if (isOut) {
      return;
    }
    clearTimeout(timeoutClose);
    refAlert.current && refAlert.current?.zoomOut(300);

    setTimeout(() => {
      _.get(options, 'callback') && _.get(options, 'callback')();
      !!_callback && _callback();
      setOut(false);
      setOptions(null);
    }, 300);
  };

  const onDismissAlertWithPress = () => {
    onDismissAlert(_.get(options, 'subActionCallback'));
  };

  useImperativeHandle(ref, () => ({
    open,
    close: onDismissAlert,
  }));

  // const animatedHeightStyle = useAnimatedStyle(() => {
  //   return {
  //     bottom: withTiming(
  //      5
  //     ),
  //   };
  // }, [heightKeyboard]);

  if (_.get(options, 'message')) {
    return (
      <Animated.View
        entering={ZoomInEasyDown}
        exiting={ZoomOutEasyDown}
        style={[styles.toastCtn]}
        onTouchStart={onDismissAlertWithPress}
      >
        <View style={styles.leftContainer}>
          {_.get(options, 'iconComponent') ? (
            _.get(options, 'iconComponent')
          ) : (
            <Icon
              name={options.icon || 'app_copy'}
              color={_.get(componentModule, 'color', 'GREEN')}
            />
          )}
        </View>
        <View style={styles.flex1}>
          {!!options.title && (
            <Text
              style={[
                styles.titleToast,
                !!_.get(options, 'subActionTitle', '') &&
                  styles.textWidthWithSubTitle,
              ]}
            >
              {options.title}
            </Text>
          )}
          {!!options.message && (
            <Text
              numberOfLines={1}
              style={[
                styles.messageStyleToast,
                !!_.get(options, 'subActionTitle', '') &&
                  styles.textWidthWithSubTitle,
              ]}
            >
              {options.message}
            </Text>
          )}
        </View>
        {!!_.get(options, 'subActionTitle', '') && (
          <Text
            type={TEXT_UI.TEXT_SMALL_STRONG}
            style={[styles.textBrand, styles.leftTextAction]}
          >
            {_.get(options, 'subActionTitle', '')}
          </Text>
        )}
      </Animated.View>
    );
  }
});

export default React.memo(Toast);

const style = {
  leftContainer: {
    width: width(15),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleToast: {
    textAlign: 'left',
    fontWeight: 400,
    width: width(70),
  },
  messageStyleToast: {
    fontSize: width(3.5),
    textAlign: 'left',
    width: width(70),
    color: 'GRAY6',
  },
  textWidthWithSubTitle: {
    width: width(60),
  },
  toastCtn: {
    flexDirection: 'row',
    zIndex: 1000,
    width: width(90),
    bottom: height(5),
    position: 'absolute',
    paddingVertical: width(4),
    borderRadius: EBorderSize.small,
    backgroundColor: 'GRAY1',
    alignSelf: 'center',
    alignItems: 'center',
  },

  GREEN: {
    backgroundColor: 'GREEN',
  },
  RED: {
    backgroundColor: 'RED',
  },
  textBrand: {
    color: EText.TEXT_BRAND,
  },
  confirmButtonSmall: {
    width: width(38),
  },
  rowButton: {
    marginVertical: convertPxToPt(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: width(80),
  },
  grayButton: {
    backgroundColor: 'GRAY2',
    width: width(38),
  },
  button: {
    backgroundColor: 'GREEN',
    marginVertical: convertPxToPt(4),
    width: width(80),
  },
  txtAlertTitle: {
    fontSize: width(5),
    color: 'YELLOW',
    textAlign: 'center',
    alignSelf: 'center',
  },
  messageStyle: {
    lineHeight: width(6),
    marginTop: height(2),
    color: 'TEXT',
    textAlign: 'center',
    fontSize: width(3.5),
  },
  defaultAlertContainer: {
    backgroundColor: 'GRAY1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: convertPxToPt(8),
    paddingHorizontal: width(5),
    minHeight: convertPxToPt(18),
    width: width(90),
    borderRadius: width(5),
  },
  boxAlert: {
    padding: width(4),
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'GRAY05',
    borderRadius: width(5),
    position: 'absolute',
    top: 0,
  },
  backDropContainerInSide: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
    height: height(100),
    width: width(100),
  },
  backDropContainer: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'BACK_DROP',
    height: height(100),
    width: width(100),
  },
  centerView: {
    backgroundColor: 'BACK_DROP',
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  alertContainer: {
    bottom: 0,
    height: height(100),
    width: width(100),
    zIndex: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  outSideBox: {
    paddingTop: convertPxToPt(5.5),
  },
  leftTextAction: {
    marginRight: width(4),
  },
  flex1: {
    flex: 1,
  },
};
