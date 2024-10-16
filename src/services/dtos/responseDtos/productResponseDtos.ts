import type { BrandBasicResponseDto } from "./brandResponseDtos";
import type { ProductCategoryResponseDto } from "./productCategoryResponseDtos";
import type { ProductPhotoResponseDto } from "./productPhotoResponseDtos";

export interface ProductBasicResponseDto {
    id: number;
    name: string;
    unit: string;
    defaultPrice: number;
    stockingQuantity: number;
    thumbnailUrl: string | null;
    authorization: ProductAuthorizationResponseDto;
}

export interface ProductListResponseDto {
    pageCount: number;
    items: ProductBasicResponseDto[] | null;
    authorization: ProductListAuthorizationResponseDto;
}

export interface ProductDetailResponseDto {
    id: number;
    name: string;
    description: string | null;
    unit: string;
    defaultPrice: number;
    defaultVatPercentage: number;
    stockingQuantity: number;
    isForRetail: boolean;
    isDiscontinued: boolean;
    createdDateTime: string;
    updatedDateTime: string | null;
    thumbnailUrl: string | null;
    category: ProductCategoryResponseDto | null;
    brand: BrandBasicResponseDto | null;
    photos: ProductPhotoResponseDto[] | null;
    authorization: ProductAuthorizationResponseDto;
}

export interface ProductListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface ProductAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
}