import {GoogleLogin} from 'react-google-login';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { userContext } from '../../contexts/userContext';
import { attemptLogin } from './services/loginWithGoogle';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LoginPage() {
  const { enqueueSnackbar } = useSnackbar();
  const userCtx = React.useContext(userContext);
  
  let history = useHistory();
  const location = useLocation();

  
  const onSuccess = (res) => {
    attemptLogin(res.tokenObj.id_token)
    .then(([loggedIn, data]) => {
      if (!loggedIn){
        enqueueSnackbar("user does not exist", {variant: 'warning'});
        return;
      }
      userCtx.setType(data.type);
      userCtx.setParams(data);
      const {from} = location.state || {from: {pathname: "/admin"}};
      history.push(from);
      enqueueSnackbar("logged in", {variant: 'success'});
    })
    .catch(() => {
      enqueueSnackbar("unable to log in with the server", {variant: 'error'});
    })
  }
  
  const onFailure = (res) => {
    enqueueSnackbar("unable to log in with Google", {variant: 'error'});
  }

  return <div className="flex items-center justify-center h-screen">
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'} />
  </div>;
}

export default LoginPage;