import AppBar from '@material-ui/core/AppBar'
import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import VirusImage from '../../../assets/virus.svg'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import SuperAdminAuthenticationService from '../../../services/super-admin-authentication-services';
import * as jwt from "jsonwebtoken";
const useStyles = makeStyles({
    heading: {
        fontSize: '16px',
        margin: '10px 0',
        fontWeight: '800',
        '@media (max-width: 600px)': {
            fontSize: '13px',
        },
    },
    text: {
        color: 'black',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        // margin:'0px'
        '@media (max-width: 600px)': {
            fontSize: '13px',
        },
    },
    button: {
        fontSize: '16px',
        width: '100%',
        padding: '6px 10px',
        margin: '10px 0',
        color: 'white',
        backgroundColor: '#6045E2',
        fontWeight: '500',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        '@media (max-width: 600px)': {
            fontSize: '13px',
        },
    },
})
const Header = () => {
    const history = useHistory();
    const classes = useStyles();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        let token = sessionStorage.getItem('admin')
        if (token) {
            let tokenData = jwt.decode(token)
            let tokenExpiration = tokenData.exp;
            let dateNow = new Date();

            if (tokenExpiration < dateNow.getTime() / 1000) {
                setIsAuthenticated(false)
            } else {
                setIsAuthenticated(true)
            }
        } else {
            setIsAuthenticated(false)
        }
    }, [])


    const onHandleLogout = (e) => {
        e.preventDefault();
        SuperAdminAuthenticationService.logout().then(() => {
            history.push('/private/login');
            // window.location.reload();
        })
    }
    return (

        <AppBar position="fixed" color='inherit'>
            <Grid container alignItems='center' justify='center'>
                <Grid item xs={11} md={10} >
                    <Grid container alignItems='center' justify='space-between'>
                        <Grid item>
                            <Grid container alignItems='center' justify='center' spacing={1}>
                                <Grid item>
                                    <img src={VirusImage} alt='virus' />

                                </Grid>
                                <Grid item>
                                    {isAuthenticated ? (<p className={classes.heading}>WIN-COVID ADMIN PANEL</p>
                                    ) : (<p className={classes.heading}>WIN-COVID</p>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container justify="flex-end" alignItems="center" spacing={1}>
                                {isAuthenticated && (<Grid item>
                                    <button className={classes.button} style={{ backgroundColor: '#ff1744' }} onClick={onHandleLogout} >Logout</button>
                                </Grid>)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>

    )
}

export default Header
