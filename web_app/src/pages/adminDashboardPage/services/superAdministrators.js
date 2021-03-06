import {get, post, remove} from '../../../services/crudApi';

const ENDPOINT = '/administrators/super';

export const getSuperAdministrators = () => {
    return get(
        ENDPOINT,
        (data, resolve, _) => resolve(data['administrators'])
    );
};

export const postSuperAdministrator = (email) => {
    return post(
        ENDPOINT,
        {
            email: email
        },
        (data, resolve, _) => resolve(data['administrator'])
    );
};


export const deleteSuperAdministrator = (id) => {
    return remove(
        ENDPOINT,
        id
    );
}
