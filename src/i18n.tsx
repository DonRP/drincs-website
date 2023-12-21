import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import './App.css';

type Resurce = {
  translation: object
  server_response: object
}

type Resurces = {
  it: Resurce
  en: Resurce
}

const getResurces = () => {
  let resources: Resurces = {
    en: require('../src/values/translations/strings_en.json') as Resurce,
    it: require('../src/values/translations/strings_it.json') as Resurce,
  }
  return resources
}

const getUserLang = (): string => {
  let userLang: string = navigator.language || "en";
  return userLang?.toLocaleLowerCase()?.split("-")[0];
}

export const translate = (key: string) => {
  let resources: any = getResurces()
  let userLang = getUserLang()
  try {
    let translation = resources[userLang]?.translation
    return translation[key] || key
  } catch (error) {
    return key
  }
}

export const useI18n = () => {
  if (!i18n.isInitialized) {
    let resources = getResurces()

    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        // we init with resources
        resources: resources,
        fallbackLng: getUserLang(),
        debug: false,

        keySeparator: false, // we use content as keys

        interpolation: {
          escapeValue: false
        }
      })
  }
}