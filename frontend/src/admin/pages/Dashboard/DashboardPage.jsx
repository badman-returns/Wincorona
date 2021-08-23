import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Odometer from 'react-odometerjs';
import "odometer/themes/odometer-theme-default.css";

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

const DashboardPage = ({userData, helpData, contactData, contributionData}) => {

    const helpLength = helpData.length;
    const contactLength = contactData.length;
    const userLength = userData.length;
    const contributionLength = contributionData.length;

    const classes = useStyles();
    return (
        <>
            <div className={classes.container}>
                <Grid container justify='center' alignItems='center' spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify='center' alignItems='center'>
                            <h3>Welcome to Dashboard</h3>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container justify='center'>
                            <Grid item xs={12}>
                                <Paper style={{ padding: '20px' }} elevation={2}>
                                    <Grid container justify='space-between' alignItems='flex-start'>
                                        <Grid item>
                                            <b>Total Contributions</b>
                                        </Grid>
                                        <Grid item id='odometer' >
                                            <b><Odometer format="d" duration={500} value={contributionLength} /></b>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container justify='center'>
                            <Grid item xs={12}>
                                <Paper style={{ padding: '20px' }} elevation={2}>
                                    <Grid container justify='space-between' alignItems='flex-start'>
                                        <Grid item>
                                            <b>Total People Ask For Helps</b>
                                        </Grid>
                                        <Grid item id='odometer' >
                                            <b><Odometer format="d" duration={500} value={helpLength} /></b>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container justify='center'>
                            <Grid item xs={12} >
                                <Paper style={{ padding: '20px' }} elevation={2}>
                                    <Grid container justify='space-between' alignItems='flex-start'>
                                        <Grid item>
                                            <b>Total People Try to Contact Us</b>
                                        </Grid>
                                        <Grid item id='odometer' >
                                            <b><Odometer format="d" duration={500} value={contactLength} /></b>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container justify='center'>
                            <Grid item xs={12}>
                                <Paper style={{ padding: '20px' }} elevation={2}>
                                    <Grid container justify='space-between' alignItems='flex-start'>
                                        <Grid item>
                                            <b>Total Users</b>
                                        </Grid>
                                        <Grid item id='odometer' >
                                            <b><Odometer format="d" duration={500} value={userLength} /></b>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </div>
        </>
    )
}

export default DashboardPage;