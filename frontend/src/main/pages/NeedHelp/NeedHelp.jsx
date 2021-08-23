import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import NeedHelpPost from './NeedHelpResult/NeedHelpResult'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    heading: {
        fontSize: '28px',
        margin: '14px 0',
        '@media (max-width: 600px)': {
            fontSize: '22px',
        }
    },
    button: {
        width: '100%',
        padding: '10px 12px',
        color: 'white',
        backgroundColor: '#6045E2',
        fontWeight: '700',
        borderRadius: '4px',
        border: 'none',
        margin: '16px 5px',
        cursor: 'pointer',
    },
})
const NeedHelp = (props) => {
    const { getHelpPosts } = props
    const classes = useStyles();
    const history = useHistory();

    const handleCancel = () => {
        history.push('/');
    };


    return (
        <Grid container justify='center' alignItems='center' >
            <Grid item xs={12} md={11} >
                <Grid container justify='center' alignItems='center'>
                    <Grid item xs={12}>
                        <Grid
                            container
                            justify="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item xs={4}>
                                <h3 className={classes.heading}>Need Help</h3>
                            </Grid>
                            <Grid item xs={4} md={2}>
                                <button className={classes.button} onClick={handleCancel}>
                                    Go Back
                                </button>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={12}>
                        <NeedHelpPost getHelpPosts={getHelpPosts} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NeedHelp
