import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';
import BackGroundData from '../../../assets/background.svg';
import { getUserContribution } from './../../services/user-api'
import DetailsCard from './../../components/DetailsCard/DetailsCard'
import EditContributionDialog from './EditContributionDialog/EditContributionDialog';
const useStyles = makeStyles({
    root: {
        backgroundImage: `url(${BackGroundData})`,
        width: '100%',
       
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: '18px 0 0 0',
    },
    container: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        marginTop: '50px',
        height: '100vh',
        padding: '30px 25px',
        minHeight: '100vh',
        '@media (max-width: 600px)': {
            marginTop: '35px'
        }
    },
    heading: {
        color: 'rgba(96, 69, 226, 1)',
        margin: '5px 0',
        fontWeight: '700',
        fontSize: '15px',
        '@media (max-width: 600px)': {
            fontSize: '13px',
        }
    },
    text: {
        color: 'rgba(17, 17, 17, 1)',
        margin: '5px 0',
        fontWeight: '500',
        fontSize: '20px',
        '@media (max-width: 600px)': {
            fontSize: '16px',
        }
    }
});
const Profile = () => {
    const classes = useStyles();
    const [userContribution, setUserContribution] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [currentData, setCurrentData] = useState({})
    const [userData, setUserData] = useState({ name: '', email: '', phone: '', _id: '' })
    const fetchUserContribution = async () => {
        const res = await getUserContribution();
        setUserContribution(res?.data?.ResponseData || [])
        const user = sessionStorage.getItem("user")
        if (user) {
            setUserData(JSON.parse(user))
        }
    }

    const handleClose = () => {
        setOpenDialog(false)
    }
    const handleOpen = () => {
        setOpenDialog(true)
    }
    const handleClickCard = (post) => {
        setCurrentData(post)
        handleOpen()
    }


    useEffect(() => {
        fetchUserContribution()
        return () => {
        }
    }, [])

    return (
        <div className={classes.root}>
            <Container maxWidth='md' className={classes.container}>
                <Grid container alignItems='flex-start' justify='center' >
                    <Grid md={4} xs={12}>
                        <Grid container alignItems='center' justify='center'>
                            <Grid item xs={12}>
                                <Grid container alignItems='center' justify='center'>
                                    <Grid item xs={12}>
                                        <p className={classes.heading} >NAME</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p className={classes.text} style={{ textTransform: 'capitalize' }}>{userData.name}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems='center' justify='center'>
                                    <Grid item xs={12}>
                                        <p className={classes.heading}>EMAIL</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p className={classes.text}>{userData.email}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems='center' justify='center'>
                                    <Grid item xs={12}>
                                        <p className={classes.heading}>PHONE</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p className={classes.text}>{userData.phone}</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid md={8} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <p className={classes.heading}>RECENT ACTIVITIES</p>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    {userContribution.length === 0 && (<h2>No Recent Activities</h2>)}
                                    {[...userContribution].reverse().map((post) => <DetailsCard handleClickCard={handleClickCard} data={post} key={post._id} />)}
                                </Grid>
                                <EditContributionDialog open={openDialog} handleClose={handleClose} data={currentData} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Profile
