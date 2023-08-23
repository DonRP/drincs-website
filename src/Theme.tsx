import { GlobalStyles, useTheme } from "@mui/joy";
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import {
    THEME_ID as MATERIAL_THEME_ID,
    Experimental_CssVarsProvider as MaterialCssVarsProvider,
    experimental_extendTheme as materialExtendTheme,
} from '@mui/material/styles';

// https://mui.com/joy-ui/guides/using-joy-ui-and-material-ui-together/

export const myUseTheme = useTheme

type MyThemeProps = {
    children: React.ReactNode;
}

export function MyTheme(props: MyThemeProps) {
    const materialTheme = materialExtendTheme();

    return (
        <MaterialCssVarsProvider
            defaultMode="dark"
            theme={{ [MATERIAL_THEME_ID]: materialTheme }}
        >
            <JoyCssVarsProvider defaultMode="dark" >
                <GlobalStyles styles={{ h1: { color: 'white' }, h2: { color: 'white' }, body: { backgroundColor: '#6c4b73', } }} />
                {props.children}
            </JoyCssVarsProvider>
        </MaterialCssVarsProvider>
    );
}
