import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import strings_en from '../src/values/translations/strings_en.json';
import strings_es from '../src/values/translations/strings_es.json';
import strings_fr from '../src/values/translations/strings_fr.json';
import strings_it from '../src/values/translations/strings_it.json';
import strings_zh from '../src/values/translations/strings_zh.json';

const getResurces = () => {
    return {
        it: strings_it,
        en: strings_en,
        es: strings_es,
        fr: strings_fr,
        zh: strings_zh,
    }
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
        i18n
            .use(LanguageDetector)
            .use(initReactI18next)
            .init({
                debug: false,
                fallbackLng: 'en',
                lng: getUserLang(),
                interpolation: {
                    escapeValue: false,
                },
                resources: getResurces()
            });
    }
}
