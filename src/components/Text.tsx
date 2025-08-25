/**
 * @fileoverview Custom Text component with animation and interaction support
 * @module Common/Layout/V2/Text
 */

import { type FC, useRef } from 'react';
import {
  type GestureResponderEvent,
  Text as TextNative,
  type TextProps,
} from 'react-native';
import { TEXT_TITLE, TEXT_UI } from '../Styles';
import { Text as TextAnim } from 'react-native-animatable';
import { EText } from '../Styles/Colors';
import { useThemeContext } from '../context/ThemeContext';

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
  color?: EText | string;
}

/**
 * Enhanced text component with styling, animation and interaction capabilities
 * @component
 * @param {Props} props - Component properties
 * @returns {JSX.Element} Rendered text component
 */
const TextComponent: FC<Props> = ({
  onPress,
  onDoublePress,
  type,
  color = EText.TEXT,
  ...props
}) => {
  const { textTitle, textUI, getThemeMode, textDefault } = useThemeContext();
  const timerRef = useRef<number>(0);
  const colors = getThemeMode('color');

  const styleBase = type
    ? Object.values(TEXT_TITLE).includes(type as TEXT_TITLE)
      ? textTitle(type as TEXT_TITLE)
      : Object.values(TEXT_UI).includes(type as TEXT_UI)
        ? textUI(type as TEXT_UI)
        : textDefault()
    : textDefault();

  // @ts-ignore
  styleBase.color = colors[color];

  /** Component to render based on animation prop */
  const TextComponentRender = (props.animation ? TextAnim : TextNative) as any;

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

  return (
    <TextComponentRender
      {...props}
      onPress={onPress ? _onPress : undefined}
      allowFontScaling={false}
      style={[styleBase, props.style]}
    >
      {props.children}
    </TextComponentRender>
  );
};

export default TextComponent;
