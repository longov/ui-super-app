import { type FC, type ReactNode, useState } from 'react';
import { Pressable, StyleSheet, type TextStyle } from 'react-native';
import { TEXT_UI } from '../Styles';
import { convertPxToPt, width } from '../Styles/utils';
import { EButtonColor } from '../Styles/Colors';
import LottieView from 'lottie-react-native';
import images from '../images';
import EBorderSize from '../Styles/borderSize';
import Text from './Text';
import { useThemeContext } from '../context/ThemeContext';

/** Button height measurements in PT units */
enum ButtonSize {
  tiny = convertPxToPt(24),
  xSmall = convertPxToPt(32),
  small = convertPxToPt(40),
  medium = convertPxToPt(48),
  large = convertPxToPt(56),
}

/** Icon size measurements in PT units */
enum IconSize {
  tiny = convertPxToPt(4),
  xSmall = convertPxToPt(8),
  small = convertPxToPt(16),
  medium = convertPxToPt(20),
  large = convertPxToPt(24),
}

/** Spacing measurements between button elements in PT units */
enum GapSize {
  tiny = convertPxToPt(4),
  xSmall = convertPxToPt(6),
  small = convertPxToPt(8),
  medium = convertPxToPt(8),
  large = convertPxToPt(8),
}

/** Text size variants mapped to TEXT_UI constants */
enum FontSize {
  tiny = TEXT_UI.TEXT_XSMALL_STRONG,
  xSmall = TEXT_UI.TEXT_SMALL_STRONG,
  small = TEXT_UI.TEXT_MEDIUM_STRONG,
  medium = TEXT_UI.TEXT_LARGE_STRONG,
  large = TEXT_UI.TEXT_XLARGE_STRONG,
}

const TextColor = {
  default: {
    primary: EButtonColor.PRIMARY_TEXT,
    secondary: EButtonColor.SECONDARY_TEXT,
  },
  inverse: {
    primary: EButtonColor.DISABLE_INV_TEXT,
    secondary: EButtonColor.SECONDARY_INV_TEXT,
  },
  ghost: {
    primary: EButtonColor.GHOST_PRIMARY_TEXT,
    secondary: EButtonColor.GHOST_SECONDARY_TEXT,
  },
};
const ButtonColor = {
  default: {
    primary: EButtonColor.PRIMARY_FILL,
    secondary: EButtonColor.SECONDARY_FILL,
  },
  inverse: {
    primary: EButtonColor.DISABLE_INV_FILL,
    secondary: EButtonColor.SECONDARY_INV_FILL,
  },
  ghost: {
    primary: EButtonColor.GHOST_PRIMARY_FILL,
    secondary: EButtonColor.GHOST_SECONDARY_FILL,
  },
};

const TextColorDisabled = {
  default: EButtonColor.DISABLE_TEXT,
  inverse: EButtonColor.DISABLE_INV_TEXT,
  ghost: EButtonColor.DISABLE_TEXT,
};

const ButtonColorDisabled = {
  default: EButtonColor.DISABLE_FILL,
  inverse: EButtonColor.DISABLE_INV_FILL,
  ghost: EButtonColor.GHOST_PRIMARY_FILL,
};

const ButtonColorActive = {
  default: {
    primary: EButtonColor.PRIMARY_FILL_ACTIVE,
    secondary: EButtonColor.SECONDARY_FILL_ACTIVE,
  },
  inverse: {
    primary: EButtonColor.SECONDARY_INV_FILL_ACTIVE,
    secondary: EButtonColor.SECONDARY_INV_FILL_ACTIVE,
  },
  ghost: {
    primary: EButtonColor.GHOST_PRIMARY_FILL_ACTIVE,
    secondary: EButtonColor.GHOST_SECONDARY_FILL_ACTIVE,
  },
};

/** Available button size variants */
type Size = keyof typeof ButtonSize;
/** Button importance level variants */
type Level = 'primary' | 'secondary';
/** Button style variants */
type Kind = 'default' | 'inverse' | 'ghost';

/**
 * Props for Button component
 */
