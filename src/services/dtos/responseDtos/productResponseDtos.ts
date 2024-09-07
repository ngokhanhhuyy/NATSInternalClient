import type { BrandBasicResponseDto } from "./brandResponseDtos";
import type { ProductCategoryResponseDto } from "./productCategoryResponseDtos";

export interface ProductBasicResponseDto {
    id: number;
    name: string;
    unit: string;
    price: number;
    stockingQuantity: number;
    thumbnailUrl: string | null;
}

export interface ProductListResponseDto {
    items: ProductBasicResponseDto[] | null;
    pageCount: number;
}

export interface ProductDetailResponseDto {
    id: number;
    name: string;
    description: string | null;
    unit: string;
    price: number;
    vatFactor: number;
    stockingQuantity: number;
    isForRetail: boolean;
    isDiscontinued: boolean;
    createdDateTime: string;
    updatedDateTime: string | null;
    thumbnailUrl: string | null;
    category: ProductCategoryResponseDto | null;
    brand: BrandBasicResponseDto | null;
}

