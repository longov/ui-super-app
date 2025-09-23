/**
 * @fileoverview Custom Text component with animation and interaction support
 * @module Common/Layout/V2/Text
 */

import { type FC, useRef } from 'react';
import {
  type GestureResponderEvent,
  Text as TextNative,
  type TextProps,
  View,
} from 'react-native';

// @ts-ignore
import cFunctions from '@coin98/common';
import { TEXT_TITLE, TEXT_UI, useThemeContext } from 'react-native-ui-lib-js';
import { EText } from '../Styles/Colors';
import _ from 'lodash';
import formatBillion from '../utils/formatBillion';

const numberAfterDot = 3;

const scientificToDecimalString = (value: number | string): string => {
  // Convert to number if string was provided
  const num = typeof value === 'string' ? parseFloat(value) : value;

  // For regular numbers or zero, just return string representation
  if (num === 0 || (num >= 0.001 && num < 1e21)) {
    return num.toString();
  }

  // For small numbers (scientific notation with negative exponent)
  if (num < 0.001) {
    // Convert to string and split by 'e'
    const [mantissa, exponent] = num.toExponential().split('e');
    const exponentValue = parseInt(exponent ?? '', 10);

    if (exponentValue < 0) {
      // Remove decimal point from mantissa
      const mantissaWithoutDecimal = mantissa?.replace('.', '');

      // Calculate leading zeros needed
      const absExponent = Math.abs(exponentValue);

      // Construct the final decimal string
      return '0.' + '0'.repeat(absExponent - 1) + mantissaWithoutDecimal;
    }
  }

  // For large numbers, handle differently
  return num.toString();
};

/**
 * Enhanced text component with styling, animation and interaction capabilities
 * @component
 * @param {Props} props - Component properties
 * @returns {JSX.Element} Rendered text component
 */

/**
 * Formats a small number to display in format "0.0 n digits"
 * Example: 0.0000000123 -> "0.0 7 123"
 * @param value Number to format
 * @returns Formatted string
 */
const formatSmallNumber = (
  value: number
): {
  prefixNum: string;
  zeroCount: number;
  significantDigits: string;
} => {
  const stringValue = scientificToDecimalString(value);
  const decimalPart = stringValue.split('.')[1] ?? '';
  const integerPart = stringValue.split('.')[0] ?? '';

  // Count leading zeros after the decimal point
  let zeroCount = 0;
  for (let i = 0; i < decimalPart.length; i++) {
    if (decimalPart[i] === '0') {
      zeroCount++;
    } else {
      break;
    }
  }

  const significantDigits = decimalPart
    .substring(zeroCount)
    .slice(0, numberAfterDot);

  // Extract significant digits
  return {
    prefixNum: `${cFunctions.formatNumberBro(integerPart)}${zeroCount ? '.0' : '.'}`,
    zeroCount: zeroCount,
    significantDigits: significantDigits,
  };
};

/**
 * Props for the Text component
 * @interface Props
 * @extends {TextProps} Native Text component props
 */
interface Props extends TextProps {
  /** Handler for double press events */
  onDoublePress?: null | ((event: GestureResponderEvent) => void);
  /** Whether to use animated text component */
  animation?: boolean;
  /** Predefined text style type */
  type?: TEXT_TITLE | TEXT_UI;
  /** Text color from theme */
  color?: EText;
  /** Value to render */
  value: number;
  /** render fiat */
  isFiat?: boolean;

  prefix?: string;

  postfix?: string;

  //forSwap or format number only, it will remove K
  isFormatOnly?: boolean;
  // show min number after dot
  minNumber?: number;
  isAmount?: boolean;

  numberShowCalculated?: number;
}

const PriceRender: FC<Props> = ({
  onPress,
  onDoublePress,
  type,
  isFiat,
  postfix,
  color = EText.TEXT,
  prefix,
  numberShowCalculated = 10,
  isAmount,
  ...props
}) => {
  const { textDefault, textTitle, textUI, getThemeMode } = useThemeContext();
  const timerRef = useRef<number>(0);
  const colors = getThemeMode('color');
  const _minNumber = _.get(props, 'minNumber', 4);
  const styleBase = type
    ? Object.values(TEXT_TITLE).includes(type as TEXT_TITLE)
      ? textTitle(type as TEXT_TITLE)
      : Object.values(TEXT_UI).includes(type as TEXT_UI)
        ? textUI(type as TEXT_UI)
        : textDefault()
    : textDefault();

  // @ts-ignore

  const value = props.value;
  styleBase.color = colors[color];

  /** Component to render based on animation prop */
  const TextComponentRender = TextNative;

  /**
   * Handles press events and detects double presses within 300ms
   * @param {GestureResponderEvent} e - Press event object
   */
  const _onPress = (e: GestureResponderEvent) => {
    const now = Date.now();

    if (timerRef.current && now - timerRef.current < 300) {
      onDoublePress?.(e);
      timerRef.current = now;
      return;
    }

    timerRef.current = now;
    onPress?.(e);
  };

  const { prefixNum, zeroCount, significantDigits } = formatSmallNumber(value);
  if (props.value > 0.000001 || !props.value || zeroCount < 4) {
    const numberInput = props.value.toString().split('.');
    const afterDot = numberInput[1] ?? '';
    const numberBeforeDot = _.size(numberInput[0]);
    const numberAfterDot = _.size(afterDot);
    let i = 0;
    for (i = 0; i < numberAfterDot; i++) {
      // if (i > numberAfterDot || (afterDot[i] === '0' && afterDot[i + 1] !== '0') || afterDot[i] !== '0') {
      if (
        i > numberAfterDot ||
        (afterDot[i] === '0' && afterDot[i + 1] !== '0') ||
        (Number(props.value) >= 1 && afterDot[i] !== '0')
      ) {
        break;
      }
    }

    const numberShow = Math.max(
      2,
      Math.min(i + _minNumber, numberShowCalculated - numberBeforeDot)
    );
    //for case format number only, remove format number K
    if (Number(props.value) >= 1) {
      return (
        <TextComponentRender
          {...props}
          onPress={onPress ? _onPress : undefined}
          allowFontScaling={false}
          style={[styleBase, props.style]}
        >
          {prefix}
          {formatBillion(
            props.value,
            Math.min(_minNumber, numberShow),
            isAmount
          )}
          {postfix}
        </TextComponentRender>
      );
    }

    return (
      <TextComponentRender
        {...props}
        onPress={onPress ? _onPress : undefined}
        allowFontScaling={false}
        style={[styleBase, props.style]}
      >
        {prefix}
        {cFunctions.formatNumberBro(props.value, isFiat ? numberShow : 8)}
        {postfix}
      </TextComponentRender>
    );
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <TextComponentRender
        {...props}
        onPress={onPress ? _onPress : undefined}
        allowFontScaling={false}
        style={[styleBase, props.style]}
      >
        {prefix}
        {prefixNum}
      </TextComponentRender>
      {!!zeroCount && (
        <TextComponentRender
          {...props}
          onPress={onPress ? _onPress : undefined}
          allowFontScaling={false}
          style={[
            styleBase,
            props.style,
            {
              // @ts-ignore
              marginTop: styleBase.fontSize * 0.4,
              transform: [{ scale: 0.75 }],
            },
          ]}
        >
          {zeroCount}
        </TextComponentRender>
      )}
      <TextComponentRender
        {...props}
        onPress={onPress ? _onPress : undefined}
        allowFontScaling={false}
        style={[styleBase, props.style]}
      >
        {significantDigits}
        {postfix}
      </TextComponentRender>
    </View>
  );
};

export default PriceRender;
