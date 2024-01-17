import { Button, ButtonProps, ButtonTypeMap, Tooltip } from '@mui/joy';
import { Breakpoint, Fab, FabProps, FabTypeMap, Theme, Zoom, useMediaQuery } from '@mui/material';
import { useState } from 'react';
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
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
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

export function DRButtonSignInSide(props: IProps) {
    return (
        <DRButton
            fullWidth
            color="primary"
            marginTop={2}
            marginBottom={1}
            marginLeft={0}
            marginRight={0}
            size='sm'
            {...props}
        />
    );
}

export interface IPropsFab extends IProps {
    fabProps?: FabProps<FabTypeMap['defaultComponent']>
    breakpoints?: Breakpoint,
    bottom?: number,
    right?: number,
}
export function DRButtonFab(props: IPropsFab) {
    const {
        fabProps,
        breakpoints = 'sm',
        bottom = 16,
        right = 16,
        ...rest
    } = props;
    const smScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down(breakpoints));
    const [zoomIn, setZoomIn] = useState(false);

    // this timeout is added to avoid the zoom effect on the first render. therefore avoid it being shown for a few milliseconds at the point where the normal button should have been inserted
    setTimeout(() => {
        setZoomIn(true)
    }, 500);

    try {
        if (smScreen) {
            return <Zoom
                in={zoomIn}
            >
                <Fab
                    onClick={rest.onClick}
                    disabled={rest.disabled}
                    color="primary"
                    {...fabProps}
                    sx={{
                        position: 'fixed',
                        bottom: bottom,
                        right: right,
                        ...fabProps?.sx
                    }}
                >
                    {rest.startDecorator ? rest.startDecorator : rest.endDecorator}
                </Fab>
            </Zoom>
        }
        else {
            return <DRButton {...rest} />
        }
    }
    catch (error) {
        return <DRErrorComponent error={error} text={"Button Fab"} />
    }
}
