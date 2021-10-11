import React, { useEffect, useState } from "react";
import { useAccessToken } from "../../hooks/useAccessToken/useAccessToken";
import { useLoginWithAccessToken } from "../../hooks/useLoginWithAccessToken/useLoginWithAccessToken";
import { io } from "socket.io-client";
import { parseTable, parseTables } from "./_tableUtils";
import { userContext } from "../../../../contexts/userContext";

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;

export const realtimeServiceContext = React.createContext(
    {
        tables: [],
        setTables: (tables) => {},
        addTable: (table) => {},
    }
);


export const RealtimeServiceContextProvider = ({ children }) => {
    /***************** data *****************/
    const [tables, setTables] = useState({});

    /***************** auth *****************/
    const [restaurantId, accessToken] = useAccessToken();
    const [loggedIn, _] = useLoginWithAccessToken(restaurantId, accessToken);
    
    /**************** socket ****************/
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!loggedIn) return;

        const newSocket = io(ENDPOINT);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [loggedIn]);

    
    useEffect(() => {
        if (socket === null) return;

        socket.on("v1.tables", data => {
            setTables(parseTables(data.tables));
            console.log("v1.tables", data);
        });
        socket.on("v1.tables.new", data => {
            setTables(tables => ({...tables, [data.table.id]: parseTable(data.table)}));
        });

    }, [socket]);

    console.log("t", tables);
    
    const [newTablesQueue, setNewTablesQueue] = useState([]);
    useEffect(() => {
        if (socket === null) return;
        if (newTablesQueue.length === 0) return;

        newTablesQueue.map(table => {
            socket.emit("v1.tables.new", {number: table});
        });
        
        setNewTablesQueue([]);
    }, [newTablesQueue, socket]);

    /************ context provider **********/
    const addTable = (table) => {
        setNewTablesQueue([...newTablesQueue, table]);
    }

    const contextProvider = {
        tables: Object.values(tables),
        setTables: () => {},
        addTable: addTable,
    };

    return <realtimeServiceContext.Provider value={contextProvider}>
        {children}
    </realtimeServiceContext.Provider>;
}
