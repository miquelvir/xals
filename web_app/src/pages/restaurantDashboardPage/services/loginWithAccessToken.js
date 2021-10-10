import { authHeader } from "../../../helpers/csrfCookieHeader";
import axios from "axios";

export const attemptLogin = (restaurantId, accessToken) => {
    return new Promise(function(resolve, reject) {
        axios({url: `${process.env.REACT_APP_BACKEND_URL}/auth/v1/login/accessToken`,
            method: 'POST',
            auth: {
                username: restaurantId,
                password: accessToken
            },
            headers: {'Cache-Control': 'no-cache', ...authHeader()}
        })
        .then(_ => resolve(true))
        .catch(function (res) {
            try { if (res["response"]["status"] === 401) resolve(false) } catch(err){}
            reject(res);
        });
    });
}

