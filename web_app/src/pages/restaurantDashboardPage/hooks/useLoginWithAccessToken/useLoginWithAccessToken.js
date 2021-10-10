import { useEffect, useState } from "react";
import { attemptLogin } from "../../services/loginWithAccessToken";
import { useSnackbar } from 'notistack';


/**
 * useLoginWithAccessToken returns a bool (true if correctly logged in)
 * 
 * @returns a bool (loggedIn)
 */
export const useLoginWithAccessToken = (restaurantId, accessToken) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(false);
        attemptLogin(restaurantId, accessToken)
            .then(isValid => {
                if (!isValid) {
                    enqueueSnackbar("you can't access this page", {variant: 'warning'});
                    return;
                }
                setLoggedIn(true);
            })
            .catch(_ => enqueueSnackbar('something went wrong', {variant: 'error'}));
    }, [restaurantId, accessToken]);

    return [loggedIn, setLoggedIn];
};