import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContributeBanner from './Components/ContributeBanner/ContributeBanner';
import GetHelpSearch from './Components/AskForHelpSearch/AskForHelpSearch';
import HelpUs from './Components/HelpUs/HelpUs';
import ContactUs from './Components/ContactUs/ContactUs';
import Grid from '@material-ui/core/Grid';
import DisclaimerDialog from '../../components/DisclaimerDialog/DisclaimerDialog';

const Home = ({ getHelpPosts, setSearchQuery }) => {

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleOnClick = (e) => {
    setOpenConfirmationDialog(true);
  }

  return (
    <Grid container justify='center' alignItems='center' >
      <Grid item xs={12} md={11} >
        <ContributeBanner />
        <GetHelpSearch setSearchQuery={setSearchQuery} />
        <HelpUs getHelpPosts={getHelpPosts} />
        <ContactUs />
        <Grid item xs={12}>
          <Grid container justify='space-between' alignItems='center' style={{ marginBottom: '10px' }}>
            <Grid item>
              <Link onClick={(e) => handleOnClick(e)} style={{ textDecoration: "none" }}>Disclaimer</Link>
              <DisclaimerDialog
                SetOpen={openConfirmationDialog}
                handleClose={() => setOpenConfirmationDialog(false)}
                confirmButtonColorSecondary={false}
              />
            </Grid>
            <Grid item>
              <p>&copy;Copyright 2021 by <a href="https://www.artificialbrix.com/" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>Artificial Brix</a></p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
};

export default Home;
