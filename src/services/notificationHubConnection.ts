import { type HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useAuthStore } from "@/stores/auth";

let connection: HubConnection | undefined;

export function useNotificationHubConnection(
        notificationReceivedHandler: (notificationId :number) => any): HubConnection {
    if (!connection) {
        return establishConnection(notificationReceivedHandler);
    }
    return connection;
}

function establishConnection(
        notificationReceivedHandler: (notificationId :number) => any): HubConnection {
    // Use auth store to get the access token.
    const authStore = useAuthStore();

    // Create the connection to the SignalR hub.
    const connection = new HubConnectionBuilder()
        .withUrl("api/notificationHub", {
            accessTokenFactory: () => authStore.accessToken!
        }).build();

    // Set up the connection.
    connection.on("NotificationDistributed", message => {
        const notificationId = parseInt(message);
        notificationReceivedHandler(notificationId);
    });

    return connection;
}