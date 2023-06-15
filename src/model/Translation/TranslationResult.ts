export class TranslationResult {
    list: TranslationResultItem[] = [];
    name: string | undefined = undefined;
    logo: string | undefined = undefined;
    description: string | undefined = undefined;
    crowdinLink: string | undefined = undefined;
}

export interface TranslationResultItem {
    id: number
    translated: number
    approved: number
    release: GitHubTranslationRelease | null
    targetLanguages: TargetLanguages | null
}

export class GitHubTranslationRelease {
    version: string = "";
    language: string = "";
    downloadUrl: string = "";
    date: string = "";
}

export class TargetLanguages {
    id: string = "";
    name: string = "";
    editorCode: string = "";
    twoLettersCode: string = "";
    threeLettersCode: string = "";
    locale: string = "";
    androidCode: string = "";
    osxCode: string = "";
    osxLocale: string = "";
    pluralCategoryNames: string[] = [];
    pluralRules: string = "";
    pluralExamples: string[] = [];
    textDirection: string = "";
    dialectOf: any;
}