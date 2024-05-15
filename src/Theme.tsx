import { createPaletteRange, CssVarsProvider, extendTheme, PaletteRange } from "@drincs/react-components";
import { GlobalStyles } from "@mui/joy";
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

export function MyTheme(props: { children: React.ReactNode }) {

    const theme = extendTheme({
        colorSchemes: {
            light: {
                palette: {
                    logo: {
                        dicord: "#7289da",
                        patreon: "#f96854",
                        patreonDark: "#052d49",
                    },
                    gold: createPaletteRange("gold", "#FFD700", "light", "#000000")
                },
            },
            dark: {
                palette: {
                    logo: {
                        dicord: "#7289da",
                        patreon: "#f96854",
                        patreonDark: "#052d49",
                    },
                    gold: createPaletteRange("gold", "#FFD700", "dark", "#000000")
                },
            },
        },
        fontFamily: {
            "lilita-one": "Lilita One",
        },
    });

    return (
        <CssVarsProvider
            defaultMode="dark"
            themeJoy={theme}
        >
            <GlobalStyles styles={{ h1: { color: 'white' }, h2: { color: 'white' }, body: { backgroundColor: '#6c4b73', } }} />
            {props.children}
        </CssVarsProvider>
    );
}
