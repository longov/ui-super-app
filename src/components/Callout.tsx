import { StyleSheet, View } from 'react-native';
import type { FC } from 'react';
import { useThemeContext } from '../context/ThemeContext';
import { TEXT_UI } from '../Styles';
import { ESpacing as SPACING } from '../Styles/spacing';
import { convertPxToPt, width } from '../Styles/utils';
import EBorderSize from '../Styles/borderSize';
import Text from './Text';
import Icon from './Icon';

export enum CalloutType {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Neutral = 'neutral',
}

interface ICustomStyle {
  container?: any;
  contentContainer?: any;
  textContainer?: any;
  title?: any;
  description?: any;
}

export interface ICalloutProps {
  title?: string;
  description: string | React.ReactNode;
  type: CalloutType;
  customStyle?: ICustomStyle;
  extendComponent?: any;
}

const Callout: FC<ICalloutProps> = ({
  title,
  description,
  type,
  customStyle,
  extendComponent,
}) => {
  const { useTheme, getThemeMode } = useThemeContext();
  const styles = useTheme('Callout', style);
  const Colors = getThemeMode('color');

  const typeIcon = {
    info: 'app_warning_solid',
    warning: 'ic-v2-signage-warning-solid-24',
  };

  let styleElement = {
    icon: typeIcon.info,
    iconColor: Colors.ICON_SUBTLE,
    backgroundColor: {
      backgroundColor: Colors.BACKGROUND_3,
      paddingVertical: title ? SPACING.space200 : SPACING.space75,
      paddingHorizontal: title ? SPACING.space200 : SPACING.space100,
    },
  };

  switch (type) {
    case CalloutType.Info: {
      styleElement.icon = typeIcon.info;
      styleElement.iconColor = Colors.ICON_INFORMATIVE;
      styleElement.backgroundColor.backgroundColor =
        Colors.BACKGROUND_INFORMATIVE;
      break;
    }
    case CalloutType.Warning: {
      styleElement.icon = typeIcon.warning;
      styleElement.iconColor = Colors.ICON_WARNING;
      styleElement.backgroundColor.backgroundColor = Colors.BACKGROUND_WARNING;
      break;
    }
    case CalloutType.Error: {
      styleElement.icon = typeIcon.warning;
      styleElement.iconColor = Colors.ICON_ERROR;
      styleElement.backgroundColor.backgroundColor = Colors.BACKGROUND_ERROR;
      break;
    }
    case CalloutType.Neutral: {
      styleElement.icon = typeIcon.info;
      styleElement.iconColor = Colors.ICON_SUBTLE;
      styleElement.backgroundColor.backgroundColor = Colors.BACKGROUND_3;
      break;
    }
  }

  return (
    <View
      style={[
        styles.container,
        styleElement.backgroundColor,
        customStyle?.container,
      ]}
    >
      <View style={[styles.contentContainer, customStyle?.contentContainer]}>
        <View style={styles.icon}>
          <Icon
            name={styleElement.icon}
            size={convertPxToPt(16)}
            color={styleElement.iconColor}
          />
        </View>

        <View style={[styles.textContainer, customStyle?.textContainer]}>
          {title && (
            <Text type={TEXT_UI.TEXT_REGULAR_STRONG} style={customStyle?.title}>
              {title}
            </Text>
          )}
          <Text type={TEXT_UI.TEXT_SMALL} style={customStyle?.description}>
            {description}
          </Text>
        </View>
      </View>
      {extendComponent && (
        <View style={styles.extendContainer}>{extendComponent}</View>
      )}
    </View>
  );
};

export default Callout;

/** Styles for the Callout component */
const style = StyleSheet.create({
  /** Main container style */
  container: {
    borderRadius: EBorderSize.small,
    width: width(90),
  },
  /** Content wrapper style */
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  /** Text container style */
  textContainer: {
    gap: SPACING.space50,
    marginLeft: SPACING.space100,
    marginRight: SPACING.space200,
  },
  /** Icon container style */
  icon: {
    marginTop: SPACING.space25,
  },
  /** Extended component container style */
  extendContainer: {
    marginTop: SPACING.space100,
    marginBottom: SPACING.space50,
    marginLeft: SPACING.space300,
  },
});
