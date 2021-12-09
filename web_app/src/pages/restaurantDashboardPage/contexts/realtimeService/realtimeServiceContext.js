import React, { useEffect, useState } from "react";
import { useAccessToken } from "../../hooks/useAccessToken/useAccessToken";
import { useLoginWithAccessToken } from "../../hooks/useLoginWithAccessToken/useLoginWithAccessToken";
import { io } from "socket.io-client";
import { parseTable, parseTables } from "./_tableUtils";
import { useSnackbar } from "notistack";
import { useQueueState } from "../../../../hooks/useQueueState/useQueueState";
import { useTranslation } from 'react-i18next';

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;


export const realtimeServiceContext = React.createContext(
    {
        tables: [],
        setTables: (tables) => {},
        addTable: (table) => {},
        finishTable: (id) => {},
        nextCourse: (id) => {},
        deleteTable: (id) => {},
        /*onCourseServed: {
            suscribe: (fun) => {},
            unsuscribe: (fun) => {}
        }*/
    }
);


export const RealtimeServiceContextProvider = ({ children }) => {
    const {enqueueSnackbar} = useSnackbar();

    /***************** data *****************/
    const [tables, setTables] = useState({});

    /***************** auth *****************/
    const [restaurantId, accessToken] = useAccessToken();
    const [loggedIn, _] = useLoginWithAccessToken(restaurantId, accessToken);
    
    /*********** onCourseServed callback ****/
    /*const onCourseServedCallbacks = useQueueState([]);
    const _onCourseServed = {
        suscribe: (fun) => onCourseServedCallbacks.push(fun),
        unsuscribe: (fun) => onCourseServedCallbacks.serve(fun)
    };
    const onCourseServed = (table) => {
        onCourseServedCallbacks.queue.forEach(callback => callback(table));
    }*/

    /**************** socket ****************/
    const [socket, setSocket] = useState(null);

    const { t, i18n } = useTranslation();

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

            enqueueSnackbar(`${t("table")} ${table.number} ${t("markedFinish")}`, {variant: 'success'});
        });
        socket.on("v1.tables.next", data => {
            const table = parseTable(data.table);

            setTables(tables => {
                tables[table.id] = table;
                return {...tables}
            });

            enqueueSnackbar(`${t("table")} ${table.number} ${t("servedWaiting")} ${t(table.next_course)}`, {variant: 'success'});
        });
        socket.on("v1.tables.delete", data => {
            const table = data.table;

            setTables(tables => {
                delete tables[table.id];
                return {...tables}
            });

            enqueueSnackbar(`${t("table")} ${table.number} ${t("has been deleted")}`, {variant: 'warning'});
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

        nextTables.queue.map(table => {
            socket.emit("v1.tables.next", {id: table.id, name: table.name});
            console.log(table);
        });
        
        nextTables.serveAll();
    }, [nextTables, socket]);

    const nextCourse = (id, desserts = false) => {
        console.log(tables[id], tables[id].next_course);
        nextTables.push({id: id, name: desserts? 'desserts': parseInt(tables[id].next_course)+1})
    };

    // delete
    const deleteTables = useQueueState();
    useEffect(() => {
        if (socket === null) return;
        if (deleteTables.isEmpty()) return;

        deleteTables.queue.map(id => {
            socket.emit("v1.tables.delete", {id: id});
        });
        
        deleteTables.serveAll();
    }, [deleteTables, socket]);
    const deleteTable = (id) => deleteTables.push(id);

    const contextProvider = {
        tables: Object.values(tables),
        setTables: () => {},
        addTable: addTable,
        finishTable: finishTable,
        nextCourse: nextCourse,
        deleteTable: deleteTable,
        // onCourseServed: _onCourseServed
    };

    return <realtimeServiceContext.Provider value={contextProvider}>
        {children}
    </realtimeServiceContext.Provider>;
}
