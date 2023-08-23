import { GlobalStyles, extendTheme, useTheme } from "@mui/joy";
import { CssVarsProvider } from '@mui/joy/styles';

export const myUseTheme = useTheme

type MyThemeProps = {
    children: React.ReactNode;
}

export function MyTheme(props: MyThemeProps) {
    const theme = extendTheme({
        components: {
            JoyChip: {
                defaultProps: {
                    size: 'sm',
                },
                styleOverrides: {
                    root: {
                        borderRadius: '4px',
                    },
                },
            },
        },
    });

    return (
        <CssVarsProvider theme={theme}>
            <GlobalStyles styles={{ h1: { color: 'white' }, h2: { color: 'white' }, body: { backgroundColor: '#6c4b73', } }} />
            {props.children}
        </CssVarsProvider>
    );
}
