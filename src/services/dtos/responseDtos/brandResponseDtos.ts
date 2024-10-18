import type { CountryResponseDto } from "./countryResponseDtos";

export interface BrandListResponseDto {
    pageCount: number;
    items: BrandBasicResponseDto[] | null;
    authorization: BrandListAuthorizationResponseDto | null;
}

export interface BrandBasicResponseDto {
    id: number;
    name: string;
    thumbnailUrl: string | null;
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