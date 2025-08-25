// @ts-nocheck
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import BottomSheet, {
  ANIMATION_CONFIGS,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { BackHandler, Keyboard, StyleSheet, View } from 'react-native';
import { ReduceMotion } from 'react-native-reanimated';
import { EBottomSheet } from '../Styles/Colors';
import { height, ios, width } from '../Styles/utils';
import useAppState from '../Hooks/useAppState';
import { useThemeContext } from '../context/ThemeContext';
import _ from 'lodash';

interface IProps {}
export enum BottomSheetEvent {
  onSizeChange = 'bottomSheetSizeChanged',
}
export interface IOptions {
  component?: any;
  index?: number;
  height?: string | number;
  snaps?: string[];
  isHideHandle?: boolean;
  isReset?: boolean;
  dynamic?: boolean;
  noTriggerReset?: boolean; // no reset
  isContentGesture?: boolean;
  onReset?: () => void;
  backgroundColor?: string;
  isMultiple?: boolean;
}

export interface IFWHandle {
  open: (component: React.ReactElement, options?: IOptions) => void;
  close: () => void;
  expand: (index: number) => void;
}

const defaultState = {
  height: height(90),
  dynamic: false,
  isContentGesture: false,
  index: -1,
} as IOptions;

export const BottomSheetV3 = forwardRef<IFWHandle, IProps>((_props, ref) => {
  const bottomSheetRef = React.createRef<BottomSheet>();
  const { useTheme, themeMode, getThemeMode } = useThemeContext();
  const styles = useTheme('BottomSheetV3.1', style);
  const appColor = getThemeMode('color');
  const useMultipleBottomSheet2 = useRef<BottomSheet>(null);

  const currentAppState = useAppState();

  const [options, setOptions] = useState<IOptions>(() => defaultState);
  const [optionsMultiple, setOptionsMultiple] = useState<IOptions>(
    () => defaultState
  );

  const snapPoints = useMemo(
    () => (options.height ? [options.height] : options.snaps || ['90%']),
    [options.snaps, options.height]
  );
  const snapPointsMulti = useMemo(
    () =>
      optionsMultiple.height
        ? [optionsMultiple.height]
        : optionsMultiple.snaps || ['90%'],
    [optionsMultiple.snaps, optionsMultiple.height]
  );

  const backgroundColor = _.get(options, 'backgroundColor');

  // eslint-disable-next-line react-hooks/exhaustive-deps,@typescript-eslint/no-shadow
  const open = (component: React.ReactElement, options: IOptions = {}) => {
    setOptions((prev) => {
      if (prev.index === 0) {
        bottomSheetRef.current?.snapToIndex(0);
      }
      return { component, index: 0, ...options };
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const close = useCallback(() => {
    bottomSheetRef.current?.close();
    // setOptions(defaultState)
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const expand = (index: number) => {
    if (options.snaps) {
      setOptions((prev) => ({ ...prev, index }));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const expandHeight = (height: number) => {
    setOptions((prev) => ({ ...prev, height }));
  };

  useEffect(() => {
    const backAction = () => {
      close();
      return !!options?.component;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomSheetRef]);

  useEffect(() => {
    if (currentAppState === 'active') {
      const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
        if (options.snaps && ios) {
          bottomSheetRef.current?.snapToIndex(1);
        }
      });
      // keyboard clear snappoint
      const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
        if (options.snaps && ios) {
          bottomSheetRef.current?.snapToIndex(0);
          // setOptions(defaultState)
        }
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, [snapPoints, currentAppState, options.snaps, bottomSheetRef]);

  const onReset = () => {
    if (options.noTriggerReset) {
      return;
    }
    //! handle some loading action when close bottomsheet
    options.onReset && options.onReset();
    //! Should close keyboard on bottomsheet close
    //! Android got issue on bottomsheet re-render
    if (ios) {
      Keyboard.dismiss();
    }

    setOptions(defaultState);
  };

  const onResetMultiple = () => {
    if (options.noTriggerReset) {
      return;
    }
    options.onReset && options.onReset();
    if (ios) {
      Keyboard.dismiss();
    }

    setOptionsMultiple(defaultState);
  };

  const openMultiple = (
    component: React.ReactElement,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    options: IOptions = {}
  ) => {
    setOptionsMultiple({ component, index: 0, ...options });
  };

  const closeMultiple = () => {
    useMultipleBottomSheet2.current?.close();
    setOptionsMultiple(defaultState);
  };

  //retriger on changed
  useImperativeHandle(ref, () => {
    return {
      open,
      close,
      expand,
      expandHeight,
      openMultiple,
      closeMultiple,
    } as IFWHandle;
  }, [open, close, expand]);

  const customBackdrop = useCallback((props) => {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.8}
      />
    );
  }, []);

  const onSizeChanged = useCallback((size: number) => {
    if (size < 0 && !ios) {
      //Android issue with onClose
      Keyboard.dismiss();
    }
  }, []);

  const { index } = options;

  //Fix Reaniamted Warning && Better performance
  //Stop library to modify sharedWorklet value;
  const animationConfigs = useMemo(() => {
    const freezedObject = Object.freeze(
      _.clone(ANIMATION_CONFIGS, { reduceMotion: ReduceMotion.System })
    );
    return freezedObject;
  }, []);

  return (
    <>
      <BottomSheet
        animationConfigs={animationConfigs}
        handleStyle={styles.handleStyle}
        handleIndicatorStyle={styles.indicatorStyle}
        key={`BottomSheet${themeMode}`}
        style={{ zIndex: Number.MAX_SAFE_INTEGER }}
        backdropComponent={customBackdrop}
        onChange={onSizeChanged}
        onClose={onReset}
        backgroundStyle={
          backgroundColor
            ? { backgroundColor: appColor[backgroundColor] }
            : styles.backgroundStyle
        }
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        maxDynamicContentSize={options.dynamic ? height(90) : undefined}
        enableDynamicSizing={!!options.dynamic}
        enableContentPanningGesture={
          ios
            ? true
            : options.isContentGesture
              ? options.isContentGesture
              : false
        }
        enablePanDownToClose
      >
        <View style={styles.contentContainer}>{options.component}</View>
      </BottomSheet>
      {options.isMultiple && (
        <BottomSheet
          backdropComponent={customBackdrop}
          handleStyle={styles.handleStyle}
          onClose={onResetMultiple}
          handleIndicatorStyle={styles.indicatorStyle}
          ref={useMultipleBottomSheet2}
          index={optionsMultiple.index}
          backgroundStyle={
            backgroundColor
              ? { backgroundColor: appColor[backgroundColor] }
              : styles.backgroundStyle
          }
          snapPoints={snapPointsMulti}
          key={`BottomSheet2${themeMode}`}
          animationConfigs={animationConfigs}
          enablePanDownToClose
        >
          {optionsMultiple.component}
        </BottomSheet>
      )}
    </>
  );
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height(1),
  },
  backgroundStyle: {
    backgroundColor: 'GRAY1',
  },
  indicatorStyle: {
    width: width(10.2),
    backgroundColor: EBottomSheet.BOTTOM_SHEET_HANDLE_FILL,
  },
  handleStyle: {
    paddingVertical: height(1.2),
    // backgroundColor: 'red'
  },
});
