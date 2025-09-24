import React, { type FC, type PropsWithChildren } from 'react';
import useStyles, { TEXT_TITLE, TEXT_UI } from '../Styles';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ThemeContext = React.createContext({
  useTheme: <T = any,>(
    _: string,
    styles?: StyleSheet.NamedStyles<any> | any
  ): T => {
    return styles as T;
  },
  getThemeMode: (_: string): Record<string, any> => {
    return {};
  },
  textUI: (_key: TEXT_UI): Record<string, any> => {
    return {};
  },
  textTitle: (_key: TEXT_TITLE): Record<string, any> => {
    return {};
  },
  textDefault: (): Record<string, any> => {
    return {};
  },
  themeMode: 'dark',
});

export const ThemeProvider: FC<
  PropsWithChildren<{
    themeMode?: string;
    language?: Function;
  }>
> = ({ themeMode, language, children }) => {
  const { createTheme, getTheme, textUI, textTitle, textDefault } =
    useStyles(themeMode);

  const useTheme = React.useCallback(
    <T = any,>(name: string, styles: StyleSheet.NamedStyles<any> | any): T => {
      const createdStyles = createTheme(styles, name);
      return createdStyles as typeof styles;
    },
    [createTheme]
  );
  const convertLang = (key: string, params?: any) =>
    language ? language(key, params) : key;

  const getThemeMode = React.useCallback(
    (name: string) => {
      return getTheme(name);
    },
    [getTheme]
  );

  const value = React.useMemo(
    () => ({
      useTheme,
      getThemeMode,
      textUI,
      textTitle,
      textDefault,
      convertLang,
      themeMode: themeMode || 'dark',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [useTheme, getThemeMode, textUI, textTitle, textDefault, themeMode]
  );
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </GestureHandlerRootView>
  );
};

export const useThemeContext = () => React.useContext(ThemeContext);
