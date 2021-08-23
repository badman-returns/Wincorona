import React, { useEffect, useState} from 'react';
import { Route } from 'react-router-dom'
import * as jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

const SuperAdminRoute = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const history = useHistory();
  useEffect(() => {
    let token = sessionStorage.getItem('admin')
        if(token){
            let tokenData = jwt.decode(token)
            let tokenExpiration = tokenData.exp;
            let dateNow = new Date();
            if(tokenData.role === 'admin' && tokenExpiration > dateNow.getTime()/1000){
                setIsAuthenticated(true)
            }else{
                setIsAuthenticated(false)
            }
        } else {
           setIsAuthenticated(false)
        }
  }, [])

  if(isAuthenticated === null){
    return <></>
  }

  const redirectToLogin = () =>{
     history.push('/super-admin/login');
      window.location.reload();
  }

  return(
    <>
    {!isAuthenticated?(
      <>{
     redirectToLogin()
      }</>
    ) : <Route exact={props.exact} path={props.path}> {props.children}</Route>}
    </>
  )
};

export default SuperAdminRoute;