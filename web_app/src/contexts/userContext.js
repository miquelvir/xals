import React, { useState } from "react";


export const TYPE_ACCESS_TOKEN = 'accessToken';
export const TYPE_RESTAURANT_ADMIN = 'restaurantAdmin';
export const TYPE_SUPER_ADMIN = 'superAdmin';

export const userContext = React.createContext(
    {
        type: null,
        setType: (type) => {},
        params: {},
        setParams: (params) => {},
        loggedIn: false,
        isRestaurantAdminLoggedIn: false,
        isSuperAdminLoggedIn: false,
    }
);

export const UserContextProvider = ({ children }) => {
    const [type, setType] = useState(null);
    const [params, setParams] = useState({});

    const loggedIn = type !== null;
    const isRestaurantAdminLoggedIn = type === TYPE_RESTAURANT_ADMIN;
    const isSuperAdminLoggedIn = type === TYPE_SUPER_ADMIN;

    const contextProvider = {
      type: type,
      setType: setType,
      params: params,
      setParams: setParams,
      loggedIn: loggedIn,
      isRestaurantAdminLoggedIn: isRestaurantAdminLoggedIn,
      isSuperAdminLoggedIn: isSuperAdminLoggedIn
    };

    return <userContext.Provider value={contextProvider}>
        {children}
    </userContext.Provider>;
}
