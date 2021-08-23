import React from 'react';
import { Switch } from 'react-router-dom';
import AdminRoute from '../utility/AdminRouter';
import Profile from '../main/pages/Profile/Profile'
const UserAdminRouter = () => {
    return (
            <Switch>
                <AdminRoute exact path='/user/profile'>
                        <Profile/>
                </AdminRoute>
            </Switch>

    )
}

export default UserAdminRouter
