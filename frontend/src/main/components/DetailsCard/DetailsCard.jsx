import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import callIcon from '../../../assets/call.svg'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

const useStyles = makeStyles({
    postCard: {
        border: '0.5px solid #C8C8C8',
        borderRadius: '4px',
        padding: '12px',
        margin: '8px 0',
        '@media (max-width: 600px)': {
            padding: '8px',
        },
        cursor: 'pointer',
    },
    callImage: {
        maxWidth: '100%',
        maxHeight: '100%',
        '@media (max-width: 600px)': {
            maxWidth: '70%',
            maxHeight: '70%',
        }
    },
    cardHeading: {
        fontWeight: '700',
        fontSize: '13px',
        textTransform:'capitalize',
    },
    cardText: {
        fontWeight: '200',
        fontSize: '10px',
        margin: '8px 0',
        '@media (max-width: 600px)': {
            margin: '3px 0'
        }
    }
})
const DetailsCard = ({handleClickCard,data}) => {
    const classes = useStyles();
    const additionalDetails = data.additionalDetails.split().splice(0,10).join(" ") + "..."
    return (
        <Grid item xs={12} onClick={()=>handleClickCard(data)}>
            <Grid container className={classes.postCard} justify='center' alignItems='center' 
            >
                <Grid item xs={2} md={1}>
                    <Grid container justify='flex-start' alignItems='center'>
                        <img src={callIcon} alt='call' className={classes.callImage} />
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <Grid container justify='space-around' alignItems='center'>
                        <Grid item xs={12} className={classes.cardHeading}>{data.name}</Grid>
                        <Grid item xs={12} className={classes.cardHeading}>{data.state}, {data.district} - {data.pincode}</Grid>
                        <Grid item xs={12}  >
                            <p className={classes.cardText}>
                                {additionalDetails}
                                </p></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                    <Grid container justify='flex-end' alignItems='center' style={{ color: '#121212', fontSize: '8px' }}>
                        <ArrowForwardIosIcon fontSize='small' />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default DetailsCard
