import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SuperAdminAuthenticationService from '../../../services/super-admin-authentication-services';
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'

export default function SuperAdminLogin() {
  const { addToast } = useToasts();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [validationState, setValidationState] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault();
    setValidationState(true)
    if(email !== ''  && password !== ''){
        SuperAdminAuthenticationService.login(email, password).then(
          (res) => {
            console.log(res)
            if(res.status === 200){
              history.push('/super-admin/dashboard');
              window.location.reload();
            }else{
              addToast('Invalid Email or Password', {
                appearance: 'error',
                autoDismiss: true,
              });
            }
          }
        ).catch((err)=>{
          console.log(err)
          addToast('Invalid Email or Password', {
            appearance: 'error',
            autoDismiss: true,
          });
        })
    }
    
  }

  useEffect(() => {
    const token = sessionStorage.getItem('admin');
    if (token){
      history.push('/super-admin/dashboard');
      window.location.reload();
    }
  },[history])

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1>WinCovid19</h1>
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email "
            name="email"
            value={email}
            autoFocus
            error = {validationState && email === ''}
            onInput={(e)=>setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            error = {validationState && password === ''}
            onInput={(e)=>setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
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
        Artificial Brix
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
    minHeight:'100vh'
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
  link:{
    color:'#3f51b5',
    '&:hover':{
        textDecoration:'underline',
        cursor:'pointer'
    }
  }
}));