// @ts-nocheck
import { type FieldError, get, useController } from 'react-hook-form';
import { COLORS, FONTS_SIZE, TEXT_UI } from '../Styles';
import React, { type FC, useState } from 'react';
import {
  Keyboard,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { View as ViewAnim } from 'react-native-animatable';
import Animated from 'react-native-reanimated';
import Callout, { CalloutType } from './Callout';
import { Text, useThemeContext } from 'react-native-ui-lib-js';
import _ from 'lodash';
import { convertPxToPt, height, ios, width } from '../Styles/utils';
import EBorderSize from '../Styles/borderSize';
import Icon from './Icon';

export interface InputProps extends TextInputProps {
  name: string;
  label: string;
  options: object;
  placeHolder: string;
  style: object;
  leftView: any;
  styleCustom: object;
  onFocusAction: (isFocus: boolean) => void;
  isDisable: boolean;
  isError: boolean;
  errMsg: string | undefined | FieldError;
  multiline: boolean;
  defaultValue: string;
  control: any;
  borderError?: boolean;
  clearable?: boolean;
  endView?: React.ReactNode;
  clearableAction: () => void;
}

const TouchableOpacityAnim = Animated.createAnimatedComponent(TouchableOpacity);

const Input: FC<Partial<InputProps>> = ({ name = '', control, ...props }) => {
  const {
    label,
    options,
    placeHolder,
    style,
    leftView,
    styleCustom,
    onFocusAction,
    isDisable,
    isError,
    errMsg,
    multiline,
    borderError = true,
    defaultValue = '',
    clearable = false,
    clearableAction,
  } = props;

  const { field } = useController({
    control,
    defaultValue,
    name,
  });

  const { useTheme, getThemeMode, textDefault, themeMode, convertLang } =
    useThemeContext();

  const colors = getThemeMode('color');

  // const styles = styleUse.createTheme(styleInput, 'CommonInput')
  const styles = useTheme('CommonInput', styleInput);
  textDefault();
  const sizeInput = _.size(field.value);

  // const TouchableOpacityAnim = useMemo(() => createAnimatableComponent(TouchableOpacity), [])

  const isSearchStatus = get(options, 'isSearch');

  const [isViewSearch, setOnSearch] = useState(
    get(options, 'showClose', false)
  );

  const onClearSearch = () => {
    field.onChange('');
  };

  const onCancelSearch = () => {
    field.onChange('');
    setTimeout(() => {
      Keyboard.dismiss();
    }, 50);
    _.get(options, 'onSearchCallback') && get(options, 'onSearchCallback')();
  };

  const onBlurFocus = (isFocus) => () => {
    _.get(options, 'showClose', false)
      ? setOnSearch(true)
      : setOnSearch(isFocus);
    onFocusAction && onFocusAction(isFocus);
  };

  // format
  const formatters = {
    // format number
    formatOnChangeNumber: (value) => {
      let formatValue = value;

      formatValue = formatValue.replace(/,/gim, '.').replace(/ /gim, '');

      if (isNaN(Number(formatValue))) {
        formatValue = formatValue.replace(/[^\d.]/g, '');
      }

      return formatValue;
    },
    // format text upper case
    formatOnChangeUpperCase: (value) => value.toUpperCase(),
    // format text lower case
    formatOnChangeLowerCase: (value) => value.toLowerCase(),
  };

  // on change input
  const onChangeText = (value) => {
    let formattedValue = value;

    Object.keys(formatters).forEach((key) => {
      if (_.get(options, key)) {
        formattedValue = formatters[key](value);
      }
    });

    if (!isDisable) field.onChange(formattedValue);
  };

  const onClearInput = () => {
    clearableAction?.();
    field.onChange('');
    // field.
  };

  // @ts-ignore
  return (
    <View
      pointerEvents={_.get(options, 'pointerEvents')}
      style={[styles.container, _.get(styleCustom, 'container')]}
    >
      {!!label && (
        <TouchableOpacity
          style={[styles.bottomLabel, _.get(styleCustom, 'labelContainer')]}
          activeOpacity={1}
          onPress={Keyboard.dismiss}
        >
          <Text
            numberOfLines={1}
            type={TEXT_UI.TEXT_SMALL}
            style={[styles.textLabel, _.get(styleCustom, 'label')]}
          >
            {label}
            {get(options, 'subLabel', '')}
          </Text>
        </TouchableOpacity>
      )}

      <View
        style={[
          isSearchStatus &&
            !_.get(options, 'isMinimal') &&
            styles.searchContainer,
          _.get(styleCustom, 'wrapInput'),
        ]}
      >
        <ViewAnim
          transition={'width'}
          style={[
            styles.containerInput,
            isSearchStatus && isViewSearch && styles.searchView,
            isError && _.size(errMsg) > 0 && borderError && styles.borderError,
            isDisable && styles.containerInputDisabled,
            style,
          ]}
        >
          {!!placeHolder && !label && (
            <ViewAnim
              style={[
                styles.placeHolderStyle,
                sizeInput > 0 && styles.hideView,
                get(styleCustom, 'placeHolder'),
              ]}
              transition="opacity"
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.smallText,
                  styles.opacityPlaceHolder,
                  _.get(styleCustom, 'placeHolderText'),
                ]}
              >
                {placeHolder}
              </Text>
            </ViewAnim>
          )}

          {leftView}

          <TextInput
            onBlur={onBlurFocus(false)}
            onFocus={onBlurFocus(true)}
            value={field.value}
            onChangeText={onChangeText}
            multiline={multiline}
            {...props}
            {...(isDisable ? { selection: { start: 0 } } : null)}
            keyboardAppearance={themeMode as 'light' | 'dark' | 'default'}
            autoCorrect={false}
            spellCheck={false}
            cursorColor={colors.TEXT_BRAND}
            selectionColor={colors.TEXT_BRAND}
            ref={!isDisable ? field.ref : null}
            style={[
              textDefault,
              styles.textInput,
              isDisable && styles.fontDisable,
              get(styleCustom, 'inputText'),
            ]}
            editable={!isDisable}
            underlineColorAndroid="transparent"
            placeholderTextColor={colors.TEXT_SUBTLEST}
          />

          {isSearchStatus ? (
            <TouchableOpacity
              onPress={
                _.size(field.value) > 0
                  ? onClearSearch
                  : _.get(options, 'rightCustom.onPress')
              }
            >
              <Icon
                style={styles.paddSearch}
                name={
                  _.size(field.value) > 0
                    ? 'app_close'
                    : _.get(options, 'rightCustom.icon', 'app_search_left')
                }
                size={width(6)}
                color={colors.ICON_SUBTLE}
              />
            </TouchableOpacity>
          ) : (
            get(options, 'rightView') ||
            (get(options, 'rightCustom') && (
              <TouchableOpacity
                activeOpacity={1}
                onPress={get(options, 'rightCustom.onPress')}
              >
                {get(options, 'rightCustom.icon')}
              </TouchableOpacity>
            ))
          )}
          {clearable && sizeInput ? (
            <TouchableOpacity onPress={onClearInput}>
              <Icon name="app_close" />
            </TouchableOpacity>
          ) : null}
          {
            get(options, 'endView') //&& get(options, 'endView')
          }
        </ViewAnim>
        {isSearchStatus && !get(options, 'isMinimal') && isViewSearch && (
          <TouchableOpacityAnim
            duration={300}
            animation={'fadeIn'}
            onPress={onCancelSearch}
          >
            <Text style={styles.fontCancel}>{convertLang('cancel')}</Text>
          </TouchableOpacityAnim>
        )}
      </View>
      {isError && _.size(errMsg) > 0 && (
        <Callout
          type={CalloutType.Error}
          customStyle={{
            container: [
              styles.lineError,
              style?.width && { width: style?.width },
            ],
          }}
          description={errMsg}
        />
        // <LineError style={[styles.lineError, style?.width && {width: style?.width}]} textStyle={styles.textErrorStyle} message={errMsg} />
      )}

      {/* {get(options, 'max') && <Text style={styles.fontCountdown}>{`${size(field.value)}/${get(options, 'max')}`}</Text>} */}
    </View>
  );
};

