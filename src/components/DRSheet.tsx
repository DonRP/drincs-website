import { useTheme } from "@drincs/react-components";
import { Sheet, SheetProps } from "@mui/joy";

export default function DRSheet(props: SheetProps) {
    const { sx, children, ...rest } = props;

    return (
        <Sheet
            sx={{
                borderRadius: "lg",
                boxShadow: 'md',
                border: '1px solid',
                borderColor: useTheme().palette.neutral[300],
                ...sx
            }}
            {...rest}
        >
            {children}
        </Sheet>
    );
}
