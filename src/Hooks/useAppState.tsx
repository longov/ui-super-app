import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

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

export const useAppStateRecover = (func: () => void, deps: any[] = []) => {
  useEffect(() => {
    const listener = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        func();
      }
    });

    return () => {
      listener.remove();
    };
  }, deps);

  return;
};

export const getCurrentAppState = () => AppState.currentState;

export const isAppActiveState = () => AppState.currentState === 'active';

export default useAppState;
