import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { forgetPassword } from '../../services/forget-password-api';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [linkSent, setlinkSent] = useState(false);
    const [validationState, setValidationState] = useState(false);
    const [loading, setLoading] = useState(false);

    console.log(linkSent);

    const submitEmail = (e) => {
        e.preventDefault();
        setValidationState(true)
        if (email !== '') {
            setLoading(true);
            forgetPassword(email).then(
                (res) => {
                    console.log(res);
                    if (res.status === 200) {
                        setlinkSent(true);
                        setLoading(false);
                    }
                }
            ).catch((err) => {
                console.log(err);
            })
        }

    }

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <h1>WinCovid19</h1>
                <Typography component="h1" variant="h5">
                    Forget Password
                </Typography>
                <form className={classes.form} onSubmit={submitEmail}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email "
                        name="email"
                        value={email}
                        autoFocus
                        error={validationState && email === ''}
                        onInput={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        disabled={linkSent ? "true": ""} 
                    >
                        Submit
                    </Button>
                </form>


                {
                    loading && !linkSent && (
                        <>
                            <Grid container justify='center' alignItems='center'>
                                <CircularProgress />
                            </Grid>
                        </>
                    )
                }

                {linkSent && (
                    <>
                        <Typography component="h1" variant="h5">
                            Password reset mail has been sent to your email. Please click on the link to reset your password.
                        </Typography>
                    </>
                )}

            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit">
                Trishnangshu Goswami
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        color: '#3f51b5',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    }
}));