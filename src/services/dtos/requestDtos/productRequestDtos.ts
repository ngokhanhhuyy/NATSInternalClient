import type { ProductCategoryRequestDto } from "./productCategoryRequestDtos";
import type { BrandRequestDto } from "./brandRequestDtos";

export interface ProductListRequestDto {
    categoryName: string | null;
    brandId: number | null;
    page: number;
}

export interface ProductUpsertRequestDto {
    name: string;
    description: string | null;
    unit: string;
    price: number;
    vatFactor: number;
    isForRetail: boolean;
    isDiscontinued: boolean;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
    category: ProductCategoryRequestDto | null;
    brand: BrandRequestDto | null;
}