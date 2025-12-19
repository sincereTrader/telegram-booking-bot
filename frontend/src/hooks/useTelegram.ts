import { useEffect } from 'react';
import { WebApp } from '@twa-dev/sdk';

export function useTelegram() {
  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  return {
    WebApp,
    user: WebApp.initDataUnsafe?.user,
    themeParams: WebApp.themeParams,
    sendData: (data: string) => WebApp.sendData(data),
    showAlert: (message: string) => WebApp.showAlert(message),
    showConfirm: (message: string) => WebApp.showConfirm(message),
    close: () => WebApp.close(),
  };
}

