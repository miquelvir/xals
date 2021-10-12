import {get, post, remove, patch} from '../../../services/crudApi';

const ENDPOINT = '/restaurants';

export const getRestaurants = () => {
    return get(
        ENDPOINT,
        (data, resolve, _) => resolve(data['restaurants'])
    );
};

export const getRestaurant = (id) => {
    return get(
        `${ENDPOINT}/${id}`,
        (data, resolve, _) => resolve(data['restaurant'])
    );
};


export const postRestaurant = (name) => {
    return post(
        ENDPOINT,
        {
            name: name
        },
        (data, resolve, _) => resolve(data['restaurant'])
    );
};


export const deleteRestaurant = (id) => {
    return remove(
        ENDPOINT,
        id
    );
}

export const patchRestaurant = (id, data) => {
    return patch(
        ENDPOINT,
        id,
        data,
        (data, resolve, _) => resolve(data['restaurant'])
    );
}

