declare global {
    export interface AccessTokenResponseDto {
        accessToken: string;
        refreshToken: string;
        userId: number;
        expiringDateTime: string;
    }
}

export { };