import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import DetailsCard from '../../../components/DetailsCard/DetailsCard'
import DetailsCardDialog from '../../../components/DetailsCardDialog/DetailsCardDialog';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";
import virusImage from '../../../../assets/virus.svg'


const useStyles = makeStyles((theme => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    button: {
        width: '100%',
        padding: '8px',
        color: 'white',
        backgroundColor: '#6045E2',
        fontWeight: '700',
        borderRadius: '4px',
        border: 'none',
        margin: '16px 5px',
        cursor: 'pointer'
    },
})))
const SearchPost = ({ searchData }) => {
    const classes = useStyles();
    const history = useHistory();
    const [openDialog, setOpenDialog] = useState(false)
    const [currentData, setCurrentData] = useState({})
    const [timeOutState, setTimeOutState] = useState(false)
    const [loading, setLoading] = useState(true);
    const handleClose = () => {
        setOpenDialog(false)
    }
    const handleOpen = () => {
        setOpenDialog(true)
    }
    const handleClickCard = (post) => {
        console.log(post)
        setCurrentData(post)
        handleOpen()
    }
    const handelClickAskHelpPost = () => {
        history.push('/ask-for-help');
    }
    setTimeout(() => {
        setTimeOutState(true);
        setLoading(false);
    }, 3000);

    return (
        <Grid container justify='center' alignItems='flex-start' >
            {
                loading && !searchData.length && (
                    <>
                        <Grid container justify='center' alignItems='center'>
                            <CircularProgress />
                        </Grid>
                    </>
                )
            }
            {
                timeOutState && searchData.length <= 0 && (
                    <>
                        <h2>No Match found</h2>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item>
                                <button className={classes.button} onClick={handelClickAskHelpPost}>
                                    <Grid container justify='center' alignItems='center' spacing={1}>
                                        <Grid item>Ask For Help</Grid>
                                        <Grid item><img src={virusImage} alt='virus' /></Grid>
                                    </Grid>
                                </button>
                            </Grid>
                        </Grid>
                    </>
                )
            }
            {
                searchData.map((post) => <DetailsCard handleClickCard={handleClickCard} data={post} key={post._id} />)
            }
            <DetailsCardDialog open={openDialog} handleClose={handleClose} data={currentData} />
        </Grid>
    )
}

export default SearchPost
