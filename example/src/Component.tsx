import { View } from 'react-native';
import { Button, Input, Text, useGlobalContext } from 'react-native-ui-lib-js';
import { useForm } from 'react-hook-form';

const Test = () => {
  const { showAlert, openSheet, showToast } = useGlobalContext();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
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
    <View>
      <Button onPress={onPress} title={'show Alert'} />
      <Input
        options={{
          isSearch: true,
        }}
        control={control}
        name={'name'}
      />
    </View>
  );
};

export default Test;
