import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import DehazeIcon from '@material-ui/icons/Dehaze';
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

    const [openDrawer, setOpenDrawer] = useState(false)
    const classes = useStyles();
    const DrawerItem = () => {
        return (
            <div className={classes.drawerContainer} onClick={() => setOpenDrawer(false)}>
                <List>
                    <ListItem button component={Link} to='/super-admin/dashboard' >
                        <ListItemText primary='Dashboard'></ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to='/super-admin/contributions' >
                        <ListItemText primary='Contributions Lists'></ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to='/super-admin/help'>
                        <ListItemText primary='Helps Lists'></ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to='/super-admin/users'>
                        <ListItemText primary='Users Lists'></ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to='/super-admin/contact'>
                        <ListItemText primary="Contacts Lists"></ListItemText>
                    </ListItem>
                    <Divider />
                </List>
            </div>
        )
    }


    
    return (
        <div>
            <div className={classes.headerContainer}>
                <AppBar position="absolute" color='inherit' className={classes.header}>
                    <Grid container justify='flex-start' alignItems='center'>
                        <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.iconButton}>
                            <DehazeIcon />
                        </IconButton>
                        <p>
                            Dashboard
                          </p>
                    </Grid>
                </AppBar>
            </div>
            <Drawer
                className={classes.drawerPermanent}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <DrawerItem />
            </Drawer>
            <Drawer
                className={classes.drawer}
                variant="temporary"
                anchor='left'
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                classes={{
                    paper: classes.drawerPaper1,
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <DrawerItem />
            </Drawer>
        </div>
    );



}



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        color: '#ffff',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        marginTop: '60px',

    },
    drawerPaper1: {
        width: drawerWidth,
        marginTop: '105px',
    },
    drawerContainer: {
        overflow: 'auto',
    },
    header: {
        width: '100%',
        marginLeft: '220px',
        marginTop: '60px',
        '@media (max-width: 600px)': {
            marginTop: '52px',
            marginLeft: '0px',
        }

    },
    drawerPermanent: {
        width: drawerWidth,
        flexShrink: 0,
        '@media (max-width: 600px)': {
            display: 'none'
        }
    },
    iconButton: {
        display: 'none',
        '@media (max-width: 600px)': {
            display: 'block'
        }
    }
}));

export default AdminDashboard;