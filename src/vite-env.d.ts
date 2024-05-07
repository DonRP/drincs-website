/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LOGTAIL_WEBSITE_KEY: string
    readonly VITE_FIREBASE_WEBSITE_APIKEY: string
    readonly VITE_FIREBASE_WEBSITE_AUTHDOMAIN: string
    readonly VITE_FIREBASE_WEBSITE_PROJECTID: string
    readonly VITE_FIREBASE_WEBSITE_STORAGEBUCKET: string
    readonly VITE_FIREBASE_WEBSITE_MESSAGINGSENDERID: string
    readonly VITE_FIREBASE_WEBSITE_APPID: string
    readonly VITE_FIREBASE_WEBSITE_MEASUREMENTID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
