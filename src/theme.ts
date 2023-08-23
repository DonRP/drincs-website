import { extendTheme, useTheme } from "@mui/joy";

export const myUseTheme = useTheme

export const theme = extendTheme({
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