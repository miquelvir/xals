import React, { useEffect, useState } from "react";
import { useAccessToken } from "../../hooks/useAccessToken/useAccessToken";
import { useLoginWithAccessToken } from "../../hooks/useLoginWithAccessToken/useLoginWithAccessToken";
import { io } from "socket.io-client";
import { parseTable, parseTables } from "./_tableUtils";
import { userContext } from "../../../../contexts/userContext";
import { useSnackbar } from "notistack";

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;

export const realtimeServiceContext = React.createContext(
    {
        tables: [],
        setTables: (tables) => {},
        addTable: (table) => {},
        finishTable: (id) => {},
        nextCourse: (id) => {}
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
            const table = data.table;

            setTables(tables => {
                tables[table.id] = parseTable(table);
                return {...tables}
            });

            enqueueSnackbar(`table ${table.number} has been served... now waiting for ${table.next_course}`, {variant: 'success'});
        });
    }, [socket]);

    /************ context provider **********/

    // new
    const [newTablesQueue, setNewTablesQueue] = useState([]);
    useEffect(() => {
        if (socket === null) return;
        if (newTablesQueue.length === 0) return;

        newTablesQueue.map(table => {
            socket.emit("v1.tables.new", {number: table});
        });
        
        setNewTablesQueue([]);
    }, [newTablesQueue, socket]);
    const addTable = (table) => {
        setNewTablesQueue([...newTablesQueue, table]);
    }

    // finish
    const [finishTablesQueue, setFinishTablesQueue] = useState([]);
    useEffect(() => {
        if (socket === null) return;
        if (finishTablesQueue.length === 0) return;

        finishTablesQueue.map(id => {
            socket.emit("v1.tables.finish", {id: id});
        });
        
        setFinishTablesQueue([]);
    }, [finishTablesQueue, socket]);
    const finishTable = (id) => {
        setFinishTablesQueue([...finishTablesQueue, id]);
    }

    // next
    const [nextTablesQueue, setNextCourseQueue] = useState([]);
    useEffect(() => {
        if (socket === null) return;
        if (nextTablesQueue.length === 0) return;

        nextTablesQueue.map(id => {
            socket.emit("v1.tables.next", {id: id});
        });
        
        setNextCourseQueue([]);
    }, [nextTablesQueue, socket]);
    const nextCourse = (id) => {
        setNextCourseQueue([...nextTablesQueue, id]);
    }


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
