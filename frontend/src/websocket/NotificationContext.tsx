"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import {
    connectWebSocket,
    disconnectWebSocket,
} from "@/services/websocket.service";

export interface Notification {
    type: string;
    title: string;
    message: string;
    unread: number;
    read: number;
    all: number;
}

interface NotificationContextType {
    unread: number;
    read: number;
    all: number;
    notification: Notification | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

interface Props {
    children: ReactNode;
}

export function NotificationProvider({ children }: Props) {
    const [notification, setNotification] = useState<Notification | null>(null);
    const [unread, setUnread] = useState(0);
    const [read, setRead] = useState(0);
    const [all, setAll] = useState(0);

    useEffect(() => {
        connectWebSocket((data: Notification) => {
            console.log("Nueva notificación:", data);

            setNotification(data);
            setUnread(data.unread);
            setRead(data.read);
            setAll(data.all);
        });

        return () => {
            disconnectWebSocket();
        };
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                unread,
                read,
                all,
                notification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotification debe usarse dentro de NotificationProvider"
        );
    }

    return context;
}