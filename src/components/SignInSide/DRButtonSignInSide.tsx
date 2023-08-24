import DRButton, { IDRButtonProps } from '../DRButton';

function DRButtonSignInSide(props: IDRButtonProps) {
    return (
        <DRButton
            fullWidth
            color="primary"
            autoFocus
            marginTop={2}
            marginBottom={1}
            marginLeft={0}
            marginRight={0}
            {...props}
        />
    );
}

export default DRButtonSignInSide;