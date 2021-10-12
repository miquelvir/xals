import {get, post, remove} from '../../../services/crudApi';

const getEndpoint = (restaurantId) => `/restaurants/${restaurantId}/administrators`;

export const getRestaurantAdministrators = (restaurantId) => {
    return get(
        getEndpoint(restaurantId),
        (data, resolve, _) => resolve(data['administrators'])
    );
};

export const postRestaurantAdministrator = (restaurantId, email) => {
    return post(
        getEndpoint(restaurantId),
        {
            email: email
        },
        (data, resolve, _) => resolve(data['administrator'])
    );
};


export const deleteRestaurantAdministrator = (restaurantId, id) => {
    return remove(
        getEndpoint(restaurantId),
        id
    );
}
