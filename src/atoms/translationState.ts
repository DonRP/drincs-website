import { ProjectsEnum } from "enum/ProjectsEnum";
import { TranslationResult } from "model/Translation/TranslationResult";
import { atom, selectorFamily } from "recoil";

type TranslationAtom = {
    [key in ProjectsEnum]?: TranslationResult
}

const translationAtom = atom<TranslationAtom>({
    key: 'translationAtom',
    default: {},
});

export const translationState = selectorFamily<TranslationResult | undefined, ProjectsEnum>({
    key: 'translationState',
    get: (key) => ({ get }) => {
        let atom = get(translationAtom);
        if (atom.hasOwnProperty(key.toString())) {
            return atom[key];
        }
        return undefined;
    },

    // optional set
    set: field => ({ set }, newValue) =>
        set(translationAtom, prevState => ({ ...prevState, [field]: newValue })),
});