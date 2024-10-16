import type { CountryResponseDto } from "./countryResponseDtos";

export interface BrandListResponseDto {
    items: BrandBasicResponseDto[] | null;
    authorization: BrandListAuthorizationResponseDto;
}

export interface BrandBasicResponseDto {
    id: number;
    name: string;
    authorization: BrandAuthorizationResponseDto;
}

export interface BrandDetailResponseDto {
    id: number;
    name: string;
    website: string | null;
    socialMediaUrl: string | null;
    phoneNumber: string | null;
    email: string | null;
    address: string | null;
    createdDateTime: string;
    thumbnailUrl: string | null;
    country: CountryResponseDto | null;
    authorization: BrandAuthorizationResponseDto;
}

export interface BrandListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface BrandAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
}