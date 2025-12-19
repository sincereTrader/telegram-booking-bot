import { useAppState as useAppStateContext } from '../context/AppContext';

export function useAppState() {
  return useAppStateContext();
}

