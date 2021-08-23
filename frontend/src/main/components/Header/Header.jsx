import AppBar from '@material-ui/core/AppBar'
import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import VirusImage from '../../../assets/virus.svg'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import authenticationServices from '../../../services/authentication-services';
import * as jwt from "jsonwebtoken";
const useStyles = makeStyles({
    heading: {
        fontSize: '16px',
        margin: '0',
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
        let token = sessionStorage.getItem('token')
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

    const logIn = ()=>{
        history.push('/login');
        window.location.reload();
    }
    const signUp = ()=>{
        history.push('/register');
        window.location.reload();
    }

    const onHandleLogout = (e) => {
        e.preventDefault();
        authenticationServices.logout().then(() => {
            history.push('/');
            window.location.reload();
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
                                <p className={classes.heading}>WIN-COVID</p>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container justify="flex-end" alignItems="center" spacing={1}>
                                <Grid item>
                                    <p className={classes.text} 
                                    onClick={() => {
                                        history.push('/');
                                        window.location.reload();
                                    }}>
                                        Home
                                    </p>
                                </Grid>
                                {isAuthenticated && (<Grid item>
                                    <p className={classes.text} 
                                    onClick={() => { 
                                        history.push('/user/profile');
                                        window.location.reload(); 
                                    }}>
                                        Profile
                                    </p>
                                </Grid>)}
                                {isAuthenticated ?(<Grid item>
                                    <button className={classes.button} style={{backgroundColor:'#ff1744'}}  onClick={onHandleLogout} >Logout</button>
                                </Grid>):(
                                    <>
                                <Grid item>
                                    <button className={classes.button} onClick={logIn} >LogIn</button>
                                </Grid>
                                <Grid item>
                                <button className={classes.button}  color='primary' variant='contained' size='small' onClick={signUp} >SignUp</button>
                            </Grid>
                            </>
                                )
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>

    )
}

export default Header
