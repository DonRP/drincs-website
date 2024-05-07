import { Sheet, SheetProps } from "@mui/joy";
import { myUseTheme } from "../Theme";

export default function DRSheet(props: SheetProps) {
    const { sx, children, ...rest } = props;

    return (
        <Sheet
            sx={{
                borderRadius: "lg",
                boxShadow: 'md',
                border: '1px solid',
                borderColor: myUseTheme().palette.neutral[300],
                ...sx
            }}
            {...rest}
        >
            {children}
        </Sheet>
    );
}
