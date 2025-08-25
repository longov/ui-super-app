import Button from './components/Button';
import Text from './components/Text';
import Input from './components/Input';

export function multiply(a: number, b: number): number {
  return a * b;
}

export * from './context/ThemeContext';
export * from './Styles';

export * from './context/GlobalContext';

export { Button, Text, Input };