const paddingLabel = width(3);

const styleInput = {
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width(90),
    flexDirection: 'row',
  },
  fontDisable: {
    color: 'GRAY6',
  },
  fontCountdown: {
    fontSize: width(3.5),
    color: 'GRAY5',
  },
  searchView: {
    width: width(75),
  },
  fontCancel: {
    color: 'YELLOW',
  },
  containerInput: {
    backgroundColor: COLORS.FIELD_BACKGROUND,
    paddingLeft: width(2),
    paddingRight: width(4),
    borderRadius: EBorderSize.small,
    // overflow: 'hidden',
    width: width(90),
    height: width(12),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  containerInputDisabled: {
    backgroundColor: COLORS.FIELD_BACKGROUND_DISABLED,
  },
  paddSearch: {
    left: width(2),
  },
  paddingSearch: {
    left: width(10),
  },
  opacityPlaceHolder: {
    color: COLORS.TEXT_SUBTLE,
    maxWidth: width(65),
  },
  smallText: {
    fontSize: width(3.5),
  },
  hideView: {
    opacity: 0,
  },
  textInput: {
    height: height(6.5),
    color: 'TEXT',
    flex: 1,
    paddingVertical: 0,
    marginLeft: width(ios ? 1 : 0),
    marginRight: width(2),
  },
  placeHolderStyle: {
    left: paddingLabel,
    color: 'GRAY6',
    position: 'absolute',
    alignItems: 'flex-start',
  },
  borderError: {
    borderWidth: convertPxToPt(0.6),
    borderColor: 'RED',
  },
  borderYellow: {
    borderWidth: convertPxToPt(0.6),
    borderColor: 'YELLOW',
  },
  bottomLabel: {
    marginBottom: width(2),
  },
  textLabel: {
    // marginLeft: paddingLabel,
    color: COLORS.TEXT_LABEL_1,
  },
  container: {
    alignSelf: 'center',
  },
  lineError: {
    marginTop: height(0.5),
  },
  textErrorStyle: {
    fontSize: FONTS_SIZE.fontSize162,
  },
};

export default Input;
