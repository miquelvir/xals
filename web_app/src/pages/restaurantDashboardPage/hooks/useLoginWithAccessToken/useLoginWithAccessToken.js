import React, { useEffect, useState } from "react";
import { attemptLogin } from "../../services/loginWithAccessToken";
import { useSnackbar } from 'notistack';
import { userContext, TYPE_ACCESS_TOKEN } from "../../../../contexts/userContext";

/**
 * useLoginWithAccessToken returns a bool (true if correctly logged in)
 * 
 * @returns a bool (loggedIn)
 */
export const useLoginWithAccessToken = (restaurantId, accessToken) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userCtx = React.useContext(userContext);
    
    useEffect(() => {
        userCtx.setType(null);
        attemptLogin(restaurantId, accessToken)
            .then(([isValid, params]) => {
                if (!isValid) {
                    enqueueSnackbar("you can't access this page", {variant: 'warning'});
                    return;
                }
                userCtx.setType(TYPE_ACCESS_TOKEN);
                userCtx.setParams(params);
            })
            .catch(_ => enqueueSnackbar('something went wrong', {variant: 'error'}));
    }, [restaurantId, accessToken]);

    return [userCtx.loggedIn, () => userCtx.setType(TYPE_ACCESS_TOKEN)];
};