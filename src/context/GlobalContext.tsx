import Alert, { type IAlertOptions } from '../components/Alert';
import {
  BottomSheetV3,
  type IFWHandle,
  type IOptions,
} from '../components/BottomSheet';
import Modal, { type IModalOption } from '../components/Modal';
import React, { type FC, type PropsWithChildren, useMemo, useRef } from 'react';
import Toast from '../components/Toast';
import ToastServices from './ToastContext';

// import {BottomSheetV5} from 'common/Layout/V2/BottomSheet'

interface ModalProps {
  open: <T = any>(
    component: React.ReactElement<T>,
    options?: IModalOption
  ) => void;
  close: () => void;

  openToast(msg: string, passProps: any): void;
  //set message for toast
  setMessage(msg: string, passProps: any): void;

  openSheet(component: React.ReactElement<any>, options?: IOptions): void;

  closeSheet(): void;
}

interface AlertProps {
  setMessage: Function;

  onCloseAlert(): void;
}
interface ToastProps {
  open: Function;
  close(): void;
}

// * Move to common/Layout/Alert.tsx to avoid circular dependency

// interface AlertOptions {
//   type?: string
//   autoClose?: boolean
//   callback?: Function
//   onCancel?: Function
//   onPress?: Function //onConfirm Function
//   onPressAsync?: () => Promise<any>
//   countdown?: number
//   title?: string
//   isHideIcon?: boolean
//   isGray?: boolean
//   //View
//   customView?: React.ReactElement | React.ReactNode
//   bottomView?: React.ReactElement | React.ReactNode
//   footerView?: React.ReactElement | React.ReactNode
//   text?: {
//     cancel?: string
//     confirm?: string
//   }
// }

export interface IUseZenCardParams<T = object> {
  params: T;
  action: string;
  type: string;
  callBack: Function;
  callBackClose: Function;
}

const GlobalContext = React.createContext({
  showAlert: (_msg: string, _passProps?: IAlertOptions) => {},
  closeAlert: () => {},
  showToast: (_msg: string, _passProps?: any) => {},
  closeToast: () => {},
  openModal: (
    _component: React.ReactElement<any>,
    _options?: IModalOption
  ) => {},
  openSheet: (_component: React.ReactElement<any>, _options?: IOptions) => {},
  expandSheet: (_index: number) => {},
  closeSheet: () => {},
  closeModal: () => {},
  showToastModal: (_msg: string, _passProps: any) => {},

  showBottomSheetModal: (
    _component: React.ReactElement<any>,
    _options?: IOptions
  ) => {},

  closeBottomSheetModal: () => {},
});

export const GlobalProvider: FC<
  PropsWithChildren<{
    themeMode?: string;
  }>
> = ({ themeMode, children }) => {
  const refBottomSheet = useRef<IFWHandle>(null);
  const toastRef = useRef<ToastProps>(null);
  const alertRef = useRef<AlertProps>(null);
  const refModal = useRef<ModalProps>(null);
  const refModalZenCard = useRef<any>(null);

  const showToast = (msg: string, passProps: any) => {
    if (toastRef.current) {
      toastRef.current.open(msg, passProps);
    }
  };

  const closeToast = () => {
    if (toastRef.current) {
      toastRef.current.close();
    }
  };

  const showAlert = (msg: string, passProps: any) => {
    console.log('showAlert', msg, passProps);
    if (alertRef.current) {
      alertRef.current.setMessage(msg, passProps);
    }
  };

  const closeAlert = () => {
    if (alertRef.current) {
      alertRef.current.onCloseAlert?.();
    }
  };

  const openZenModal = ({
    params,
    type,
    callBack,
    action,
    callBackClose,
  }: Partial<IUseZenCardParams>) => {
    refModalZenCard.current?.open({
      type: type,
      action: action,
      params: params,
      callBack: async (_data: unknown) => {
        if (callBack) {
          callBack(_data);
        }
      },
      callBackClose: async (_data: unknown) => {
        if (callBackClose) {
          callBackClose(_data);
        }
      },
    });
  };

  const closeZenModal = () => {
    refModalZenCard.current?.close();
  };

  const openModal = (
    component: React.ReactElement<any>,
    options?: IModalOption
  ) => {
    refModal.current?.open(component, options);
  };

  const openSheet = (
    component: React.ReactElement<any>,
    options?: IOptions
  ) => {
    refBottomSheet.current?.open(component, options);
  };
  const closeSheet = () => {
    refBottomSheet.current?.close();
  };

  const expandSheet = (index: number) => {
    refBottomSheet.current?.expand(index);
  };

  const closeModal = () => {
    refModal.current?.close();
  };

  const showAlertModal = (msg: string, passProps: any) => {
    if (refModal.current) {
      refModal.current?.setMessage(msg, passProps);
    }
  };

  const showToastModal = (msg: string, passProps: any) => {
    if (refModal.current) {
      refModal.current?.openToast(msg, passProps);
    }
  };
  const showBottomSheetModal = (
    component: React.ReactElement<any>,
    options?: IOptions
  ) => {
    if (refModal.current) {
      refModal.current?.openSheet(component, options);
    }
  };

  const closeBottomSheetModal = () => {
    if (refModal.current) {
      refModal.current?.closeSheet();
    }
  };
  // PRE: new BottomSheetV5 next point and navigation
  // const openSheetV2Modal = (component: React.ReactNode, options?: any) => {
  //   refBottomSheetV5.current?.open(component, options)
  // }
  // const closeSheetV2Modal = () => {
  //   refBottomSheetV5.current?.close()
  // }
  //
  // const nextSheetV2Modal = () => {
  //   refBottomSheetV5.current?.onNextPoint()
  // }

  const value = useMemo(() => {
    return {
      showAlert,
      closeAlert,
      closeSheet,
      openSheet,
      expandSheet,
      showToast,
      closeToast,
      openModal,
      closeModal,
      showAlertModal,
      showToastModal,
      openZenModal,
      closeZenModal,
      refBottomSheet,

      showBottomSheetModal,
      closeBottomSheetModal,

      // openSheetV2Modal,
      // closeSheetV2Modal,
      // nextSheetV2Modal
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeMode]);

  // @ts-ignore
  return (
    <ToastServices>
      <GlobalContext.Provider value={value}>
        {children}
        <Modal ref={refModal as any} />
        <Alert ref={alertRef as any} />
        <Toast ref={toastRef as unknown as any} />
        <BottomSheetV3 ref={refBottomSheet as any} />
      </GlobalContext.Provider>
    </ToastServices>
  );
};

export const useGlobalContext = () => React.useContext(GlobalContext);
