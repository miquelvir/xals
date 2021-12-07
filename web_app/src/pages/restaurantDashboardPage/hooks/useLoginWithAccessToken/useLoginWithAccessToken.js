import React, { useEffect, useState } from "react";
import { attemptLogin } from "../../services/loginWithAccessToken";
import { useSnackbar } from 'notistack';
import { userContext, TYPE_ACCESS_TOKEN } from "../../../../contexts/userContext";
import { useTranslation } from 'react-i18next';

/**
 * useLoginWithAccessToken returns a bool (true if correctly logged in)
 * 
 * @returns a bool (loggedIn)
 */
export const useLoginWithAccessToken = (restaurantId, accessToken) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const userCtx = React.useContext(userContext);
    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        userCtx.setType(null);
        attemptLogin(restaurantId, accessToken)
            .then(([isValid, params]) => {
                if (!isValid) {
                    enqueueSnackbar(t("errorPageAccess"), {variant: 'warning'});
                    return;
                }
                userCtx.setType(TYPE_ACCESS_TOKEN);
                userCtx.setParams(params);
            })
            .catch(_ => enqueueSnackbar(t("something went wrong"), {variant: 'error'}));
    }, [restaurantId, accessToken]);

    return [userCtx.loggedIn, () => userCtx.setType(TYPE_ACCESS_TOKEN)];
};