import { authHeader } from "../helpers/csrfCookieHeader";
import axios from "axios";

export const get = (endpoint, onThen = (data, resolve, reject) => resolve(data), onCatch = (res, resolve, reject) => reject()) => {
    return new Promise(function (resolve, reject) {
        axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/api/v1${endpoint}`,
            method: 'GET',
            headers: { 'Cache-Control': 'no-cache', ...authHeader() }
        })
            .then(res => onThen(res.data, resolve, reject))
            .catch(res => onCatch(res, resolve, reject));
    });
}

export const post = (endpoint, data, onThen = (data, resolve, reject) => resolve(data), onCatch = (res, resolve, reject) => reject()) => {
    return new Promise(function (resolve, reject) {
        axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/api/v1${endpoint}`,
            method: 'POST',
            data: data,
            headers: { 'Cache-Control': 'no-cache', ...authHeader() }
        })
            .then(res => onThen(res.data, resolve, reject))
            .catch(res => onCatch(res, resolve, reject));
    });
}

export const patch = (endpoint, id, data, onThen = (data, resolve, reject) => resolve(data), onCatch = (res, resolve, reject) => reject()) => {
    return new Promise(function (resolve, reject) {
        axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/api/v1${endpoint}/${id}`,
            method: 'PATCH',
            data: data,
            headers: { 'Cache-Control': 'no-cache', ...authHeader() }
        })
            .then(res => onThen(res.data, resolve, reject))
            .catch(res => onCatch(res, resolve, reject));
    });
}


export const remove = (endpoint, id, onThen = (res, resolve, reject) => resolve(res), onCatch = (res, resolve, reject) => reject()) => {
    return new Promise(function (resolve, reject) {
        axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/api/v1${endpoint}/${id}`,
            method: 'DELETE',
            headers: { 'Cache-Control': 'no-cache', ...authHeader() }
        })
            .then(res => onThen(res, resolve, reject))
            .catch(res => onCatch(res, resolve, reject));
    });
}
