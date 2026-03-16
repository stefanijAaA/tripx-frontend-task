import { useSyncExternalStore } from 'react';

export const useLocalStorageItem = (key: string): string | null => {
  return useSyncExternalStore(
    () => () => {},
    () => localStorage.getItem(key),
    () => null,
  );
};
