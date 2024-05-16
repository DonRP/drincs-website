import { PaletteRange } from "@drincs/react-components";
import "./font.css";

declare module '@mui/joy/styles' {
    interface Palette {
        logo: {
            dicord: string;
            patreon: string;
            patreonDark: string;
        }
        gold: PaletteRange
    }

    interface FontFamily {
        "lilita-one": string
    }
    interface ColorPalettePropOverrides {
        'gold': true
    }
}