import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import virusImage from './../../../../../assets/virus.svg'
import { useHistory } from "react-router-dom";
import NeedHelpPost from '../../../NeedHelp/NeedHelpResult/NeedHelpResult';
const useStyles = makeStyles({
    heading: {
        fontSize: '24px',
        margin: '8px 0',
        '@media (max-width: 600px)': {
            fontSize: '20px',
        }
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
        cursor: 'pointer',
        '@media (max-width: 600px)': {
            padding: '4px 6px',
            margin: '10px',
          },
    },

    seeMoreButton: {
        borderRadius: '6px',
        padding: '14px 26px',
        backgroundColor: 'white',
        border: '1.5px solid #8692A6',
        fontFamily: 'Poppins',
        margin: '5px 0',
        fontSize: '14px',
        color: '#8692A6',
        cursor: 'pointer',
    },
    blurContainer: {
        height: '60px',
        width: '100%',
        position: 'absolute',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)',
        transform: 'translateY(-110%)'
    }
})

const HelpUs = ({getHelpPosts}) => {
    const classes = useStyles();
    const history = useHistory();
  const handelClick = () =>{
    history.push('/help-us-posts');
  }
  const handelClickAskHelpPost =()=>{
    history.push('/ask-for-help');
}
    return (
        <Grid>
            <Grid item xs={12}>
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

            </Grid>
            <Grid item xs={12}>
                <Grid container justify='center' alignItems='center'>
                    <NeedHelpPost getHelpPosts={getHelpPosts} limit={4} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <div style={{ position: 'absolute' }}>
                    <div className={classes.blurContainer}>

                    </div>
                </div>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify='center' alignItems='center'>
                    <Grid item>
                        <button className={classes.seeMoreButton} onClick={handelClick}>See More</button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


export default HelpUs