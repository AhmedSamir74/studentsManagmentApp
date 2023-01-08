import { useMemo } from 'react';
import { Platform } from 'react-native';

export const useStackAnimation = ():
  | 'card'
  | 'modal'
  | 'transparentModal'
  | undefined => {
  const animation = Platform.OS === 'android' ? 'transparentModal' : 'card';

  return useMemo(() => animation, [animation]);
};
