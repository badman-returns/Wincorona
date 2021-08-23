import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';
import isValidPinCode from '../util/validatePinCode';
import { postHelp } from '../../services/help-api';
import { useToasts } from 'react-toast-notifications'
import AlertDialog from '../../components/AlertDialog/AlertDialog';
import FormControl from '@material-ui/core/FormControl';
const useStyles = makeStyles({
  heading: {
    fontSize: '28px',
    margin: '18px 0',
    '@media (max-width: 600px)': {
      fontSize: '22px',
    },
  },
  text: {
    fontSize: '16px',
    margin: '0',
    '@media (max-width: 600px)': {
      fontSize: '14px',
    },
  },
  inputBox: {
    margin: '10px 0',
    '@media (max-width: 600px)': {
      margin: '8px 0',
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
const AskForHelp = ({ fetchGetHelpPost }) => {
  const { addToast } = useToasts();
  const history = useHistory();
  const classes = useStyles();
  const [checkBoxData, setCheckBoxData] = useState({
    bloodPlasma: false,
    oxygen: false,
    ambulance: false,
    medicine: false,
    beds: false,
    icuBeds: false,
    food: false,
    others: false,
  });
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [validationState, setValidationState] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const { bloodPlasma, oxygen, ambulance, medicine, beds, icuBeds, food, others } = checkBoxData;
  const values = [bloodPlasma, oxygen, ambulance, medicine, beds, icuBeds, food, others];
  const handleChange = (event) => {
    setCheckBoxData({
      ...checkBoxData,
      [event.target.name]: event.target.checked,
    });
  };
  const handleCancel = () => {
    history.push('/');
  };

  const isValidName = () => name !== '';
  const isValidPhoneNo = () => phoneNo !== '';
  const isValidAdditionalDetails = () => additionalDetails !== '';

  const confirmPostContribution = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phoneNo);
    formData.append('pincode', pinCode);
    formData.append('additionalDetails', additionalDetails);
    formData.append('oxygen', checkBoxData.oxygen);
    formData.append('ambulance', checkBoxData.ambulance);
    formData.append('medicine', checkBoxData.medicine);
    formData.append('beds', checkBoxData.beds);
    formData.append('icuBeds', checkBoxData.icuBeds);
    formData.append('food', checkBoxData.food);
    formData.append('others', checkBoxData.others);
    formData.append('bloodPlasma', checkBoxData.bloodPlasma);
    try {
      const res = await postHelp(formData)
      if (res.status === 200) {
        addToast('Posted Successfully', {
          appearance: 'success',
          autoDismiss: true,
        });
        setName('');
        setAdditionalDetails('')
        setPhoneNo('')
        setPinCode('')
        setValidationState(false)
        setCheckBoxData({
          bloodPlasma: false,
          oxygen: false,
          ambulance: false,
          medicine: false,
          beds: false,
          icuBeds: false,
          food: false,
          others: true
        })
        history.push('/');
        fetchGetHelpPost();
      }
    } catch (error) {
      addToast('Can not post try again later', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    setOpenConfirmationDialog(false)

  }

  const handleSubmit = async () => {
    setValidationState(true);
    if (
      isValidName() &&
      isValidPhoneNo() &&
      isValidAdditionalDetails() &&
      values.some((value) => value === true)
    ) {
      await isValidPinCode(pinCode)
        .then((res) => {
          if (res) {
            setOpenConfirmationDialog(true)
          } else {
            addToast('Invalid Pincode', {
              appearance: 'error',
              autoDismiss: true,
            });
            console.log('Invalid Pincode');
          }
        })
        .catch((err) => {
          console.log('err');
        });
    }
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} md={11}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={8} md={10}>
                <h3 className={classes.heading}>Ask Help By Posting Your Needs</h3>
              </Grid>
              <Grid item xs={4} md={2}>
                <button className={classes.button} onClick={handleCancel}>
                  Go Back
                </button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormLabel className={classes.text}>Please Enter these necessary details</FormLabel>
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
              error={validationState && !isValidName()}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone No"
              variant="outlined"
              fullWidth
              className={classes.inputBox}
              helperText="Enter your Phone No"
              value={phoneNo}
              onInput={(e) => setPhoneNo(e.target.value)}
              error={validationState && !isValidPhoneNo()}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Pincode"
              variant="outlined"
              fullWidth
              className={classes.inputBox}
              helperText="Enter Your PinCode"
              value={pinCode}
              onInput={(e) => setPinCode(e.target.value)}
              error={validationState && pinCode.length !== 6}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl error={validationState && !values.some((value) => value === true)}>
              <FormLabel component="legend">
                Check the resources you need
            </FormLabel>
            </FormControl>

            <Grid container justify="flex-start" alignItems="center">
              <Grid item xs={6} md={4} lg={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={oxygen}
                      onChange={handleChange}
                      name="oxygen"
                    />
                  }
                  label="Oxygen"
                />
              </Grid>
              <Grid item xs={6} md={4} lg={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={bloodPlasma}
                      onChange={handleChange}
                      name="bloodPlasma"
                    />
                  }
                  label="Blood / Plasma"
                />
              </Grid>
              <Grid item xs={6} md={4} lg={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={ambulance}
                      onChange={handleChange}
                      name="ambulance"
                    />
                  }
                  label="Ambulance"
                />
              </Grid>
              <Grid item xs={6} md={4} lg={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={medicine}
                      onChange={handleChange}
                      name="medicine"
                    />
                  }
                  label="Medicines"
                />
              </Grid>
              <Grid item xs={6} md={4} lg={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={beds}
                      onChange={handleChange}
                      name="beds"
                    />
                  }
                  label="Beds"
                />
              </Grid>
              <Grid item xs={6} md={4} lg={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={icuBeds}
                      onChange={handleChange}
                      name="icuBeds"
                    />
                  }
                  label="ICU Beds"
                />
              </Grid>
              <Grid item xs={6} md={4} lg={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={food}
                      onChange={handleChange}
                      name="food"
                    />
                  }
                  label="Food"
                />
              </Grid>
              <Grid item xs={6} md={4} lg={2}>

                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={others}
                      onChange={handleChange}
                      name="others"
                    />
                  }
                  label="Others"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Additional Details"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              className={classes.inputBox}
              helperText="Enter additional details about amount of resources you need and mention other support or resource you need of."
              value={additionalDetails}
              onInput={(e) => setAdditionalDetails(e.target.value)}
              error={validationState && !isValidAdditionalDetails()}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={4}>
                <button className={classes.button} onClick={handleCancel}>
                  Cancel
                </button>
              </Grid>
              <Grid item xs={4}>
                <button className={classes.button} onClick={handleSubmit}>
                  Submit
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AlertDialog
        SetOpen={openConfirmationDialog}
        handleClose={() => setOpenConfirmationDialog(false)}
        title="Do you want to Agree"
        content="All your data will be publicly available in this website. Once submitted you can't change your response."
        handleConfirm={confirmPostContribution}
        confirmButtonColorSecondary={false}
      />
    </Grid>
  );
};

export default AskForHelp;
