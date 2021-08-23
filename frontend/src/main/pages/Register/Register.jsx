import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useToasts } from 'react-toast-notifications'
import { useHistory } from "react-router-dom";
import {RegisterUser} from './../../services/register-api'
import AlertDialog from '../../components/AlertDialog/AlertDialog';
export default function Register() {
  const { addToast } = useToasts();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [reTypePassword, setReTypePassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [validationState, setValidationState] = useState(false)
  const [isMatchPassword, setIsMatchPassword] = useState(true)
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const isValidEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email !== '' && re.test(String(email).toLowerCase());
  };

  const confirmRegister = async ()=>{
    setOpenConfirmationDialog(false)
    const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('password', password);
        try {
          const res = await RegisterUser(formData)
          if(res.status === 200 ){
            addToast('Registered Successfully', {
              appearance: 'success',
              autoDismiss: true,
            });
            history.push('/login')
          }else{
            addToast('User already exist or Error in registration try again', {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        } catch (error) {
          addToast('User already exist or Error in registration try again', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setIsMatchPassword(password === reTypePassword)
    
    setValidationState(true)
   if(name !=='' && isValidEmail() && password !== '' && reTypePassword !== '' &&phone !== ''){
      if(password === reTypePassword){
        setOpenConfirmationDialog(true)
      }else{
        addToast('Password and Retyped password did not match', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
   }
  }

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token){
      history.push('/');
    }
  },[history])
  
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <h1>WinCovid19</h1>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleRegister}>
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Name "
            name="name"
            autoFocus
            value={name}
            error={validationState && name ===''}
            onInput={(e)=>setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email "
            name="email"
            value={email}
            error={validationState && email ===''}
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
            error={validationState && (password ==='' || !isMatchPassword)}
            value={password}
            onInput={(e)=>setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="re type assword"
            label="Retype Password"
            type="password"
            id="retype-password"
            error={validationState && (reTypePassword ==='' || !isMatchPassword)}
            value={reTypePassword}
            onInput={(e)=>setReTypePassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="phone"
            label="Phone"
            id="phone"
            error={validationState && phone ===''}
            value={phone}
            onInput={(e)=>setPhone(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container>
            <Grid item xs>
            Already have a account &nbsp;
              <span className={classes.link} onClick={()=>history.push('/login')}>
               Login?
              </span>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>

      <AlertDialog
        SetOpen={openConfirmationDialog}
        handleClose={() => setOpenConfirmationDialog(false)}
        title="Confirm"
        content="Are you sure to create an account?"
        handleConfirm={confirmRegister}
        confirmButtonColorSecondary={false}
      />
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