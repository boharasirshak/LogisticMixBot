import { useEffect, useState } from 'react'
import type { TelegramWebApps } from 'telegram-webapps-types'

interface TelegramData {
  colorSchema: string;
  isExpanded: boolean;
  themeParams: TelegramWebApps.ThemeParams;
  mainButton: TelegramWebApps.MainButton;
}

interface TelegramFunctions {
  close: () => void
  expand: () => void
  onEvent: (eventType: TelegramWebApps.EventType, eventHandler: Function) => void
  sendData: (data: any) => void
}

export function getTelegramInitData(): TelegramWebApps.WebAppInitData {
  const [data, setData] = useState<TelegramWebApps.WebAppInitData>({})

  useEffect(() => {
    const firstLayerInitData = Object.fromEntries(
      new URLSearchParams(window.Telegram.WebApp.initData)
    );

    const initData: Record<string, string> = {};

    for (const key in firstLayerInitData) {
      try {
        initData[key] = JSON.parse(firstLayerInitData[key]);
      } catch {
        initData[key] = firstLayerInitData[key];
      }
    }

    setData(initData);
  }, []);

  return data;
}

export function getTelegramData (): TelegramData | undefined {
  const [data, setData] = useState<TelegramData>();

  useEffect(() => {
    const colorSchema = window.Telegram.WebApp.colorScheme;
    const isExpanded = window.Telegram.WebApp.isExpanded;
    const themeParams = window.Telegram.WebApp.themeParams;
    const mainButton = window.Telegram.WebApp.MainButton;
    setData({ colorSchema, isExpanded, themeParams, mainButton });
  }, []);

  return data;
}

export function getTelegramFunctions (): TelegramFunctions | undefined {
  const [data, setData] = useState<TelegramFunctions>();

  useEffect(() => {
    const close = window.Telegram.WebApp.close;
    const expand = window.Telegram.WebApp.expand;
    const onEvent = window.Telegram.WebApp.onEvent;
    const sendData = window.Telegram.WebApp.sendData;
    setData({ close, expand, onEvent, sendData });
  }, []);
  
  return data;
}
