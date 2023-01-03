export interface TranslationResult {
    list: TranslationResultItem[];
    name: string | null;
    logo: string | null;
    description: string | null;
}

export interface TranslationResultItem {
    id: number;
    translated: number;
    approved: number;
    release: GitHubTranslationRelease | null;
    targetLanguages: TargetLanguages | null;
}

export interface GitHubTranslationRelease {
    version: string;
    language: string;
    downloadUrl: string;
    date: string;
}

export interface TargetLanguages {
    id: string;
    name: string;
    editorCode: string;
    twoLettersCode: string;
    threeLettersCode: string;
    locale: string;
    androidCode: string;
    osxCode: string;
    osxLocale: string;
    pluralCategoryNames: string[];
    pluralRules: string;
    pluralExamples: string[];
    textDirection: string;
    dialectOf: any;
}