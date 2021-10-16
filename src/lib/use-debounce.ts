import { Dispatch, SetStateAction, useCallback, useState } from "react";

export function useDebounceState<S = undefined>(
  initialState: S | (() => S),
  timeout: number = 3000
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState<S>(initialState);
  const setter = debounce(setState, timeout);
  return [state, setter];
}

export function useDebounceCallback(callback: (...args: any[]) => void, timeout: number) {
  return useCallback(debounce(callback, timeout), [timeout]);
}

export function debounce(callback: (...args: any[]) => void, timeout: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return (...args: typeof callback.arguments) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => callback(...args), timeout);
  };
}