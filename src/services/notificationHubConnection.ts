import { type HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useAuthStore } from "@/stores/auth";
import type { NotificationResponseDto } from "./dtos/responseDtos";

let connection: HubConnection | undefined;
type NotificationReceivedHandler =
    (responseDto: NotificationResponseDto) => any;

export function useNotificationHubConnection(
        notificationReceivedHandler: NotificationReceivedHandler): HubConnection {
    if (!connection) {
        return establishConnection(notificationReceivedHandler);
    }
    return connection;
}

function establishConnection(
        notificationReceivedHandler: NotificationReceivedHandler): HubConnection {
    // Use auth store to get the access token.
    const authStore = useAuthStore();

    // Create the connection to the SignalR hub.
    const connection = new HubConnectionBuilder()
        .withUrl("/api/notificationHub", {
            accessTokenFactory: () => authStore.accessToken!
        }).build();

    // Set up the connection.
    connection.on("NotificationDistributed", message => {
        const responseDto = message as NotificationResponseDto;
        notificationReceivedHandler(responseDto);
    });

    return connection;
}