import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './storeTypes';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { useState } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: string
): [string, (value: string) => void] => {
  const [state, setState] = useState<string>(() => {
    try {
      const value = window.localStorage.getItem(key);
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return value ? value : initialValue;
    } catch (err) {
      console.log(err);
      return '';
    }
  });

  const setValue = (value: string) => {
    try {
      window.localStorage.setItem(key, value);
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
};
