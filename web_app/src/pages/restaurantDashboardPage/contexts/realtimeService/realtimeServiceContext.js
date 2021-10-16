import React, { useEffect, useState } from "react";
import { useAccessToken } from "../../hooks/useAccessToken/useAccessToken";
import { useLoginWithAccessToken } from "../../hooks/useLoginWithAccessToken/useLoginWithAccessToken";
import { io } from "socket.io-client";
import { parseTable, parseTables } from "./_tableUtils";
import { useSnackbar } from "notistack";
import { useQueueState } from "../../../../hooks/useQueueState/useQueueState";

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;

export const realtimeServiceContext = React.createContext(
    {
        tables: [],
        setTables: (tables) => {},
        addTable: (table) => {},
        finishTable: (id) => {},
        nextCourse: (id) => {},
    }
);


export const RealtimeServiceContextProvider = ({ children }) => {
    const {enqueueSnackbar} = useSnackbar();

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
        });
        socket.on("v1.tables.new", data => {
            setTables(tables => ({...tables, [data.table.id]: parseTable(data.table)}));
        });
        socket.on("v1.tables.finish", data => {
            const table = data.table;

            setTables(tables => {
                delete tables[table.id];
                return {...tables}
            });

            enqueueSnackbar(`table ${table.number} has been marked as finished`, {variant: 'success'});
        });
        socket.on("v1.tables.next", data => {
            const table = parseTable(data.table);

            setTables(tables => {
                tables[table.id] = table;
                return {...tables}
            });

            enqueueSnackbar(`table ${table.number} has been served... now waiting for ${table.next_course}`, {variant: 'success'});
        });
    }, [socket]);

    /************ context provider **********/

    // new
    const newItems = useQueueState();
    useEffect(() => {
        if (socket === null) return;
        if (newItems.isEmpty()) return;

        newItems.queue.map(table => {
            socket.emit("v1.tables.new", {number: table});
        });
        
        newItems.serveAll();
    }, [newItems, socket]);
    const addTable = (table) => newItems.push(table);

    // finish
    const finishedTables = useQueueState();
    useEffect(() => {
        if (socket === null) return;
        if (finishedTables.isEmpty()) return;

        finishedTables.queue.map(id => {
            socket.emit("v1.tables.finish", {id: id});
        });
        
        finishedTables.serveAll();
    }, [finishedTables, socket]);
    const finishTable = (id) => finishedTables.push(id);

    // next
    const nextTables = useQueueState();
    useEffect(() => {
        if (socket === null) return;
        if (nextTables.isEmpty()) return;

        nextTables.queue.map(id => {
            socket.emit("v1.tables.next", {id: id});
        });
        
        nextTables.serveAll();
    }, [nextTables, socket]);
    const nextCourse = (id) => nextTables.push(id);

    const contextProvider = {
        tables: Object.values(tables),
        setTables: () => {},
        addTable: addTable,
        finishTable: finishTable,
        nextCourse: nextCourse
    };

    return <realtimeServiceContext.Provider value={contextProvider}>
        {children}
    </realtimeServiceContext.Provider>;
}
