import { useEffect, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

const useAppState = (): AppStateStatus | undefined => {
  const [state, setState] = useState<AppStateStatus | undefined>(
    AppState.currentState
  );

  useEffect(() => {
    const listener = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        setState(nextAppState);
      }
    );

    return () => {
      listener.remove();
    };
  }, []);

  return state;
};

export const useAppStateRecover = (func: () => void) => {
  useEffect(() => {
    const listener = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        func();
      }
    });

    return () => {
      listener.remove();
    };
  }, [func]);

  return;
};

export const getCurrentAppState = () => AppState.currentState;

export const isAppActiveState = () => AppState.currentState === 'active';

export default useAppState;
