import {get, post, patch, remove} from '../../../services/crudApi';

const getEndpoint = (restaurantId) => `/restaurants/${restaurantId}/accessTokens`;

export const getRestaurantAccessTokens = (restaurantId) => {
    return get(
        getEndpoint(restaurantId),
        (data, resolve, _) => resolve(data['access_tokens'])
    );
};

export const postRestaurantAccessToken = (restaurantId, comment) => {
    return post(
        getEndpoint(restaurantId),
        {
            comment: comment
        },
        (data, resolve, _) => resolve(data['access_token'])
    );
};


export const deleteRestaurantAccessToken = (restaurantId, id) => {
    return remove(
        getEndpoint(restaurantId),
        id
    );
}


export const patchRestaurantAccessToken = (restaurantId, id, comment) => {
    return patch(
        getEndpoint(restaurantId),
        id,
        {
            comment: comment
        },
        (data, resolve, _) => resolve(data['access_token'])
    );
};
