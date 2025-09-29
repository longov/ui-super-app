import {useState, useEffect} from 'react'
import {Keyboard} from 'react-native'

export const useKeyboard = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardStatus(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
      setKeyboardHeight(0);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    }
  }, []);
  return { keyboardStatus, keyboardHeight };
}