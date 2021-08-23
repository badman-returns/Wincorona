import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DisclaimerDialog = ({
    SetOpen,
    handleClose,
    handleConfirm,
    confirmButtonColorSecondary,
}) => {
    return (
        <Dialog
            open={SetOpen}
            onClose={handleClose}
            maxWidth={"xs"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Disclaimer</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please note that a lot of fraud is going on around us, in connection to these supplies. Thus we advise caution on the part of the patient party before involving in monetary transaction with any supplier. Hence, please personally verify the product. If you suspect any foul play, please contact the concerned authorities. It is hereby declared that Artificial Brix is not going to be liable for any kind of fraud related to the services you seek.
            </DialogContentText>
            </DialogContent>
            <Grid container justify='center' alignItems='center'>
                <DialogActions>

                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color={confirmButtonColorSecondary ? 'secondary' : 'primary'}
                        autoFocus
                    >
                        OK
                    </Button>
                </DialogActions>
            </Grid>
        </Dialog>
    );
};

export default DisclaimerDialog;