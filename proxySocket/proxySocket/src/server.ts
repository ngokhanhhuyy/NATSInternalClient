import { WebSocketServer } from "ws";

interface RequestMessage {
    requestId: string;
    pathName: string;
    method: string;
    headers: { [key: string]: string };
    body: string | null | undefined;
    credentials: RequestCredentials | undefined;
}

interface ResponseMessage {
    requestId: string;
    requestPathName?: string;
    status: number;
    headers: { [key: string]: string };
    body: string | null | undefined;
}

interface ConnectionData {
    cookie: string | null;
}

const wss = new WebSocketServer({ port: 5175 });


// const connectionMap = new Map<string, ConnectionData>();

wss.on("connection", (ws) => {
    const connectionId = crypto.randomUUID();
    let cookie: string | null = null;
    console.log("Client connected");
    ws.send(JSON.stringify({
        connectionId: connectionId,
        type: "ConnectedNotification"
    }));

    ws.on("close", () => {
        console.log("Client disconnected");
    });

    ws.on("message", async (message) => {
        const parsedRequest = JSON.parse(message.toString()) as RequestMessage;
        const pathName = parsedRequest.pathName;
        const method = parsedRequest.method.toUpperCase();
        const headers = new Headers(parsedRequest.headers);
        const isApiCall = pathName.startsWith("/api");
        const isSignInPathName = pathName.startsWith("/api/authentication/getAccessCookie");
        let includeCookie: boolean = false;
        if (cookie != null && isApiCall && !isSignInPathName) {
            headers.append("Cookie", cookie);
            includeCookie = true;
        }

        let requestInit: RequestInit;
        if (method === "GET" || method === "HEAD") {
            requestInit = {
                method: parsedRequest.method,
                headers: headers,
                credentials: parsedRequest.credentials
            }
        } else {
            requestInit = {
                method: parsedRequest.method,
                headers: headers,
                body: JSON.stringify(parsedRequest.body),
                credentials: parsedRequest.credentials
            }
        }
        const fetchStartTime = Date.now();
        fetch("http://localhost:5173" + pathName, requestInit)
            .then(async (response: Response) => {
                const fetchExecutionTime = Date.now() - fetchStartTime;
                const encodingStartTime = Date.now();
                let encodingExecutionTime;
                let sentTime: string;
                let mainJsAsArrayBuffer: boolean = false;
                if (parsedRequest.requestId === "MainJsAsArrayBuffer") {
                    mainJsAsArrayBuffer = true;
                    const fileBuffer = await response.arrayBuffer();
                    encodingExecutionTime = Date.now() - encodingStartTime;
                    ws.send(fileBuffer);
                    sentTime = new Date().toISOString();
                } else {
                    const responseMessage: ResponseMessage = {
                        requestId: parsedRequest.requestId,
                        requestPathName: parsedRequest.pathName,
                        status: response.status,
                        headers: Object.fromEntries(response.headers.entries()),
                        body: await response
                            .text()
                            .catch((error: Error) =>{
                                console.log(error.message);
                                return undefined
                            })
                    }
                    const responseMessageAsJson = JSON.stringify(responseMessage);
                    encodingExecutionTime = Date.now() - encodingStartTime;
                    if (response.status === 200) {
                        if (pathName.startsWith("/api/authentication/getAccessCookie")) {
                            cookie = response.headers.get("Set-Cookie");
                        } else if (pathName.startsWith("/api/authentication/clearAccessCookie")) {
                            cookie = null;
                        }
                    }
    
                    ws.send(responseMessageAsJson);
                    sentTime = new Date().toISOString();
                }
                console.log(
                    "Response for: ",
                    "\x1b[32m", parsedRequest.pathName,
                    includeCookie ? "\x1b[33m" + "Requested with cookie" : "",
                    "\x1b[34m", `Fetched: ${fetchExecutionTime}ms`,
                    "\x1b[36m", `Encoded: ${encodingExecutionTime}ms`,
                    mainJsAsArrayBuffer ? "\x1b[33m" + "ArrayBuffer" : "",
                    "\x1b[0m", `Sent: ${sentTime.split("T")[1]}`);
            }).catch((error: Error) => {
                ws.send(JSON.stringify({
                    requestId: parsedRequest.requestId,
                    requestPathName: parsedRequest.pathName,
                    status: 500,
                    body: error.message
                }));
            });
        
    });
});

console.log("WebSocket server is running on ws://localhost:" + wss.options.port);
