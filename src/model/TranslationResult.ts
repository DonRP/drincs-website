export interface TranslationResult {
    list: TranslationResultItem[];
    name: string | null;
    logo: string | null;
    description: string | null;
}

interface TranslationResultItem {
    id: number;
    translated: number;
    approved: number;
    release: GitHubTranslationRelease | null;
    targetLanguages: TargetLanguages | null;
}

interface GitHubTranslationRelease {
    version: string;
    language: string;
    downloadUrl: string;
    date: string;
}

interface TargetLanguages {
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