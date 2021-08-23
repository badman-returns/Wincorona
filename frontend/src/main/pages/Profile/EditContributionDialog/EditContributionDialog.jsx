import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import isValidPinCode from './../../util/validatePinCode';
import { useHistory } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import { updateContributionPostById,deleteContributionPostById } from './../../../services/user-api'
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
const useStyles = makeStyles({
    heading: {
        fontSize: '24px',
        margin: 0,
        // color: '#696F79',
        textTransform: 'capitalize',
        '@media (max-width: 600px)': {
            fontSize: '18px',
        }
    },
    textBox: {
        border: '1.5px solid #8692A6',
        borderRadius: '6px',
        textTransform: 'capitalize',
        padding: '0 10px',
        fontWeight: '600',
        // color:'#8692A6'
    },
    subHeading: {
        color: '#8692A6',
        textTransform: 'uppercase',
        fontWeight: '500'
    },
    items: {
        margin: '0 10px'
    },
    timeStamp: {
        color: '#8692A6',
        margin: '0 15px'
    },
})

const getDate = (date) => {
    try {
        let newDate = new Date(date).toUTCString();
        let arr = newDate.split(' ').slice(1, 5);
        let timeArr = arr[3].split(':').map((str) => parseInt(str));
        let AMPMstr = 'AM';
        let hour = timeArr[0];
        let min = timeArr[1];
        let day = arr.slice(0, 3);
        let dayStr = day.join(' ');
        if (timeArr[0] > 12) {
            AMPMstr = 'PM';
            hour %= 12;
        }
        let time = `${hour > 9 ? hour : '0' + hour}:${min > 9 ? min : '0' + min
            } ${AMPMstr}`;
        return `${dayStr + ' ' + time}`;
    } catch (err) {

    }

};


const EditContributionDialog = ({ open, handleClose, data }) => {
    const { innerWidth: width } = window;
    const classes = useStyles();
    const { addToast } = useToasts();
    const history = useHistory();
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
    const [isCorrectPincode, setIsCorrectPincode] = useState(true)
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [openConfirmationDeleteDialog, setOpenConfirmationDeleteDialog] = useState(false);
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
    useEffect(() => {
        setName(data.name);
        setAdditionalDetails(data.additionalDetails);
        setPhoneNo(data.phone);
        setPinCode(data.pincode);
        setCheckBoxData({
            bloodPlasma: data.bloodPlasma || false,
            oxygen: data.oxygen || false,
            ambulance: data.ambulance || false,
            medicine: data.medicine || false,
            beds: data.beds || false,
            icuBeds: data.icuBeds || false,
            food: data.food || false,
            others: data.others || false,
        });
        return () => {
            setDefault()
        }
    }, [data])

    const isValidName = () => name !== '';
    const isValidPhoneNo = () => phoneNo !== '';
    const isValidAdditionalDetails = () => additionalDetails !== '';
    const setDefault = () => {
        
        setName('');
        setAdditionalDetails('');
        setPhoneNo('');
        setPinCode('');
        setValidationState(false);
        setCheckBoxData({
            bloodPlasma: false,
            oxygen: false,
            ambulance: false,
            medicine: false,
            beds: false,
            icuBeds: false,
            food: false,
            others: false,
        });
    }
    const confirmDeleteContribution = async () =>{
        setOpenConfirmationDeleteDialog(false)
        try {
            const res = await deleteContributionPostById(data._id)
        if (res.status === 200) {
            history.push('/user/profile');
            handleClose()
            
                
            addToast('Updated Successfully', {
                appearance: 'success',
                autoDismiss: true,
            });
            window.location.reload()
        }
        } catch (error) {
            addToast('Can not delete try again later', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
        
    }
    const handleDelete = () =>{
        setOpenConfirmationDeleteDialog(true)
    }
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
            const res = await updateContributionPostById(formData,data._id);
            if (res.status === 200) {
                addToast('Updated Successfully', {
                    appearance: 'success',
                    autoDismiss: true,
                });
                handleClose()
                setName('');
                setAdditionalDetails('');
                setPhoneNo('');
                setPinCode('');
                setValidationState(false);
                setCheckBoxData({
                    bloodPlasma: false,
                    oxygen: false,
                    ambulance: false,
                    medicine: false,
                    beds: false,
                    icuBeds: false,
                    food: false,
                    others: false,
                });
                history.push('/user/profile');
                window.location.reload()
            }
        } catch (error) {
            addToast('Can not post try again later', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
        setOpenConfirmationDialog(false);
    };


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
                        setIsCorrectPincode(true)
                        setOpenConfirmationDialog(true);
                    } else {
                        setIsCorrectPincode(false)
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
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth='md' fullWidth={true}
            fullScreen={width <= 600 && true}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                <h3 className={classes.heading}>Update Contribution</h3>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            className={classes.inputBox}
                            helperText="Enter suppliers name"
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
                            helperText="Enter suppliers Phone No"
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
                            helperText="Enter suppliers PinCode"
                            value={pinCode}
                            onInput={(e) => setPinCode(e.target.value)}
                            error={validationState && !isCorrectPincode  }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl error={validationState && !values.some((value) => value === true)}>
                            <FormLabel component="legend">
                                Check the resources you have
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
                            helperText="Enter additional details about amount of resources you have and mention other support or resource you can contribute"
                            value={additionalDetails}
                            onInput={(e) => setAdditionalDetails(e.target.value)}
                            error={validationState && !isValidAdditionalDetails()}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            justify="flex-end"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item>
                                <Button  color='secondary' variant='contained' onClick={handleDelete}>
                                    Delete
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button variant='contained' color='primary'  onClick={handleSubmit}>
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid container justify='space-between' alignItems='center'>
                    <Grid item >
                        <div>
                            <code className={classes.timeStamp}>{
                                getDate(data.createdOn)
                            }</code>
                        </div></Grid>
                    <Grid item ><Button autoFocus onClick={handleClose} color="secondary" variant='outlined'>
                        close
                    </Button></Grid>
                </Grid>
            </DialogActions>
            <AlertDialog
                SetOpen={openConfirmationDialog}
                handleClose={() => setOpenConfirmationDialog(false)}
                title="Do you want to Agree"
                content="All your data will be publicly available in this website. Once submitted you can't change your response."
                handleConfirm={confirmPostContribution}
                confirmButtonColorSecondary={false}
            />
            <AlertDialog
                SetOpen={openConfirmationDeleteDialog}
                handleClose={() => setOpenConfirmationDeleteDialog(false)}
                title="Do you want Delete"
                content="Once deleted you can not get that data back"
                handleConfirm={confirmDeleteContribution}
                confirmButtonColorSecondary={false}
            />
        </Dialog>
    )
}

export default EditContributionDialog
