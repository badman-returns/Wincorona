import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import isValidPinCode from '../../../util/validatePinCode'
import { useToasts } from 'react-toast-notifications';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
  heading: {
    fontSize: '24px',
    margin: '8px 0',
    '@media (max-width: 600px)': {
      fontSize: '20px',
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
    margin: '16px 0',
    '@media (max-width: 600px)': {
      margin: '12px 0',
    },
  },
  textBoxLabel:{
    color:'rgba(0, 0, 0, 0.7)',
    fontFamily:'Inter',
  },
  searchButton: {
    width: '100%',
    padding: '16px',
    color: 'white',
    backgroundColor: '#6045E2',
    fontWeight: '700',
    borderRadius: '4px',
    border: 'none',
    margin: '16px 0',
    cursor: 'pointer',
    '@media (max-width: 600px)': {
      padding: '12px',
      margin: '10px 0',
    },
  },
});

const GetHelp = ({setSearchQuery}) => {
  const { addToast } = useToasts();
  const history = useHistory();
  const classes = useStyles();
  const [pinCode, setPinCode] = useState('');
  const [validationState, setValidationState] = useState(false);
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
  const {
    bloodPlasma,
    oxygen,
    ambulance,
    medicine,
    beds,
    icuBeds,
    food,
    others,
  } = checkBoxData;
  const values = [bloodPlasma, oxygen, ambulance, medicine, beds, icuBeds, food, others];
  const handleChange = (event) => {
    setCheckBoxData({
      ...checkBoxData,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClickSearch = async()=>{
    setValidationState(true);
    if(pinCode.length === 6 && values.some((value)=>value===true)){
       await isValidPinCode(pinCode)
        .then((res) => {
          if (res) {
            setSearchQuery({
              pincode:pinCode,
              ...checkBoxData
            })
            history.push('/get-help');
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
          addToast('Error in search', {
            appearance: 'error',
            autoDismiss: true,
          });
        });
    }
   
  }

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12}>
        <h3 className={classes.heading}>Get Help</h3>
      </Grid>
      <Grid item xs={12}>
        <FormLabel className={classes.text}>Please Enter these necessary details</FormLabel>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Pincode"
          variant="outlined"
          fullWidth
          className={classes.inputBox}
          value={pinCode}
          onInput={(e) => setPinCode(e.target.value)}
          helperText='Enter your pincode'
          error={validationState && pinCode.length !== 6}
        />
      </Grid>
      <Grid item xs={12}>
      <FormControl error={validationState && !values.some((value)=>value===true)}>

        <FormLabel className={classes.text}>
          Check minimum one resources you need
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
              className={classes.textBoxLabel}
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
              className={classes.textBoxLabel}
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
              className={classes.textBoxLabel}
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
              className={classes.textBoxLabel}
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
              className={classes.textBoxLabel}
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
              className={classes.textBoxLabel}
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
              className={classes.textBoxLabel}
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
              className={classes.textBoxLabel}
              label="Others"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <button className={classes.searchButton} onClick={handleClickSearch}>SEARCH</button>
      </Grid>
    </Grid>
  );
};

export default GetHelp;
