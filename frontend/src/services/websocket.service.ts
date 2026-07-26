import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ENVS } from "@/config/constants";

let client: Client | null = null;

export function connectWebSocket(
    onNotification: (notification: any) => void
) {
    if (client?.active) return;
    client = new Client({
        webSocketFactory: () =>
            new SockJS(`${ENVS.API_URL}/ws`),
        reconnectDelay: 5000,
        onConnect: () => {
            console.log("WebSocket conectado");
            client?.subscribe(
                "/topic/notifications",
                (message) => {
                    const notification = JSON.parse(message.body);
                    onNotification(notification);
                }
            );
        },
        onDisconnect: () => {
            console.log("WebSocket desconectado");
        },
        onStompError: (frame) => {
            console.error(frame);
        }
    });
    client.activate();
}

export function disconnectWebSocket() {
    client?.deactivate();
}