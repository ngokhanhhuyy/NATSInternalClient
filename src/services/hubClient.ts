import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { useAuthStore } from "@/stores/auth";
import type {
    UserBasicResponseDto,
    NotificationResponseDto } from "./dtos/responseDtos";
import type { ResourceAccessMode } from "./dtos/enums";

let connection: HubConnection;

export interface Resource {
    type: string;
    primaryId: number;
    secondaryId: number | null;
    mode: ResourceAccessMode
}

export interface IHubHandlers {
    notificationSingleResponse?: (responseDto: NotificationResponseDto) => any;
    otherUserResourceAccessStarted?: (responseDto: UserBasicResponseDto) => any;
    selfResourceAccessStarted?: (responseDto: UserBasicResponseDto[]) => any;
}

export interface IHubClient {
    startConnection(): Promise<void>;
    stopConnection(): Promise<void>;
    startResourceAccess(resource: Resource): Promise<void>;
    finishResourceAccess(resource: Resource): Promise<void>;
}

export function useHubClient(handlers?: IHubHandlers): IHubClient {
    // Establish the connection if not established yet.
    if (!connection) {
        connection = buildConnection();
    }

    // Setup the handlers if specified.
    if (handlers) {
        if (handlers.notificationSingleResponse) {
            connection.on("NotificationSingleResponse", handlers.notificationSingleResponse);
        }
    
        if (handlers.selfResourceAccessStarted) {
            connection.on("Self.ResourceAccessStarted", handlers.selfResourceAccessStarted); 
        }
    
        if (handlers.otherUserResourceAccessStarted) {
            connection.on(
                "Other.ResourceAccessStarted",
                handlers.otherUserResourceAccessStarted);
        }
    }

    return {
        async startConnection(): Promise<void> {
            console.log(connection.state);
            if (connection.state === HubConnectionState.Disconnected) {
                await connection.start();
                console.log("Hub connection established.");
                return;
            }
            throw new Error("Connection is at state " + connection.state.toString());
        },

        async stopConnection(): Promise<void> {
            console.log(connection.state);
            if (connection.state === HubConnectionState.Connected) {
                await connection.stop();
                console.log("Hub connection terminated.");
                return;
            }
            throw new Error("Connection is at state " + connection.state.toString());
        },

        async startResourceAccess(resource: Resource): Promise<void> {
            await connection.send("StartResourceAccess", resource);
        },

        async finishResourceAccess(resource: Resource): Promise<void> {
            await connection.send("FinishResourceAccess", resource);
        }
    };
}

function buildConnection(): HubConnection {
    // Use auth store to get the access token.
    const authStore = useAuthStore();

    // Create the connection to the SignalR hub.
    let connection: HubConnection;
    if (import.meta.env.VITE_AUTH_METHOD === "Jwt") {
        connection = new HubConnectionBuilder()
            .withUrl("/api/hub", {
                accessTokenFactory: () => authStore.accessToken!
            }).build();
    } else {
        connection = new HubConnectionBuilder().withUrl("/api/hub").build();
    }

    return connection;
}