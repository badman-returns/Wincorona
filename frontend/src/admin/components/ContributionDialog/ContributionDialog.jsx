import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    heading: {
        fontSize: '24px',
        margin: 0,
        color: '#696F79',
        textTransform: 'capitalize',
        '@media (max-width: 600px)': {
            fontSize: '18px',
        }
    },
    textBox: {
        border: '1.5px solid #8692A6',
        borderRadius: '6px',
        textTransform: 'capitalize',
        padding: '0 10px',
        fontWeight: '600',
        // color:'#8692A6'
    },
    subHeading: {
        color: '#8692A6',
        textTransform: 'uppercase',
        fontWeight: '500'
    },
    items: {
        margin: '0 10px'
    },
    timeStamp: {
        color: '#8692A6',
        margin: '0 15px'
    }
})

const getDate = (date) => {
    try {
        let newDate = new Date(date).toUTCString();
        let arr = newDate.split(' ').slice(1, 5);
        let timeArr = arr[3].split(':').map((str) => parseInt(str));
        let AMPMstr = 'AM';
        let hour = timeArr[0];
        let min = timeArr[1];
        let day = arr.slice(0, 3);
        let dayStr = day.join(' ');
        if (timeArr[0] > 12) {
            AMPMstr = 'PM';
            hour %= 12;
        }
        let time = `${hour > 9 ? hour : '0' + hour}:${min > 9 ? min : '0' + min
            } ${AMPMstr}`;
        return `${dayStr + ' ' + time}`;
    } catch (err) {

    }

};


const ContributionDialog = ({ open, handleClose, data,handelDelete }) => {
    const { innerWidth: width } = window;
    const classes = useStyles();
    const { bloodPlasma, oxygen, ambulance, medicine, beds, food, others } = data;
    const keys = ['bloodPlasma', 'oxygen', 'ambulance', 'medicine', 'beds', 'food', 'others'];
    const values = [bloodPlasma, oxygen, ambulance, medicine, beds, food, others];
    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth='md' fullWidth={true}
            fullScreen={width <= 600 && true}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <h3 className={classes.heading}>{data.name} - {data.district} - {data.pincode}</h3>

            </DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item xs={4} md={3} className={classes.subHeading}>
                                <p>NAME</p>
                            </Grid>
                            <Grid item xs={8} md={6} className={classes.textBox}>
                                <p >{data.name}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item xs={4} md={3} className={classes.subHeading}>
                                <p>district</p>
                            </Grid>
                            <Grid item xs={8} md={6} className={classes.textBox}>
                                <p >{data.district}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item xs={4} md={3} className={classes.subHeading}>
                                <p>state</p>
                            </Grid>
                            <Grid item xs={8} md={6} className={classes.textBox}>
                                <p >{data.state}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item xs={4} md={3} className={classes.subHeading}>
                                <p>phone no</p>
                            </Grid>
                            <Grid item xs={8} md={6} className={classes.textBox}>
                                <p >{data.phone}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item xs={4} md={3} className={classes.subHeading}>
                                <p>needs</p>
                            </Grid>
                            <Grid item xs={8} md={6}>
                                <Grid container justify='flex-start' alignItems='center'>
                                    {keys.map((key, index) => {
                                        if (values[index] === true) {
                                            return (
                                                <Grid item className={`${classes.textBox} ${classes.items}`} key={index}>
                                                    <p>{keys[index]}</p>
                                                </Grid>
                                            )
                                        }
                                        return <></>
                                    })}
                                    {values.every((value) => value === false) && (
                                        <Grid className={classes.textBox} >

                                            <p style={{ margin: "10px 0" }}>others</p>
                                        </Grid>)}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item xs={4} md={3} className={classes.subHeading}>
                                <p>additional details</p>
                            </Grid>
                            <Grid item xs={8} md={6} className={classes.textBox}>
                                <p >{data.additionalDetails}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid container justify='space-between' alignItems='center'>
                    <Grid item >
                        <div>
                            <code className={classes.timeStamp}>{
                                getDate(data.createdOn)
                            }</code>
                        </div></Grid>
                    
                    <Grid item >
                    <Button autoFocus onClick={()=>handelDelete(data)} color="secondary" variant='contained' size='small'>
                        Delete
                        </Button>
                        <Button autoFocus onClick={handleClose} color="secondary" size='small'>
                        close
                        </Button>
                    </Grid>
                </Grid>


            </DialogActions>
        </Dialog>
    )
}

export default ContributionDialog
