import {Redirect, Route} from 'react-router-dom';
import React from "react";
import {userContext} from '../contexts/userContext';

function PrivateRoute({ component: Component, type = null, ...rest }) {
    const userCtx = React.useContext(userContext);
    return (
        <Route {...rest} render={props =>
        {
          if (!userCtx.loggedIn || (type !== null && !type.includes(userCtx.type))) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: `/login`, state: { from: props.location } }} />
            }

            // authorised so return component
            return <Component {...props} {...rest}/>
      }}/>
    );
}


export default PrivateRoute;