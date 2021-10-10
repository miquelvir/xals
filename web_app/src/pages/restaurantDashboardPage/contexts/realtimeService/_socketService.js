import socketIOClient from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;
export const startSocket = () => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("FromAPI", data => {
      console.log(data);
    });
    
    // clean up
    return () => socket.disconnect();
}