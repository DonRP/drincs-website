import { extendTheme } from "@drincs/react-components";
import { GlobalStyles } from "@mui/joy";
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import {
    THEME_ID as MATERIAL_THEME_ID,
    Experimental_CssVarsProvider as MaterialCssVarsProvider,
    experimental_extendTheme as materialExtendTheme
} from '@mui/material/styles';
import "./font.css";

declare module '@mui/joy/styles' {
    interface Palette {
        logo: {
            dicord: string;
            patreon: string;
            patreonDark: string;
        };
    }

    interface FontFamily {
        sixtyfour: string
    }
}

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                logo: {
                    dicord: "#7289da",
                    patreon: "#f96854",
                    patreonDark: "#052d49",
                },
            },
        },
        dark: {
            palette: {
                logo: {
                    dicord: "#7289da",
                    patreon: "#f96854",
                    patreonDark: "#052d49",
                },
            },
        },
    },
    fontFamily: {
        sixtyfour: "Sixtyfour",
    },
});

type MyThemeProps = {
    children: React.ReactNode;
}

// https://mui.com/joy-ui/guides/using-joy-ui-and-material-ui-together/
export function MyTheme(props: MyThemeProps) {
    const materialTheme = materialExtendTheme();

    return (
        <MaterialCssVarsProvider
            defaultMode="dark"
            theme={{ [MATERIAL_THEME_ID]: materialTheme }}
        >
            <JoyCssVarsProvider defaultMode="dark" theme={theme} >
                <GlobalStyles styles={{ h1: { color: 'white' }, h2: { color: 'white' }, body: { backgroundColor: '#6c4b73', } }} />
                {props.children}
            </JoyCssVarsProvider>
        </MaterialCssVarsProvider>
    );
}
