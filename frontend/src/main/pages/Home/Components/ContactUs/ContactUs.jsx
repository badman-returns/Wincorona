import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import StayHome from './../../../../../assets/stayHome.png';
import { contactPost } from '../../../../services/contact-api';
import { useToasts } from 'react-toast-notifications'
import AlertDialog from '../../../../components/AlertDialog/AlertDialog'
const useStyles = makeStyles({
  heading: {
    fontSize: '26px',
    margin: '8px 0',
    '@media (max-width: 600px)': {
      fontSize: '22px',
    },
  },
  text: {
    fontWeight: '400',
    fontSize: '16px',
    margin: '8px 0',
    color: '#8692A6',
    '@media (max-width: 600px)': {
      fontSize: '12px',
    },
  },
  inputBox: {
    margin: '8px 0',
    '@media (max-width: 600px)': {
      margin: '6px 0',
    },
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
});
const ContactUs = () => {

  const { addToast } = useToasts();
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [validationState, setValidationState] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const isValidEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email !== '' && re.test(String(email).toLowerCase());
  };
  const confirmSubmit = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);
    try {
      contactPost(formData)
        .then((res) => {
          if (res.status === 200) {
            addToast(res.data.ResponseMessage, {
              appearance: 'success',
              autoDismiss: true,
            });
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            setValidationState(false);
          }
        });
    }
    catch (error) {
      console.log(error);
      addToast('Error in posting contact', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    setOpenConfirmationDialog(false)
  }
  const submit = (e) => {
    e.preventDefault();
    setValidationState(true)
    if (name !== '' && phone !== '' && message !== '' && isValidEmail()) {
      setOpenConfirmationDialog(true)
    }

  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ paddingBottom: '20px' }}
    >
      <Grid item xs={12}>
        <h3 className={classes.heading}>Contact Us!</h3>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} className={classes.text}>
                Get in touch with our Developers.
                <br />
                You may Support us on...
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  className={classes.inputBox}
                  helperText="Enter your name"
                  value={name}
                  onInput={(e) => setName(e.target.value)}
                  error={validationState && (name.length < 1)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  type="email"
                  className={classes.inputBox}
                  helperText="Enter your email"
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                  error={validationState && !isValidEmail()}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  className={classes.inputBox}
                  helperText="Enter your phone number"
                  value={phone}
                  onInput={(e) => setPhone(e.target.value)}
                  error={validationState && (phone.length < 1)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  className={classes.inputBox}
                  helperText="Enter your message"
                  value={message}
                  onInput={(e) => setMessage(e.target.value)}
                  error={validationState && (message.length < 1)}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="flex-end" alignItems="center">
                  <Grid item xs={5}>
                    <button className={classes.button} onClick={submit}>Submit</button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container justify="center" alignItems="center">
              <img src={StayHome} alt="stay home" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AlertDialog
        SetOpen={openConfirmationDialog}
        handleClose={() => setOpenConfirmationDialog(false)}
        title="Confirm"
        content="Once submitted you can't change or re-post your response"
        handleConfirm={confirmSubmit}
        confirmButtonColorSecondary={false}
      />
    </Grid>
  );
};

export default ContactUs;
