import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import BackGroundData from './../assets/background.svg';
import { makeStyles } from '@material-ui/core/styles';
import ContributeUs from '../main/pages/ContributeUs/ContributeUs';
import Container from '@material-ui/core/Container';
import Home from '../main/pages/Home/Home';
import NeedHelp from '../main/pages/NeedHelp/NeedHelp';
import AskForHelp from '../main/pages/AskForHelp/AskForHelp';
import { getHelpPost } from '../main/services/help-api';
import SearchForHelp from '../main/pages/SearchForHelp/SearchForHelp';
import ScrollToTop from '../utility/scroll-to-top';
import Login from '../main/pages/Login/Login';
import Register from '../main/pages/Register/Register';
import SuperAdminLogin from './../admin/pages/Login/SuperAdminLogin';
import ForgetPassword from '../main/pages/ForgetPassword/forgetPass';

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${BackGroundData})`,
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: '18px 0 0 0',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    marginTop: '50px',
    '@media (max-width: 600px)': {
      marginTop: '35px'
    }
  },
});

const PublicRouter = () => {
  const classes = useStyles();
  const [getHelpPosts, setGetHelpPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    pincode: '',
    bloodPlasma: false,
    oxygen: false,
    ambulance: false,
    medicine: false,
    beds: false,
    food: false,
    others: false,
  });
  const fetchGetHelpPost = async () => {
    const res = await getHelpPost();
    setGetHelpPosts(res || []);
  };

  useEffect(() => {
    fetchGetHelpPost();
    return () => { };
  }, []);

  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.container}>
        <ScrollToTop />

        <Switch>
          {/* Super Admin Routes */}
          <Route exact path='/private/login'>
            <SuperAdminLogin />
          </Route>
          {/* Login Routes */}
          <Route exact path='/login'>
            <Login />
          </Route>
          {/* Register Routes */}
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route exact path="/get-help">
            <SearchForHelp searchQuery={searchQuery} />
          </Route>
          <Route exact path="/ask-for-help">
            <AskForHelp fetchGetHelpPost={fetchGetHelpPost} />
          </Route>
          <Route exact path="/help-us-posts">
            <NeedHelp getHelpPosts={getHelpPosts} />
          </Route>
          <Route exact path="/contribute">
            <ContributeUs fetchGetHelpPost={fetchGetHelpPost} />
          </Route>
          <Route exact path="/">
            <Home
              getHelpPosts={getHelpPosts}
              setSearchQuery={setSearchQuery}
            />
          </Route>
          <Route exact path="/forget-password">
            <ForgetPassword />
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default PublicRouter;
