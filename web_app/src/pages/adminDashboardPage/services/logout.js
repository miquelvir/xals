import { authHeader } from "../../../helpers/csrfCookieHeader";
import axios from "axios";

export const logout = () => {
    return new Promise(function(resolve, reject) {
        axios({url: `${process.env.REACT_APP_BACKEND_URL}/auth/v1/logout`,
            method: 'POST',
            headers: {'Cache-Control': 'no-cache', ...authHeader()}
        })
        .then(_ => resolve())
        .catch(_ => reject());
    });
}

