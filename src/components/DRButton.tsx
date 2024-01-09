import { Button, ButtonProps, ButtonTypeMap, Tooltip } from '@mui/joy';
import DRErrorComponent from './DRErrorComponent';

export interface IProps extends ButtonProps<ButtonTypeMap['defaultComponent'], {
    component?: React.ElementType;
}> {
    ariaLabel?: string,
    marginTop?: number,
    marginBottom?: number,
    marginLeft?: number,
    marginRight?: number,
}

export default function DRButton(props: IProps) {
    const {
        children,
        ariaLabel,
        marginTop = 20,
        marginBottom = 10,
        marginLeft = 2,
        marginRight = 2,
        fullWidth = true,
        variant = "solid",
        color = "primary",
        sx,
        size = "lg",
        ...rest
    } = props;

    try {
        return (
            <Tooltip
                title={ariaLabel}
            >
                <Button
                    {...rest}
                    fullWidth={fullWidth}
                    title={ariaLabel}
                    variant={variant}
                    color={color}
                    size={size}
                    sx={{
                        marginTop: marginTop,
                        marginBottom: marginBottom,
                        marginLeft: marginLeft,
                        marginRight: marginRight,
                        ...sx,
                    }}
                >
                    <strong>
                        {children}
                    </strong>
                </Button>
            </Tooltip>
        );
    } catch (error) {
        return <DRErrorComponent error={error} text={"Button"} />
    }
}

export function DRButtonNoMargin(props: IProps) {
    return (
        <DRButton
            marginBottom={0}
            marginLeft={0}
            marginRight={0}
            marginTop={0}
            {...props}
        />
    );
}

export function DRButtonSignInSide(props: IProps) {
    return (
        <DRButton
            fullWidth
            color="primary"
            marginTop={2}
            marginBottom={1}
            marginLeft={0}
            marginRight={0}
            {...props}
        />
    );
}