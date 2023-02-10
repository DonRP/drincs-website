import { atom } from "recoil";

const OLTHER_TRANSLATION_NOT_COMPLETE_ATOM = "olther_translation_not_complete_atom"

export const OltherTranslationNotCompleteAtom = atom({
    key: OLTHER_TRANSLATION_NOT_COMPLETE_ATOM,
    default: [""],
});
