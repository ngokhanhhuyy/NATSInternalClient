import { config } from "@/configs/configs";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import {
    ValidationError, OperationError,
    InternalServerError, AuthenticationError, NotFoundError,
    UndefinedError, DuplicatedError, AuthorizationError ,
    type IModelStateErrors} from "@/services/exceptions";
import { useJsonUtility } from "@/utilities/jsonUtility";
import type { AccessTokenExchangeRequestDto } from "./dtos/requestDtos/authenticationRequestDtos";
import type { AccessTokenResponseDto } from "./dtos/responseDtos/authenticationResponseDtos";

type Params = Record<string, any>;

export interface IApiClient {
    getAsync<TResponseDto>(endpointPath: string, params?: Params): Promise<TResponseDto>;
    postAsync<TResponseDto>(endpointPath: string, requestDto: object, params?: Params): Promise<TResponseDto>;
    postAndIgnoreAsync(endpointPath: string, requestDto: object, params?: Params): Promise<void>;
    putAsync<TResponseDto>(endpointPath: string, requestDto: object, params?: Params): Promise<TResponseDto>;
    putAndIgnoreAsync(endpointPath: string, requestDto: object, params?: Params): Promise<void>;
    deleteAsync<TResponseDto>(endpointPath: string, requestDto?: object, params?: Params): Promise<TResponseDto>;
    deleteAndIgnoreAsync(endpointPath: string, requestDto?: object, params?: Params): Promise<void>;
}

let singletonApiClient: IApiClient;
export function useApiClient(): IApiClient {
    const authStore = useAuthStore();
    const router = useRouter();
    const url = import.meta.env.MODE === "development"
        ? config.API_URI_DEV
        : config.API_URI_PROD;
    const jsonUtility = useJsonUtility();
    let requestQueue: Function[] = [];

    async function convertResponseErrorToException(response: Response): Promise<Error> {
        const errorMessagesJson: string = await response.text();
        switch (response.status) {
            // Validation error
            case 400: {
                return new ValidationError(
                    jsonUtility.parseJson<IModelStateErrors>(errorMessagesJson)!);
            }

            // Authentication error
            case 401: {
                authStore.clearTokens();
                await router.replace({ name: "login" });
                return new AuthenticationError();
            }

            // Forbidden error
            case 403:
                return new AuthorizationError();

            // Not found error
            case 404:
                return new NotFoundError(
                    jsonUtility.parseJson<IModelStateErrors>(errorMessagesJson)!);

            // Duplicated error
            case 409:
                return new DuplicatedError(
                    jsonUtility.parseJson<IModelStateErrors>(errorMessagesJson)!);

            // Business logic error
            case 422:
                return new OperationError(jsonUtility.parseJson<IModelStateErrors>(errorMessagesJson)!);

            // Internal server error
            case 500:
                return new InternalServerError();

            // Undefined error
            default:
                return new UndefinedError();
        }
    }

    async function executeAsync(method: string, endpointPath: string, requestDto?: object,
            params?: Params, retry: boolean = true): Promise<Response> {
        let endpointUrl = url + endpointPath;
        if (params != null && getQueryString(params) != null) {
            endpointUrl += "?" + getQueryString(params);
        }

        let response = await fetch(endpointUrl, {
            headers: {
                "Authorization": `Bearer ${authStore.accessToken}`,
                "Content-Type": "application/json"
            },
            credentials: "same-origin" as RequestCredentials,
            method: method,
            body: requestDto ? JSON.stringify(requestDto) : undefined
        });
        if (response.ok) {
            return response;
        }

        // Facing 401 response for the first time, exchange for a new access token.
        if (response.status === 401 && retry && authStore.refreshToken != null) {
            if (authStore.isExchangingTokens) {
                return new Promise((resolve, reject) => {
                    requestQueue.push(() => {
                        executeAsync(method, endpointPath, requestDto, params, false)
                            .then(result => resolve(result))
                            .catch(error => reject(error));
                    });
                });
            } else {
                // Abort exchang process if the refresh token doesn't exist.
                authStore.isExchangingTokens = true;
                let exchangeSuccessfully: boolean = false;
                
                // Exchanging by refresh token.
                const exchangeRequestPayload: AccessTokenExchangeRequestDto = {
                    expiredAccessToken: authStore.accessToken!,
                    refreshToken: authStore.refreshToken!
                };
                response = await fetch(url + "/authentication/exchangeAccessToken", {
                    headers: { "Content-Type": "application/json" },
                    credentials: "same-origin" as RequestCredentials,
                    method: "post",
                    body: JSON.stringify(exchangeRequestPayload)
                });
    
                if (response.ok) {
                    const responseDto = await response.json() as AccessTokenResponseDto;
                    authStore.setAccessToken(responseDto.accessToken);
                    authStore.setRefreshToken(responseDto.refreshToken);
                    authStore.setExpiringDateTime(responseDto.expiringDateTime);
                    exchangeSuccessfully = true;
                }
                authStore.isExchangingTokens = false;
    
                if (exchangeSuccessfully) {
                    response = await fetch(endpointUrl, {
                        headers: {
                            "Authorization": `Bearer ${authStore.accessToken}`,
                            "Content-Type": "application/json"
                        },
                        credentials: "same-origin" as RequestCredentials,
                        method: method,
                        body: requestDto ? JSON.stringify(requestDto) : undefined
                    });

                    requestQueue.forEach(callback => callback());
                    requestQueue = [];
                    if (response.ok) {
                        return response;
                    }
                }
            }
        }

        throw await convertResponseErrorToException(response);
    }

    if (!singletonApiClient) {
        singletonApiClient = {
            async getAsync<TResponseDto>(endpointPath: string, params?: Params): Promise<TResponseDto> {
                const response = await executeAsync("get", endpointPath, undefined, params);
                const responseAsText = await response.text();
                return jsonUtility.parseJson<TResponseDto>(responseAsText)!;
            },

            async postAsync<TResponseDto>(endpointPath: string, requestDto: object, params?: Params): Promise<TResponseDto> {
                const response = await executeAsync("post", endpointPath, requestDto, params);
                const responseAsText = await response.text();
                return jsonUtility.parseJson<TResponseDto>(responseAsText)!;
            },

            async postAndIgnoreAsync(endpointPath: string, requestDto: object, params?: Params): Promise<void> {
                await executeAsync("post", endpointPath, requestDto, params);
            },

            async putAsync<TResponseDto>(endpointPath: string, requestDto: object, params?: Params): Promise<TResponseDto> {
                const response = await executeAsync("put", endpointPath, requestDto, params);
                const responseAsText = await response.text();
                return jsonUtility.parseJson<TResponseDto>(responseAsText)!;
            },

            async putAndIgnoreAsync(endpointPath: string, requestDto: object, params?: Record<string, any>): Promise<void> {
                await executeAsync("put", endpointPath, requestDto, params);
            },

            async deleteAsync<TResponseDto>(endpointPath: string, params?: Params): Promise<TResponseDto> {
                const response = await executeAsync("delete", endpointPath, undefined, params);
                const responseAsText = await response.text();
                return jsonUtility.parseJson<TResponseDto>(responseAsText)!;
            },

            async deleteAndIgnoreAsync(endpointPath: string, params?: Params): Promise<void> {
                await executeAsync("delete", endpointPath, undefined, params);
            }
        };
    }

    return singletonApiClient;
}

export function getQueryString<TParams extends Record<string, any>>(params: TParams): string | null {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value != null) {
            searchParams.set(key, value.toString());
        }
    }

    return searchParams.toString();
}