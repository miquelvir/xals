import React, { useEffect, useState } from "react";
import { useAccessToken } from "../../hooks/useAccessToken/useAccessToken";
import { useLoginWithAccessToken } from "../../hooks/useLoginWithAccessToken/useLoginWithAccessToken";
import { startSocket } from "./_socketService";

export const realtimeServiceContext = React.createContext(
    {
        tables: [],
        restaurant: {},
    }
);

export const RealtimeServiceContextProvider = ({ children }) => {
    /***************** data *****************/
    const [tables, setTables] = useState([]);
    const [restaurant, setRestaurant] = useState({
        'name': '...'
    });

    /***************** auth *****************/
    const [restaurantId, accessToken] = useAccessToken();
    const [loggedIn, _] = useLoginWithAccessToken(restaurantId, accessToken);
    
    /****************************************/
    useEffect(() => {
        if (!loggedIn) return;
        return startSocket();
    }, [loggedIn])

    /************ context provider **********/
    const contextProvider = {
        tables: tables,
        restautant: restaurant
    };

    return <realtimeServiceContext.Provider value={contextProvider}>
        {children}
    </realtimeServiceContext.Provider>;
}
