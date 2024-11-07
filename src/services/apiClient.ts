import { config } from "@/configs/configs";
import {
    ValidationError, OperationError, InternalServerError, AuthenticationError,
    NotFoundError, UndefinedError, DuplicatedError, AuthorizationError,
    type IModelStateErrors} from "@/services/exceptions";
import { useJsonUtility } from "@/utilities/jsonUtility";

type Params = Record<string, any>;

export interface IApiClient {
    getAsync<TResponseDto>(
        endpointPath: string,
        params?: Params): Promise<TResponseDto>;
    postAsync<TResponseDto>(endpointPath: string, requestDto: object, params?: Params): Promise<TResponseDto>;
    postAndIgnoreAsync(endpointPath: string, requestDto: object, params?: Params): Promise<void>;
    putAsync<TResponseDto>(endpointPath: string, requestDto: object, params?: Params): Promise<TResponseDto>;
    putAndIgnoreAsync(endpointPath: string, requestDto: object, params?: Params): Promise<void>;
    deleteAsync<TResponseDto>(endpointPath: string, requestDto?: object, params?: Params): Promise<TResponseDto>;
    deleteAndIgnoreAsync(endpointPath: string, requestDto?: object, params?: Params): Promise<void>;
}

export function useApiClient() {
    const url = import.meta.env.MODE === "development"
        ? config.API_URI_DEV
        : config.API_URI_PROD;
    const jsonUtility = useJsonUtility();

    /**
     * Convert a `Response` which indicates an error into a mapped `Error` for each type
     * of the error.
     * 
     * @param response The `Response` to be converted.
     * @returns The mapped `Error` to the error type of the specified `Response`.
     */
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
                return new OperationError(jsonUtility
                    .parseJson<IModelStateErrors>(errorMessagesJson)!);

            // Internal server error
            case 500:
                return new InternalServerError();

            // Undefined error
            default:
                return new UndefinedError();
        }
    }

    /**
     * Sends a request with the specfied `method` to the backend API's `endpointPath` with
     * the optionally specified `params` and `requestDto`.
     * 
     * @param method The method of the sending request, must be one of the following: GET,
     * POST, PUT, DELETE.
     * @param endpointPath The relative path to the endpoint of the backend API.
     * @param requestDto (Optional) An object containing the data for the payload of the
     * request.
     * @param params (Optional) An object contaning the data that will be converted into a
     * `string` representing the query string and added into the final URL of the request.
     * @returns A `Task` which resolves to the a `Response` instance containing the data in
     * the response from the server.
     */
    async function executeAsync(method: string, endpointPath: string, requestDto?: object,
            params?: Params): Promise<Response> {
        let endpointUrl = url + endpointPath;
        if (params != null && getQueryString(params) != null) {
            endpointUrl += "?" + getQueryString(params);
        }
        const response = await fetch(endpointUrl, {
            headers: { "Content-Type": "application/json" },
            credentials: "include" as RequestCredentials,
            method: method,
            body: requestDto ? JSON.stringify(requestDto) : undefined
        });
        if (response.ok) {
            return response;
        }

        throw await convertResponseErrorToException(response);
    }

    /**
     * Sends a GET request to the specified `endpointPath` with optionally specified `params`,
     * then parses the response body into a TypeScript/JavaScript object as the type specified
     * in the type parameter.
     * 
     * @template TResponseDto The type of the object which is parsed from the response
     * body.
     * @param endpointPath The path of the api's endpoint to send the request.
     * @param params (Optional) An object containing the data which will be converted
     * into a query string and added into the request's url.
     * @returns A `Promise` which resolves to an object as an implementation of type
     * `TResponseDto`.
     * @example getAsync<ResponseDtos.User.Detail>("user/1");
     */
    async function getAsync<TResponseDto>(
            endpointPath: string,
            params?: Params): Promise<TResponseDto> {
        const response = await executeAsync("get", endpointPath, undefined, params);
        const responseAsText = await response.text();
        return jsonUtility.parseJson<TResponseDto>(responseAsText)!;
    }
    
    /**
     * Sends a POST request to the specified `endpointPath` with the optionally specified
     * `params` and the `requestDto` object as the body, then parses the response body into a
     * TypeScript/JavaScript object as the type specified in the type parameter.
     * 
     * @template TResponseDto The type of the object which is parsed from the response
     * body.
     * @param endpointPath The path of the api's endpoint to send the request.
     * @param requestDto An object as the payload for the response body.
     * @param params (Optional) An object containing the data which will be converted
     * into a query string and added into the request's url.
     * @returns A `Promise` which resolves to an object as an implementation of type
     * `TResponseDto`.
     * @example postAsync<int>("user");
     */
    async function postAsync<TResponseDto>(
            endpointPath: string,
            requestDto: object,
            params?: Params): Promise<TResponseDto> {
        const response = await executeAsync("post", endpointPath, requestDto, params);
        const responseAsText = await response.text();
        return jsonUtility.parseJson<TResponseDto>(responseAsText)!;
    }

    /**
     * Sends a POST request to the specified `endpointPath` with the optionally specified
     * `params` and the `requestDto` object as the body. The response will be ignored if the
     * response's status code is 201 (Created).
     * 
     * @param endpointPath The path of the api's endpoint to send the request.
     * @param requestDto An object as the payload for the response body.
     * @param params (Optional) An object containing the data which will be converted
     * into a query string and added into the request's url.
     * @returns A `Promise` which resolves to an object as an implementation of type
     * `TResponseDto`.
     * @example postAndIgnoreAsync("user/changePasswordAsync/1");
     */
    async function postAndIgnoreAsync(
            endpointPath: string,
            requestDto: object,
            params?: Params): Promise<void> {
        await executeAsync("post", endpointPath, requestDto, params);
    }

    /**
     * Sends a PUT request to the specified `endpointPath` with the optionally specified
     * `params` and the `requestDto` object as the body, then parses the response body into a
     * TypeScript/JavaScript object as the type specified in the type parameter.
     * 
     * @template TResponseDto The type of the object which is parsed from the response
     * body.
     * @param endpointPath The path of the api's endpoint to send the request.
     * @param requestDto An object as the payload for the response body.
     * @param params (Optional) An object containing the data which will be converted
     * into a query string and added into the request's url.
     * @returns A `Promise` which resolves to an object as an implementation of type
     * `TResponseDto`.
     * @example putAsync<boolean>("user/1", requestDto);
     */
    async function putAsync<TResponseDto>(
            endpointPath: string,
            requestDto: object,
            params?: Params): Promise<TResponseDto> {
        const response = await executeAsync("put", endpointPath, requestDto, params);
        const responseAsText = await response.text();
        return jsonUtility.parseJson<TResponseDto>(responseAsText)!;
    }

    /**
     * Sends a PUT request to the specified `endpointPath` with the optionally specified
     * `params` and the `requestDto` object as the body. The response will be ignored if the
     * response's status code is 200 (OK).
     * 
     * @param endpointPath The path of the api's endpoint to send the request.
     * @param requestDto An object as the payload for the response body.
     * @param params (Optional) An object containing the data which will be converted
     * into a query string and added into the request's url.
     * @returns A `Promise` which resolves to an object as an implementation of type
     * `TResponseDto`.
     * @example putAndIgnoreAsync("user/1", requestDto);
     */
    async function putAndIgnoreAsync(
            endpointPath: string,
            requestDto: object,
            params?: Record<string, any>): Promise<void> {
        await executeAsync("put", endpointPath, requestDto, params);
    }

    /**
     * Sends a DELETE request to the specified `endpointPath` with the optionally specified
     * `params`, then parses the response body into a TypeScript/JavaScript object as the type
     * specified in the type parameter.
     * 
     * @template TResponseDto The type of the object which is parsed from the response
     * body.
     * @param endpointPath The path of the api's endpoint to send the request.
     * @param params (Optional) An object containing the data which will be converted
     * into a query string and added into the request's url.
     * @returns A `Promise` which resolves to an object as an implementation of type
     * `TResponseDto`.
     * @example deleteAsync<boolean>("user/1");
     */
    async function deleteAsync<TResponseDto>(
            endpointPath: string,
            params?: Params): Promise<TResponseDto> {
        const response = await executeAsync("delete", endpointPath, undefined, params);
        const responseAsText = await response.text();
        return jsonUtility.parseJson<TResponseDto>(responseAsText)!;
    }

    /**
     * Sends a DELETE request to the specified `endpointPath` with the optionally specified
     * `params`. The response will be ignored if the response's status code is 200 (OK).
     * 
     * @param endpointPath The path of the api's endpoint to send the request.
     * @param params (Optional) An object containing the data which will be converted
     * into a query string and added into the request's url.
     * @returns A `Promise` which resolves to an object as an implementation of type
     * `TResponseDto`.
     * @example deleteAndIgnoreAysnc("user/1");
     */
    async function deleteAndIgnoreAsync(
            endpointPath: string,
            params?: Params): Promise<void> {
        await executeAsync("delete", endpointPath, undefined, params);
    }

    return {
        getAsync,
        postAsync,
        postAndIgnoreAsync,
        putAsync,
        putAndIgnoreAsync,
        deleteAsync,
        deleteAndIgnoreAsync
    };;
}

/**
 * Convert a TypeScript/JavaScript object into a string representing the query string which
 * plays parameter role in request URL.
 * 
 * @param params A TypeScript/JavaScript `object` to be converted.
 * @returns The converted `string` as query string.
 */
export function getQueryString<TParams extends Record<string, any>>(
        params: TParams): string | null {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value != null) {
            searchParams.set(key, value.toString());
        }
    }

    return searchParams.toString();
}