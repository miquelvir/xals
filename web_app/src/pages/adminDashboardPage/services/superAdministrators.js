import {get, post, remove} from '../../../services/crudApi';

const ENDPOINT = '/administrators/super';

export const getSuperAdministrators = () => {
    return get(
        ENDPOINT,
        (data, resolve, _) => resolve(data['administrators'])
    );
};

export const postSuperAdministrator = (name) => {
    return post(
        ENDPOINT,
        {
            email: name
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
