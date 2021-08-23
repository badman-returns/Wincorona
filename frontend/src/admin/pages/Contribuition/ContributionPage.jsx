import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, TextField } from '@material-ui/core';
import DetailsCard from './../../../main/components/DetailsCard/DetailsCard'
import ContributionDialog from '../../components/ContributionDialog/ContributionDialog';
import AlertDialog from './../../../main/components/AlertDialog/AlertDialog'
import { useToasts } from 'react-toast-notifications';
import { deleteContributionPostById } from './../../services/admin-contribution-api'
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
    },
});


const ContributionsPage = ({ contributionData, refreshContributionData }) => {
    const classes = useStyles();
    const [searchKey, setSearchKey] = useState('');
    const [requiredData, setRequiredData] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [openConfirmationDeleteDialog, setOpenConfirmationDeleteDialog] = useState(false)
    const [currentData, setCurrentData] = useState({})
    const [validationState, setValidationState] = useState(false)
    const [resultState, setResultState] = useState(false)
    const { addToast } = useToasts();
    const handleClose = () => {
        setOpenDialog(false)
    }
    const handleClickCard = (post) => {
        setCurrentData(post)
        setOpenDialog(true)
    }

    const filterContributionData = () => {
        const filteredData = contributionData.filter((data) =>
            Object.values(data)
                .join(' ')
                .toLocaleLowerCase()
                .search(searchKey.toLocaleLowerCase()) !== -1)
        setRequiredData(filteredData)
    }

    const handelDelete = (post) => {
        setCurrentData(post)
        setOpenConfirmationDeleteDialog(true)
    }

    const confirmDeleteContribution = async () => {
        setOpenConfirmationDeleteDialog(false)
        try {
            const res = await deleteContributionPostById(currentData._id)
            if (res.status === 200) {
                handleClose()
                addToast('Deleted Successfully', {
                    appearance: 'success',
                    autoDismiss: true,
                });
                refreshContributionData()
            }
        } catch (error) {
            addToast('Can not delete try again later', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }

    useEffect(() => {
        setRequiredData([])
        return () => {

        }
    }, [contributionData])

    const handleSearch = () =>{
        setValidationState(true)
        if(searchKey.length >= 4){
            filterContributionData()
            setResultState(true);
        }
    }


    return (
        <>
            <div className={classes.container}>
                <Grid container justify='center' alignItems='center' spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify='center' alignItems='center'>
                            <h3>Contribution Lists</h3>
                        </Grid>
                    </Grid>
                </Grid>
                <AppBar position='sticky' color='inherit' style={{ padding: '10px', top: '60px' }}>
                    <Grid container justify='center' alignItems='center' spacing={2}>
                        <Grid item xs={8}>
                            <TextField
                                label="Search contributions"
                                variant="outlined"
                                fullWidth
                                className={classes.inputBox}
                                value={searchKey}
                                onInput={(e) => {
                                    setSearchKey(e.target.value);
                                    setResultState(false);
                                }}
                                size='small'
                                helperText='Search Key must be greater than length 3'
                                error = {validationState && searchKey.length < 4}
                            />
                        </Grid>
                        <Grid item xs={4} >
                            <Button color='primary' variant='contained' size='small' onClick={handleSearch} >Search</Button>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid container justify='center' alignItems='center' >
                    {requiredData.length == 0 && resultState && searchKey.length >= 4 && <h3>No Results found</h3>}
                    
                    {

                        requiredData.slice(0).reverse().map(
                            (post) => <DetailsCard handleClickCard={handleClickCard} data={post} key={post._id} />)
                    }
                    <ContributionDialog open={openDialog} handleClose={handleClose} data={currentData} handelDelete={handelDelete} />
                    <AlertDialog
                        SetOpen={openConfirmationDeleteDialog}
                        handleClose={() => setOpenConfirmationDeleteDialog(false)}
                        title="Do you want Delete"
                        content="Once deleted you can not get that data back"
                        handleConfirm={confirmDeleteContribution}
                        confirmButtonColorSecondary={false}
                    />
                </Grid>
            </div>
        </>
    )
}

export default ContributionsPage;