import { Typography, TypographyProps, TypographyTypeMap } from "@mui/joy";
import { Theme, useMediaQuery } from "@mui/material";
import Typewriter from "../Animation/Typewriter";

interface IProps extends TypographyProps<TypographyTypeMap['defaultComponent'], {
    component?: React.ElementType;
}> {
}

export default function DRLogo(props: IProps) {
    const lgScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
    return (
        <Typography
            {...props}
        >
            <strong>DR</strong>
            {lgScreen && <Typewriter text={"incs Productions"} delay={100} />}
            {!lgScreen && <Typewriter text={"incs"} delay={100} />}
        </Typography>
    );
}
