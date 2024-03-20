import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import './App.css';

type SupportedLanguages = "en" | "it" | "es" | "fr" | "zh"
const supportedLanguages: SupportedLanguages[] = ["en", "it", "es", "fr", "zh"];

type Resurce = {
  translation: object
  server_response: object
}

type Resurces = {
  it: Resurce
  en: Resurce
  es: Resurce
  fr: Resurce
  zh: Resurce
}

const getResurces = () => {
  try {
    let resources: Resurces = {
      en: require('../src/values/translations/strings_en.json') as Resurce,
      it: require('../src/values/translations/strings_it.json') as Resurce,
      es: require('../src/values/translations/strings_es.json') as Resurce,
      fr: require('../src/values/translations/strings_fr.json') as Resurce,
      zh: require('../src/values/translations/strings_zh.json') as Resurce,
    }
    return resources
  }
  catch (error) {
    return {}
  }
}

const getUserLang = (): SupportedLanguages => {
  let userLang: string = navigator.language || "en";
  userLang = userLang?.toLocaleLowerCase()?.split("-")[0];
  if (!supportedLanguages.includes(userLang as SupportedLanguages)) {
    userLang = "en";
  }
  return userLang as SupportedLanguages
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