interface ButtonProps {
  /** Button text content */
  title?: string;
  /** Size variant from ButtonSize enum */
  size?: Size;
  /** Whether to show loading animation */
  loading?: boolean;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Visual importance level */
  level?: Level;
  /** Visual style variant */
  kind?: Kind;
  /** Whether button is part of a group */
  isGroup?: boolean;
  /** Icon name to show before title */
  prefixComponent?: ReactNode;
  /** Icon name to show after title */
  endComponent?: string;
  /** Custom button width override */
  widthSize?: number;
  /** Custom button height override */
  height?: number;
  /** Disable Press Behavior on Press */
  disabledPressBehavior?: boolean;
  /** Button press handler */
  onPress: any;

  /** Additional custom styles */
  style?: object;

  /** Additional custom styles */
  textStyle?: StyleSheet.NamedStyles<TextStyle>;
}

/**
 * A customizable button component that supports different sizes, styles and states
 * @component
 * @example
 * <Button
 *   title="Submit"
 *   size="medium"
 *   level="primary"
 *   onPress={() => console.log('Pressed')}
 * />
 */
const Button: FC<ButtonProps> = ({
  title,
  size = 'medium',
  loading = false,
  disabled = false,
  level = 'primary',
  kind = 'default',
  prefixComponent,
  endComponent,
  disabledPressBehavior,
  widthSize = width(90),
  height,
  style,
  textStyle: textSt,
  onPress,
}) => {
  const { useTheme, getThemeMode, textUI } = useThemeContext();
  const Colors = getThemeMode('color');
  const styles = useTheme('Button', _style);
  const sizeButton = ButtonSize[size];
  // const borderSize = BorderSize[size]
  const gapSize = GapSize[size];
  const fontType = FontSize[size] as unknown as TEXT_UI;
  const _textStyles = textUI(fontType);

  // const iconSize = textUI

  const [isPressed, setIsPressed] = useState(false);

  const buttonStyle = {
    height:
      widthSize <= convertPxToPt(32)
        ? convertPxToPt(32)
        : height
          ? height
          : sizeButton,
    borderRadius: EBorderSize.circle,
    gap: gapSize,
    width: widthSize,
    backgroundColor: disabled
      ? Colors[ButtonColorDisabled[kind]]
      : Colors[ButtonColor[kind][level]],
  };

  const buttonColorActive = Colors[ButtonColorActive[kind][level]];
  const textStyles = {
    // fontSize: fontSize,
    ..._textStyles,
    color: disabled
      ? Colors[TextColorDisabled[kind]]
      : Colors[TextColor[kind][level]],
  };
  const iconSize = IconSize[size];

  const onPressButton = () => {
    if (disabled) return;
    onPress && onPress();
  };
  const onPressAction = (action: boolean) => () => {
    if (disabledPressBehavior) return;
    setIsPressed(action);
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <Pressable
      onPress={onPressButton}
      disabled={disabled}
      onPressIn={onPressAction(true)}
      onPressOut={onPressAction(false)}
      style={[
        styles.buttonContainer,
        buttonStyle,
        isPressed && { backgroundColor: buttonColorActive },
        style,
      ]}
    >
      {loading ? (
        <LottieView
          style={{
            width: iconSize * 1.5,
            height: iconSize * 1.5,
          }}
          source={images.subLoading}
          autoPlay
          loop
        />
      ) : (
        <>
          {
            prefixComponent && prefixComponent
            // <Icon
            //   name={prefixIcon}
            //   size={iconSize}
            //   color={textSt?.color ? textSt.color : textStyles.color}
            // />
          }
          {title && (
            // @ts-ignore
            <Text type={TEXT_UI.TEXT_LARGE_STRONG} style={[textStyles, textSt]}>
              {title}
            </Text>
          )}
          {
            endComponent && endComponent
            // <Icon
            //   name={endIcon}
            //   size={iconSize}
            //   color={textSt?.color ? textSt.color : textStyles.color}
            // />
          }
        </>
      )}
      {/*{get(options, 'icon') && <View style={[styles.paddingIcon, get(options, 'iconStyle')]}>{get(options, 'icon')}</View>}*/}
    </Pressable>
  );
};

export default Button;

const _style = StyleSheet.create({
  buttonContainer: {
    width: width(90),
    flexDirection: 'row',
    justifyContent: 'center',
    // marginBottom: GapSize.medium,
    alignItems: 'center',
  },
  buttonPrimary: {},
  buttonInverse: {},
  buttonGhost: {},
});
