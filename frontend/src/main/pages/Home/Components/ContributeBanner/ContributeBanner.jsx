import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HeaderImage from './../../../../../assets/fight.png';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(80.06deg, #6045E2 0.83%, #6F50FF 100%)',
    margin: '20px 0',
    borderRadius: '4px',
    cursor: "pointer",
    padding:'5px',
    '@media (max-width: 600px)' : {
      margin:'10px 0px',
    }
  },
  image: {
    maxWidth:'100%',
  },
  heading: {
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ffffff',
    margin:'10px 0',
    '@media (max-width: 600px)' : {
      fontSize: '12px',
      margin:'4px 0',
    }
  },
  text: {
    color: '#ffffff',
    margin: '0',
    fontWeight: '300',
    fontFamily: 'Poppins',
    fontSize:'14px',
    '@media (max-width: 600px)' : {
      fontSize: '8px',
    }
  },
  icon:{
    fontSize:'1.5rem',
    '@media (max-width: 600px)' : {
      fontSize:'1rem',
    }
  }
});

const ContributeCard = () => {
  const { addToast } = useToasts();
  const classes = useStyles();
  const history = useHistory();
  const handelClick = () =>{
    const token = sessionStorage.getItem('token');
    if (!token){
      addToast('You need to Login before Contribute', {
        appearance: 'info',
        autoDismiss: true,
      });
      history.push('/login');
    }else{
      history.push('/contribute');
    }
  }

  return (
    <Grid container justify="center" alignItems="center" className={classes.root} onClick={handelClick}>
      <Grid item xs={10}>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item xs={4}>
              <img src={HeaderImage} alt='support' className={classes.image} />
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={12}>
                <h3 className={classes.heading}>Enter your lead</h3>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.text}>We have been working hand in hand to fight against this pandemic situation.</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <div style={{color:'white'}}>
              <ArrowForwardIosIcon className={classes.icon}/>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContributeCard;
