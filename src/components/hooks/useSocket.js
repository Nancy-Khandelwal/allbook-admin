import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (serverUrl) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io(serverUrl);

        setSocket(socketInstance);

        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
                setSocket(null);
            }
        };
    }, [serverUrl]);

    return socket;
};

export default useSocket;