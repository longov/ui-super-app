import { View } from 'react-native';
import { Button, Input, useGlobalContext } from 'react-native-ui-lib-js';
import { useForm } from 'react-hook-form';
import WebView from 'react-native-webview';

const Test = () => {
  const { showToast } = useGlobalContext();

  const { control } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: 'John Doe',
    },
  });

  const onPress = () => {
    // showAlert('Hello world1 313 131313213 13 13123 /n /n /n \n ]n', {
    //   type: 'success',
    //   title: 'Success',
    // });
    // openSheet(
    //   <View>
    //     <Text>123123123</Text>
    //   </View>
    // );
    showToast('Hello world1 313 131313213 13 13123 /n /n /n \n ]n', {
      type: 'success',
      autoClose: true,
    });
  };

  return (
    <WebView
      style={{
        flex: 1,
      }}
      source={{ uri: 'https://expo.dev' }}
    />
  );
};

export default Test;
