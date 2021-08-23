import { Grid, Paper, Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import AlertDialog from '../../../main/components/AlertDialog/AlertDialog';
import MessageDialog from '../../components/AlertDialog/MessageDialog';
import { deleteAdminContactDataById } from '../../services';

const useStyles = makeStyles({
    container: {
        marginLeft: '230px',
        marginTop: '130px',
        '@media (max-width: 600px)': {
            marginLeft: '0px',
        }
    },
    paper: {
        textAlign: 'center',
        padding: '70px',
    }
});

const ContactPage = ({ contactData, refreshContactData }) => {

    const classes = useStyles();
    const { addToast } = useToasts();
    const [currentContact, setCurrentContact] = useState({});
    const [openConfirmationDeleteDialog, setOpenConfirmationDeleteDialog] = useState(false)
    const [openMessageDialog, setOpenMessageDialog] = useState(false);

    const handleDeleteClick = (contact) => {
        setCurrentContact(contact)
        setOpenConfirmationDeleteDialog(true)
    }

    const handleViewClick = (contact) => {
        setCurrentContact(contact);
        setOpenMessageDialog(true);
    }

    const confirmDeleteUser = async () => {
        setOpenConfirmationDeleteDialog(false)
        try {
            const res = await deleteAdminContactDataById(currentContact._id);
            if (res.status === 200) {
                addToast('Deleted Successfully', {
                    appearance: 'success',
                    autoDismiss: true,
                });
                refreshContactData()
            }
        } catch (error) {
            addToast('Can not delete try again later', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }

    return (
        <div className={classes.container}>
            <Grid container jusitfy='center' alignItems='center' spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify='center' alignItems='center'>
                        <h3>List of People Try to Contact</h3>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify='center' alignItems='center'>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size='small' aria-label='a dense table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name </TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        {contactData && contactData?.length !== 0 && contactData.slice(0).reverse().map((contact) =>
                        (
                            <TableBody>

                                <TableCell align="center">{contact.name}</TableCell>
                                <TableCell align="center">{contact.phone}</TableCell>
                                <TableCell align="center">{contact.email}</TableCell>
                                <TableCell align="center">
                                    <Grid container justify='center' alignItems='center' spacing={2}>
                                        <Grid item>
                                            <Button variant='contained' size='small' color='primary' onClick={() => handleViewClick(contact)}>View</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant='outlined' size='small' color='secondary' onClick={() => handleDeleteClick(contact)}>Delete</Button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableBody>
                        )
                        )}
                    </Table>
                </TableContainer>
            </Grid>
            <AlertDialog
                SetOpen={openConfirmationDeleteDialog}
                handleClose={() => setOpenConfirmationDeleteDialog(false)}
                title="Do you want Delete"
                content="Once deleted you can not get that data back"
                handleConfirm={confirmDeleteUser}
                confirmButtonColorSecondary={false} />
            <MessageDialog
                SetOpen={openMessageDialog}
                handleClose={() => setOpenMessageDialog(false)}
                title="Message"
                content={currentContact.message}
            />
        </div>
    )
}

export default ContactPage;