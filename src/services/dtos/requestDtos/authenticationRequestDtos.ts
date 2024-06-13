export interface AccessTokenRequestDto {
    userName: string;
    password: string;
}

export interface AccessTokenExchangeRequestDto {
    expiredAccessToken: string;
    refreshToken: string
}