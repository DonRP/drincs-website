import { GlobalStyles, useTheme as useThemeJoy } from "@mui/joy";
import { CssVarsProvider as JoyCssVarsProvider, extendTheme } from '@mui/joy/styles';
import {
    THEME_ID as MATERIAL_THEME_ID,
    Experimental_CssVarsProvider as MaterialCssVarsProvider,
    experimental_extendTheme as materialExtendTheme,
    useTheme as useThemeMaterial,
} from '@mui/material/styles';

// https://mui.com/joy-ui/customization/theme-colors/
declare module '@mui/joy/styles' {
    interface Palette {
        logo: {
            dicord: string;
        };
    }
}

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                logo: {
                    dicord: "#7289da",
                },
            },
        },
        dark: {
            palette: {
                logo: {
                    dicord: "#7289da",
                },
            },
        },
    },
});

export const myUseTheme = useThemeJoy
export const materialUseTheme = useThemeMaterial

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
