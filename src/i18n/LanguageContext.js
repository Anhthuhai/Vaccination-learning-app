// Context quản lý ngôn ngữ toàn app + lưu lựa chọn bằng AsyncStorage
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from './translations';

const STORAGE_KEY = '@app_language';
const DEFAULT_LANG = 'vi';

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  toggleLang: () => {},
  t: (key) => key,
  ready: false,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);
  const [ready, setReady] = useState(false);

  // Nạp ngôn ngữ đã lưu khi mở app
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'vi' || saved === 'en') {
          setLangState(saved);
        }
      } catch (e) {
        // bỏ qua, dùng mặc định
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const setLang = useCallback((next) => {
    if (next !== 'vi' && next !== 'en') return;
    setLangState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'vi' ? 'en' : 'vi';
      AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
      return next;
    });
  }, []);

  // Hàm dịch: trả về chuỗi theo ngôn ngữ hiện tại, fallback về tiếng Việt rồi về chính key
  const t = useCallback(
    (key) => {
      const dict = translations[lang] || translations[DEFAULT_LANG];
      return dict[key] ?? translations[DEFAULT_LANG][key] ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, ready }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
