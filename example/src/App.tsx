import { StyleSheet, View } from 'react-native';
import { GlobalProvider, ThemeProvider } from 'react-native-ui-lib-js';
import Test from './Component';

// const result = multiply(3, 7);

export default function App() {
  return (
    <ThemeProvider themeMode={'light'}>
      <View style={styles.container}>
        <GlobalProvider>
          <Test />
        </GlobalProvider>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
