export class TranslationResult {
    list: TranslationResultItem[] = [];
    name: string | null = null;
    logo: string | null = null;
    description: string | null = null;
}

class TranslationResultItem {
    id: number = 0;
    translated: number = 0;
    approved: number = 0;
    release: GitHubTranslationRelease | null = null;
    targetLanguages: TargetLanguages | null = null;
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