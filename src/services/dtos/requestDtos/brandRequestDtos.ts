import type { CountryRequestDto } from "./countryRequestDtos";

export interface BrandRequestDto {
    id: number;
}

export interface BrandUpsertRequestDto {
    name: string;
    website: string | null;
    socialMediaUrl: string | null;
    phoneNumber: string | null;
    email: string | null;
    address: string | null;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
    country: CountryRequestDto | null
}