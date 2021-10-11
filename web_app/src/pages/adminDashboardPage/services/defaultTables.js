import {get, post, remove} from '../../../services/crudApi';

const getEndpoint = (restaurantId) => `/restaurants/${restaurantId}/defaultTables`;

export const getRestaurantDefaultTables = (restaurantId) => {
    return get(
        getEndpoint(restaurantId),
        (data, resolve, _) => resolve(data['default_tables'])
    );
};

export const postRestaurantDefaultTables = (restaurantId, name) => {
    return post(
        getEndpoint(restaurantId),
        {
            name: name
        },
        (data, resolve, _) => resolve(data['default_table'])
    );
};


export const deleteRestaurantDefaultTables = (restaurantId, name) => {
    return remove(
        getEndpoint(restaurantId),
        name
    );
}
