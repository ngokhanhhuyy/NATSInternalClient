import type { AccessTokenRequestDto } from "./dtos/requestDtos/authenticationRequestDtos";
import type { AccessTokenResponseDto } from "./dtos/responseDtos/authenticationResponseDtos";
import { config } from "@/configs/configs";
import type { IModelStateErrors } from "./exceptions";
import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
    UndefinedError,
    ConnectionError, 
    OperationError} from "./exceptions";
import { useAuthStore } from "@/stores/auth";

export class AuthenticationService {
    private readonly authStore = useAuthStore();
    private readonly url = config.API_URI_DEV;

    public async getAccessTokenAsync(
        requestDto: AccessTokenRequestDto): Promise<AccessTokenResponseDto> {
        let response: Response;
        try {
            response = await fetch(`${config.API_URI_DEV}/authentication/getAccessToken`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "post",
                body: JSON.stringify(requestDto)
            });
        } catch (error) {
            if (error instanceof TypeError) {
                throw new ConnectionError();
            }

            throw error;
        }
        const responseJson: string = await response.text();
        if (response.ok) {
            return JSON.parse(responseJson);
        } else {
            const errorMessagesJson: IModelStateErrors = JSON.parse(responseJson);
            switch (response.status) {
                case 400:
                    throw new BadRequestError(errorMessagesJson);
                case 404:
                    throw new NotFoundError(errorMessagesJson);
                case 422:
                    throw new OperationError(errorMessagesJson);
                case 500:
                    throw new InternalServerError();
                default:
                    throw new UndefinedError();
            }
        }
    }
}

export function useAuthenticationService(): AuthenticationService {
    return new AuthenticationService();
}