import { authHeader } from "../../../helpers/csrfCookieHeader";
import axios from "axios";

export const attemptLogin = (token) => {
    return new Promise(function(resolve, reject) {
        axios({url: `${process.env.REACT_APP_BACKEND_URL}/auth/v1/login/google`,
            method: 'POST',
            auth: {
                username: '',
                password: token
            },
            headers: {'Cache-Control': 'no-cache', ...authHeader()}
        })
        .then(res => resolve([true, res.data]))
        .catch(function (res) {
            try { if (res["response"]["status"] === 401) resolve(false) } catch(err){}
            reject(res);
        });
    });
}

