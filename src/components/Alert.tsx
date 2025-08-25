import React, {
  type FC,
  forwardRef,
  type PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { TouchableOpacity, View } from 'react-native';
import { View as ViewAnim } from 'react-native-animatable';
import { BlurView } from '@react-native-community/blur';
import ButtonV2 from './Button';
import Button from './Button';
import colors from '../Styles/Colors/colors';
import Text from './Text';
import _ from 'lodash';
import { height, width } from '../Styles/utils';
import EBorderSize from '../Styles/borderSize';
import { EText } from '../Styles/Colors';
import Icon from './Icon';
import { useThemeContext } from '../context/ThemeContext';

export const ALERT_TYPE = {
  error: 'error',
  warning: 'warning',
  confirm: 'confirm',
  success: 'success',
  info: 'info',
};

const COMPONENT_TYPE = {
  error: {
    color: 'RED',
    icon: 'app_error',
    title: 'alertMess',
  },
  warning: {
    color: 'ORANGE70',
    icon: 'app_error',
    title: 'warningMess',
  },
  info: {
    color: 'TEXT',
    icon: 'app_info',
    title: 'infoMess',
  },
  confirm: {
    color: 'YELLOW',
    icon: 'app_info',
    title: 'confirmMess',
  },
  success: {
    color: 'GREEN',
    icon: 'alert_success',
    title: 'successMess',
  },
};

// const BlurViewComponent = createAnimatableComponent(BlurView)
// createAnimatableComponent don't work on react-native 0.72 - find another way to fix this
const BlurViewComponent = BlurView;

const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

let timeoutClose: any;
// timeClose,type
interface Props extends PropsWithChildren {}
export interface IAlertOptions {
  type?: string;
  autoClose?: boolean;
  callback?: Function;
  onCancel?: Function;
  onPress?: Function; //onConfirm Function
  onPressAsync?: () => Promise<any>;
  onActionCancel?: () => void; // case for 3 actions: cancel, confirm, dismiss
  countdown?: number;
  title?: string;
  isHideIcon?: boolean;
  isGray?: boolean;
  //View
  customView?: React.ReactElement | React.ReactNode;
  bottomView?: React.ReactElement | React.ReactNode;
  footerView?: React.ReactElement | React.ReactNode;
  text?: {
    cancel?: string;
    confirm?: string;
  };
  message?: string;
  isAlignLeft?: boolean;
}

// @ts-ignore
const Alert: FC<Props> = forwardRef<any, Props>((props, ref) => {
  const refAlert = useRef<any>(null);
  const { useTheme } = useThemeContext();

  const [options, setOptions] = useState<any | null>();
  const styles = useTheme('Alert', style) as any;

  const setMessage = (message: string, passProps: any) => {
    if (!message && !passProps.customView) return;

    if (_.get(options, 'message')) {
      return;
    }
    console.log(passProps, message, 'hehe');
    setOptions({
      message,
      ...passProps,
    });
    const autoClose = _.get(passProps, 'autoClose', true);
    const isConfirmErr = [
      ALERT_TYPE.confirm,
      ALERT_TYPE.error,
      ALERT_TYPE.warning,
    ].includes(_.get(passProps, 'type'));
    if (!isConfirmErr && autoClose) {
      timeoutClose = setTimeout(() => {
        passProps?.callback && passProps.callback();
        onDismissAlert();
      }, 4000);
    }
  };

  const [isOut, setOut] = useState<boolean>();

  const onDismissAlert = () => {
    if (isOut) {
      return;
    }
    clearTimeout(timeoutClose);
    refAlert.current && refAlert.current.fadeOut(300);

    setTimeout(() => {
      _.get(options, 'callback') && _.get(options, 'callback')?.();
      setOut(false);
      setOptions(null);
    }, 300);
  };
  useEffect(() => {
    refAlert.current && refAlert.current.fadeIn(300);
  }, [options?.message]);

  useImperativeHandle(ref, () => ({
    setMessage,
    onCloseAlert: onDismissAlert,
  }));

  if (_.get(options, 'message') || _.get(options, 'customView')) {
    if (_.get(options, 'type')) {
      return (
        <View style={styles.alertContainer}>
          {/*{ios && (*/}
          {/*  <BlurViewComponent*/}
          {/*    animation={fadeIn}*/}
          {/*    duration={600}*/}
          {/*    style={styles.absolute}*/}
          {/*    blurType={'dark'}*/}
          {/*    blurAmount={32}*/}
          {/*  />*/}
          {/*)}*/}

          {/*{ios ? (*/}
          {/*  <AlertComponent styles={styles} refAlert={refAlert} options={options!} onDismissAlert={onDismissAlert} isOut={isOut} />*/}
          {/*) : (*/}
          {/*  <>*/}
          <View style={styles.backDropContainer} />
          <AlertComponent
            styles={styles}
            refAlert={refAlert}
            options={options!}
            onDismissAlert={onDismissAlert}
            isOut={isOut}
          />
          {/*  </>*/}
          {/*)}*/}
        </View>
      );
    }

    return (
      <ViewAnim
        ref={refAlert}
        duration={300}
        easing={'ease-in-back'}
        animation="zoomIn"
        style={styles.toastCtn}
      >
        <Text style={styles.messageStyleToast}>{options?.message}</Text>
      </ViewAnim>
    );
  }
});

interface IAlertProps {
  styles?: any;
  refAlert?: any;
  options: IAlertOptions;
  onDismissAlert?: any;
  isOut?: boolean;
}

export const AlertComponent: FC<IAlertProps> = ({
  styles,
  refAlert,
  options,
  onDismissAlert,
  isOut,
}) => {
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const componentModule = !_.get(options, 'customModule')
    ? COMPONENT_TYPE[options!.type as keyof typeof COMPONENT_TYPE]
    : _.get(options, 'customModule');
  if (!componentModule) {
    return null;
  }

  const onCloseAlert = () => {
    options.onCancel && options.onCancel();
    onDismissAlert();
  };
  console.log(styles.messageStyle);

  const onCancelAction = () => {
    if (options.onActionCancel) {
      options.onActionCancel();
    } else onCloseAlert();
    onDismissAlert();
  };

  const onConfirm = async () => {
    if (options.onPress) {
      options.onPress();
    }
    if (options.onPressAsync && !loading) {
      setLoading(true);
      await options.onPressAsync();
      setLoading(false);
    }
    onDismissAlert();
  };

  const isHideIcon = _.get(options, 'isHideIcon');

  const isAlignLeft = _.get(options, 'isAlignLeft', false);
  return (
    <ViewAnim ref={refAlert} style={styles.alertContainer}>
      {_.get(options, 'backgroundClick', true) && (
        <TouchableOpacity
          disabled={isOut}
          activeOpacity={1}
          onPress={onCloseAlert}
          style={styles.backDropContainerInSide}
        />
      )}

      <View style={styles.outSideBox}>
        <ViewAnim
          animation="zoomIn"
          duration={300}
          style={[
            styles.defaultAlertContainer,
            isHideIcon && styles.hideIconContainer,
            isAlignLeft && styles.alignLeft,
          ]}
        >
          {!_.get(options, 'isHideIcon') && (
            <View style={styles.boxAlert}>
              <Icon
                size={width(8)}
                color={componentModule.color}
                name={componentModule.icon}
              />
            </View>
          )}

          <Text
            style={[styles.txtAlertTitle, isAlignLeft && styles.textAlignLeft]}
          >
            {_.get(options, 'title', componentModule.title)}
          </Text>
          {_.get(options, 'customView')}

          {_.get(options, 'message') !== ' ' && (
            <Text
              style={[styles.messageStyle, isAlignLeft && styles.textAlignLeft]}
            >
              {_.get(options, 'message', '')}
            </Text>
          )}

          {_.get(options, 'bottomView')}
          {_.get(options, 'type') === ALERT_TYPE.confirm ||
          _.get(options, 'type') === ALERT_TYPE.warning ? (
            <View style={styles.rowButton}>
              <Button
                options={{
                  delayPressIn: 1000,
                  darkMode: true,
                }}
                style={styles.confirmButtonSmall}
                onPress={onCancelAction}
                title={_.get(options, 'text.cancel', 'cancel')}
              />
              <ButtonV2
                // options={{
                //   delayPressIn: 1000
                // }}

                loading={loading}
                disabled={loading || !!_.get(options, 'countdown', false)}
                onPress={onConfirm}
                title={`${_.get(options, 'text.confirm', 'confirmBtn')}`}
                widthSize={styles.confirmButtonSmall.width}
                level={'primary'}

                // style={[styles.confirmButtonSmall]}
              />
              {/*<Button*/}
              {/*  options={{*/}
              {/*    delayPressIn: 1000,*/}
              {/*    textStyle: styles.confirmText*/}
              {/*  }}*/}
              {/*  isLoading={loading}*/}
              {/*  isDisable={loading || (get(options, 'countdown', false) && currentTimeLeft !== 0)}*/}
              {/*  onPress={onConfirm}*/}
              {/*  label={`${get(options, 'text.confirm', Lang.t('confirmBtn'))} ${get(options, 'countdown', false) ? (currentTimeLeft === 0 ? '' : `(${currentTimeLeft}s)`) : ''}`}*/}
              {/*  style={[*/}
              {/*    styles.confirmButtonSmall,*/}
              {/*    styles.YELLOW_DARK,*/}
              {/*    get(options, 'countdown', false) && currentTimeLeft === 0 && styles.YELLOW*/}
              {/*  ]}*/}
              {/*/>*/}
            </View>
          ) : (
            <Button
              options={{
                delayPressIn: 1000,
                darkMode: _.get(options, 'isGray', false),
              }}
              onPress={onConfirm}
              widthSize={width(80)}
              title={_.get(options, 'text.confirm', 'ok')}
              style={styles.button}
            />
          )}
        </ViewAnim>
      </View>
      {_.get(options, 'footerView')}
    </ViewAnim>
  );
};

export default React.memo(Alert);

const style = {
  GREEN: {
    backgroundColor: 'GREEN',
  },
  RED: {
    backgroundColor: 'RED',
  },
  YELLOW: {
    backgroundColor: 'YELLOW',
  },
  YELLOW_DARK: {
    backgroundColor: colors.y80,
  },
  confirmButtonSmall: {
    backgroundColor: 'GRAY2',
    width: width(38),
  },
  rowButton: {
    marginVertical: height(3.5),
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
    // backgroundColor: 'GREEN',
    marginVertical: height(3.5),
    width: width(80),
  },
  txtAlertTitle: {
    fontSize: width(5),
    color: 'TEXT',
    textAlign: 'center',
    alignSelf: 'center',
  },
  messageStyle: {
    maxWidth: width(70),
    lineHeight: width(6),
    marginTop: height(1),
    color: 'GRAY6',
    textAlign: 'center',
    fontSize: width(3.5),
  },
  defaultAlertContainer: {
    backgroundColor: 'GRAY15',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: height(8),
    paddingHorizontal: width(5),
    minHeight: height(18),
    width: width(90),
    borderRadius: width(EBorderSize.tiny),
  },
  hideIconContainer: {
    paddingTop: width(6.5),
  },
  boxAlert: {
    marginTop: height(4),
    marginBottom: height(1),

    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // backgroundColor: 'GRAY05',
    borderRadius: width(5),
    // position: 'absolute',
    // top: 0
  },
  backDropContainerInSide: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
    // paddingTop: height(5.5)
  },
  messageStyleToast: {
    maxWidth: width(85),
    color: 'TEXT',
    fontSize: width(3.5),
  },
  toastCtn: {
    zIndex: 1000,
    top: height(50),
    position: 'absolute',
    paddingHorizontal: width(3),
    paddingVertical: height(2),
    borderRadius: width(10),
    backgroundColor: 'GRAY15',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmText: {
    color: EText.TEXT_ON_INVERSE_CONSTANT,
  },
  alignLeft: { alignItems: 'flex-start' },
  textAlignLeft: {
    textAlign: 'left',
    width: '100%',
    maxWidth: width(80),
  },
};
