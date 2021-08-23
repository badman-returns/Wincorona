import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import SuperAdminRoute from './../utility/SuperAdminRouter'
import BackGroundData from './../assets/background.svg';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dashboard from '../admin/components/Dashboard/Dashboard';
import Header from '../admin/components/Header/Header';
import DashboardPage from '../admin/pages/Dashboard/DashboardPage';
import { getAdminContactData, getAdminContributiontData, getAdminHelptData, getAdminUserData } from '../admin/services/index';
import ContributionsPage from '../admin/pages/Contribuition/ContributionPage';
import HelpPage from '../admin/pages/Helps/HelpPage';
import UserPage from '../admin/pages/User/UserPage';
import ContactPage from '../admin/pages/Contact/ContactPage';

const useStyles = makeStyles({
    root: {
        backgroundImage: `url(${BackGroundData})`,
        width: '100%',
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

const SuperAdminRouter = () => {

    const [user, setUser] = useState([]);
    const [help, setHelp] = useState([])
    const [contact, setContact] = useState([]);
    const [contribution, setContribution] = useState([]);

    const refreshUserData = () => {
        getAdminUserData().then((res) => setUser(res || [])).catch((err) => console.log(err));
    }
    const refreshHelpData = () => {
        getAdminHelptData().then((res) => setHelp(res || [])).catch((err) => console.log(err));
    }
    const refreshContactData = () => {
        getAdminContactData().then((res) => setContact(res || [])).catch((err) => console.log(err));
    }
    const refreshContributionData = () => {
        getAdminContributiontData().then((res) => setContribution(res || [])).catch((err) => console.log(err));
    }

    useEffect(() => {
        refreshUserData();
        refreshHelpData();
        refreshContactData();
        refreshContributionData();
        return () => {
        }
    }, []);

    const classes = useStyles();

    return (
        <div>
            <Container className={classes.container}>
                <Header />

                <Dashboard />
                <Switch>
                    <SuperAdminRoute exact path='/super-admin/dashboard'>
                        <DashboardPage userData={user} helpData={help} contactData={contact} contributionData={contribution} />
                    </SuperAdminRoute>
                    <SuperAdminRoute exact path='/super-admin/contributions'>
                        <ContributionsPage contributionData={contribution} refreshContributionData={refreshContributionData} />
                    </SuperAdminRoute>
                    <SuperAdminRoute exact path='/super-admin/help'>
                        <HelpPage helpData={help} refreshHelpData={refreshHelpData} />
                    </SuperAdminRoute>
                    <SuperAdminRoute exact path='/super-admin/users'>
                        <UserPage users={user} refreshUserData={refreshUserData} />
                    </SuperAdminRoute>
                    <SuperAdminRoute exact path='/super-admin/contact'>
                        <ContactPage contactData={contact} refreshContactData={refreshContactData} />
                    </SuperAdminRoute>
                </Switch>
            </Container>
        </div>

    )
}

export default SuperAdminRouter
