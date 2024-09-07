import type { SignInRequestDto } from "./dtos/requestDtos";
import {
    AuthenticationError} from "./exceptions";
import { useApiClient } from "./apiClient";

export function useAuthenticationService() {
    const apiClient = useApiClient();

    return {
        /**
         * Send a request containing an object containing the data for authentication to the
         * server in order to get the access cookie.
         * 
         * @remarks When the data in the request is valid and the authentication credentials
         * are correct, the server will generate an encoded cookie which contains the
         * authentication and authorization information and response back for the following
         * requests.
         * 
         * @param requestDto - An object implemented `AccessTokenRequestDto`, contaning the
         * username and password for authentication.
         * @returns A `Promise` that resolves to a `number` representing the id of the
         * authenticated user.
         * @example
         * const userId: number = await getAccessCookieAsync({
         *      userName: "yourUserName",
         *      password: "yourPassword"
         * });
         */
        async signInAsync(requestDto: SignInRequestDto): Promise<number> {
            return await apiClient
                .postAsync<number>("authentication/getAccessCookie", requestDto);
        },

        /**
         * Send a request to the server in order to perform sign out operation. After
         * validating the authentication cookies in the request's headers, the server will
         * clear those cookies. The client needs to send a sign in request again to the server
         * before being considered authenticated for the following requests.
         * 
         * @returns A `Promise` that represents the asynchronous operation.
         */
        async signOutAsync(): Promise<void> {
            await apiClient.postAndIgnoreAsync("authentication/clearAccessCookie", { });
        },

        /**
         * Check the authentication status of the current user by sending a request containing
         * cookie and access token (if the authentication method is using access token) in the
         * header to the api endpoint in order to check if the user has been authenticated.
         * 
         * @returns A `Promise` that resolves to a `boolean` value which is `true` if the
         * server response indicates that the user has been authenticated, or `false` if the
         * authentication process failed.
         */
        async checkAuthenticationStatusAsync(): Promise<boolean> {
            try {
                await apiClient
                    .getAsync<true>("authentication/checkAuthenticationStatus");
                return true;
            } catch (error) {
                if (error instanceof AuthenticationError) {
                    return false;
                }
                throw error;
            }
        }
    };
}