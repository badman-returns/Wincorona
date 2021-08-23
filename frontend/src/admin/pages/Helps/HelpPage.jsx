import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ContributionDialog from '../../components/ContributionDialog/ContributionDialog';
import AlertDialog from './../../../main/components/AlertDialog/AlertDialog'
import { useToasts } from 'react-toast-notifications';
import {deleteAdminHelpDataById} from './../../services/admin-help'
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

const HelpPage = ({ helpData, refreshHelpData }) => {
    const classes = useStyles();
    const [openConfirmationDeleteDialog, setOpenConfirmationDeleteDialog] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [currentData, setCurrentData] = useState({})
    const { addToast } = useToasts();

    const handleClose = () => {
        setOpenDialog(false)
    }
    const handleClickCard = (post) => {
        setCurrentData(post)
        setOpenDialog(true)
    }
    const handelDelete = (post) => {
        setCurrentData(post)
        setOpenConfirmationDeleteDialog(true)
    }
    const confirmDeleteHelp = async () => {
        setOpenConfirmationDeleteDialog(false)
        try {
            const res = await deleteAdminHelpDataById(currentData._id)
        if (res.status === 200) {
            handleClose()
            addToast('Deleted Successfully', {
                appearance: 'success',
                autoDismiss: true,
            });
            refreshHelpData()
        }
        } catch (error) {
            addToast('Can not delete try again later', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }

    return (
        <>
            <div className={classes.container}>
                <Grid container justify='center' alignItems='center' spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify='center' alignItems='center'>
                            <h3>List of People Asking for Help</h3>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify='center' alignItems='center'>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">Name </TableCell>
                                    <TableCell align="center">Phone</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            {helpData && helpData?.length !== 0 && helpData.slice(0).reverse().map((help) =>
                            (
                                <TableBody>
                                    <TableCell align="center">{Date(help.createdOn).split(' ').splice(0, 4).join(' ')}</TableCell>
                                    <TableCell align="center">{help.name}</TableCell>
                                    <TableCell align="center">{help.phone}</TableCell>
                                    <TableCell align="center">
                                        <Button color='secondary' size='small' variant='outlined' onClick={() => handleClickCard(help)}>View</Button></TableCell>
                                </TableBody>
                            )
                            )}
                        </Table>
                    </TableContainer>
                </Grid>
                <ContributionDialog open={openDialog} handleClose={handleClose} data={currentData}  handelDelete={handelDelete}/>
                <AlertDialog
                        SetOpen={openConfirmationDeleteDialog}
                        handleClose={() => setOpenConfirmationDeleteDialog(false)}
                        title="Do you want Delete"
                        content="Once deleted you can not get that data back"
                        handleConfirm={confirmDeleteHelp}
                        confirmButtonColorSecondary={false}
                    />
            </div>
        </>
    )
}

export default HelpPage;