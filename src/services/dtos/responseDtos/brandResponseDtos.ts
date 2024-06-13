import type { CountryResponseDto } from "./countryResponseDtos";

export interface BrandListResponseDto {
    items: BrandBasicResponseDto[] | null;
    authorization: BrandAuthorizationResponseDto;
}

export interface BrandBasicResponseDto {
    id: number;
    name: string;
}

export interface BrandDetailResponseDto {
    id: number;
    name: string;
    website: string | null;
    socialMediaUrl: string | null;
    phoneNumber: string | null;
    email: string | null;
    address: string | null;
    thumbnailUrl: string | null;
    country: CountryResponseDto | null;
    authorization: BrandAuthorizationResponseDto;
}

export interface BrandAuthorizationResponseDto {
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
}