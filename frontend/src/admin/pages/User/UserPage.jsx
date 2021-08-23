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
import AlertDialog from './../../../main/components/AlertDialog/AlertDialog'
import { useToasts } from 'react-toast-notifications';
import {deleteUserById} from './../../services/admin-user-api'

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

const UserPage = ({ users,refreshUserData }) => {
    const classes = useStyles();
    const [openConfirmationDeleteDialog, setOpenConfirmationDeleteDialog] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const handleDeleteClick = (user) =>{
        setCurrentUser(user)
        setOpenConfirmationDeleteDialog(true)
    }
    const { addToast } = useToasts();
    const confirmDeleteUser = async ()=>{
        setOpenConfirmationDeleteDialog(false)
        try {
            const res = await deleteUserById(currentUser._id)
        if (res.status === 200) {
            addToast('Deleted Successfully', {
                appearance: 'success',
                autoDismiss: true,
            });
            refreshUserData()
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
            <Grid container justify='center' alignItems='center' spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify='center' alignItems='center'>
                        <h3>Users</h3>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify='center' alignItems='center'>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name </TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        {users && users?.length !== 0 && users.slice(0).reverse().map((user) =>
                        (
                            <TableBody>

                                <TableCell align="center">{user.name}</TableCell>
                                <TableCell align="center">{user.phone}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center"><Button  variant='outlined' size='small' color='secondary' onClick={()=>handleDeleteClick(user)}>Delete</Button></TableCell>

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
                        confirmButtonColorSecondary={false}
                    />
        </div>
    )
}

export default UserPage
