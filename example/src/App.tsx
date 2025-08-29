import { StyleSheet, View } from 'react-native';
import { GlobalProvider, ThemeProvider } from 'react-native-ui-lib-js';
import Test from './Component';
import WebView from 'react-native-webview';

// const result = multiply(3, 7);

export default function App() {
  return (
    <WebView
      style={{
        flex: 1,
      }}
      source={{
        uri: 'https://dcscardcentre.web.apac-1.jumio.ai/web/client?baseUrl=https%3A%2F%2Fweb-sdk.apac-1.jumio.ai%2Fwebsdk%2Fv4%2Fapi&authorizationToken=eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_5XOTQoCMQyG4bt0bSBtkrZxN6gLYVb-4HKYadMTCAri3e3oCdx-PHy8L2fP4e62zieJnklEM0e3cXMpx9r3knMwLQwUQgW2tsDiOYOWGXNiMat15V9M2IxrEhDVjtPSMWECSy2IREQJ2vGj2T-8nKx1vd-dp9swjofLdB0uk0dPKhlX8CvtB1VahlRpBlaPPdIrcCxiQrxQEvf-AAko20fxAAAA.2tp_Bkko_bQg51t0EGrqC39BnDO_s5O-riQV-lJlZjU2aCQaTBuYyy5n6l_ZLQmjsLV6FTmlSdKQHrrukfJWdA&locale=en',
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
