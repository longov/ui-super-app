// @ts-nocheck

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import Alert from './Alert';
import Toast from './Toast';
import _ from 'lodash';
import Icon from './Icon';
import { height, ios, topNavBarIOS, width } from '../Styles/utils';
import { useThemeContext } from '../context/ThemeContext';

interface IModalBoxProps {
  callBack?: () => void;
  onClose?: () => void;
}

interface ToastProps {
  open: Function;
}

export interface IModalBoxRef {
  open: (component: any, options?: any) => void;
  close: () => void;
  setMessage: (message: string, passProps?: any) => void;
}

export interface IModalOption {
  isNotShowClose?: boolean;
  onClose?: Function;
  enableKeyboardAvoidModal?: boolean;
  isConfirmModal?: boolean;
  customViewBox?: ViewStyle;
}

type ModalBoxComponent = React.ForwardRefRenderFunction<
  IModalBoxRef,
  IModalBoxProps
>;

const ModalBox: ModalBoxComponent = (props, ref) => {
  const [children, setChildren] = useState(null);
  const { useTheme, themeMode } = useThemeContext();
  const styles = useTheme('Modal', style);
  const isDark = themeMode === 'dark';
  const alertRef = useRef<IModalBoxRef>(null);
  const toastRef = useRef<ToastProps>(null);
  const [options, setOptions] = useState<IModalOption>({});
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const noActionCloseBackground = _.get(options, 'isConfirmModal');

  useImperativeHandle(ref, () => ({
    open,
    close,
    setMessage,
    openToast,
  }));

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const open = (component, o) => {
    Keyboard.dismiss();
    setChildren(component);
    o && setOptions(o);
  };

  const setMessage = (message, passProps) => {
    alertRef?.current?.setMessage(message, passProps);
  };

  const openToast = (message: string, passProps: any) => {
    toastRef?.current?.open(message, passProps);
  };

  const close = () => {
    !!props.callBack && props.callBack();
    options?.onClose && options.onClose();
    setOptions({});
    setChildren(null);
    Keyboard.dismiss();
  };
  // @ts-ignore
  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="slide"
      visible={children !== null}
    >
      {/* For context menu to show  over modal */}
      {/*<HoldMenuProvider backdropBlur={false}>*/}
      <Toast ref={toastRef} />
      <Alert ref={alertRef} />
      <BlurView
        //@ts-expect-error this properties is deprecated & removed
        overlayColor="transparent"
        duration={200}
        style={[styles.blurView, _.get(options, 'customBlur', {})]}
        blurType={isDark ? 'thinMaterialDark' : 'thinMaterialLight'}
        blurAmount={30}
      >
        {noActionCloseBackground ? (
          children ? (
            children
          ) : (
            <View />
          )
        ) : (
          <KeyboardAvoidingView
            style={[
              styles.viewBox,
              _.get(options, 'isNotShowClose') && styles.noPadding,
              _.get(options, 'customViewBox', {}),
            ]}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={close}
              style={styles.absoluteView}
            />
            {!_.get(options, 'isNotShowClose') && (
              <TouchableOpacity onPress={close} style={styles.closeView}>
                <Icon name="app_close" />
              </TouchableOpacity>
            )}
            {children}
          </KeyboardAvoidingView>
        )}
      </BlurView>
      {keyboardStatus ? (
        <KeyboardAvoidingView behavior="padding">
          {Platform.OS === 'ios' ? (
            <View />
          ) : (
            <View style={styles.customViewKeyboard} />
          )}
        </KeyboardAvoidingView>
      ) : (
        <></>
      )}
      {/*</HoldMenuProvider>*/}
    </Modal>
  );
};

const style = {
  closeView: {
    top: topNavBarIOS + height(2),
    right: width(5),
    position: 'absolute',
    marginBottom: height(2),
    width: width(90),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  absoluteView: {
    position: 'absolute',
    zIndex: -1,
    height: height(100),
    width: width(100),
  },
  blurView: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1,
    flex: 1,
    width: width(100),
  },
  noPadding: {
    paddingTop: ios ? 0 : width(5),
  },
  viewBox: {
    flex: 1,
    width: width(100),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: topNavBarIOS + height(5) + (ios ? 0 : width(5)),
  },
  //TODO: Làm tạm vì KeyboardAvoidingView không hoạt động với Modal ở bản này
  customViewKeyboard: {
    backgroundColor: 'GRAY05',
    height: height(40),
  },
};

export default React.memo(forwardRef(ModalBox));
