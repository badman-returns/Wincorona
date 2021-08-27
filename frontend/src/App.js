import React from 'react';
import { HashRouter, Route, Switch, } from 'react-router-dom';
import UserAdminRouter from './routes/UserAdmin';
import PublicRouter from './routes/Public';
import Header from './main/components/Header/Header';
import SuperAdminRouter from './routes/SuperAdmin';
import { ToastProvider } from 'react-toast-notifications';
function App() {
  return (
    <HashRouter>
      <ToastProvider placement="bottom-right">
        <Switch>
          {/* Super Admin  Routes */}
          <Route path='/super-admin'>
            <SuperAdminRouter />
          </Route>

          {/* User Admin  Routes */}
          <Route path='/user'>
            <Header />
            <UserAdminRouter />
          </Route>

          {/* Public Routes */}
          <Route path='/'>
            <Header />
            <PublicRouter />
          </Route>

        </Switch>
      </ToastProvider>
    </HashRouter>
  );
}

export default App;
