import { ColorPaletteProp } from '@mui/joy';
import { Theme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import DRButton from './DRButton';
import DRDialog, { IDRDialogProps } from './DRDialog';

interface IProps extends IDRDialogProps {
    /**
     * @returns true if the dialog should be closed
     */
    onClick?: () => boolean
    /**
     * @returns true if the dialog should be closed
     */
    onClickAsync?: () => Promise<boolean>
    children?: React.ReactNode;
    head?: string | React.ReactNode;
    buttonColor?: ColorPaletteProp
    disabledConfirm?: boolean
    cancelText?: string
    confirmText?: string
}

export default function DRDialogConfirmation(props: IProps) {
    const {
        setOpen
        , onClick
        , onClickAsync
        , children
        , buttonColor
        , disabledConfirm
        , confirmText
        , cancelText
        , layout
        , ...rest
    } = props
    const [loading, setLoading] = useState<boolean>(false)
    const smScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    return (
        <DRDialog
            setOpen={setOpen}
            layout={smScreen ? "fullscreen" : layout}
            actions={
                <>
                    <DRButton
                        variant="solid"
                        color={buttonColor}
                        onClick={() => {
                            if (onClick) {
                                const result = onClick()
                                setOpen(!result)
                                return
                            }
                            if (!onClickAsync) return
                            setLoading(true)
                            onClickAsync().then((result) => {
                                setLoading(false)
                                setOpen(!result)
                            }).catch(() => {
                                setLoading(false)
                            })
                        }}
                        disabled={disabledConfirm}
                        fullWidth={false}
                        loading={loading}
                    >
                        {confirmText || 'Confirm'}
                    </DRButton>
                    <DRButton
                        variant="plain"
                        color="neutral"
                        onClick={() => setOpen(false)}
                        fullWidth={false}
                        disabled={loading}
                    >
                        {cancelText || 'Cancel'}
                    </DRButton>
                </>
            }
            {...rest}
        >
            {children}
        </DRDialog>
    );
}