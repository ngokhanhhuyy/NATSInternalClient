import type { ProductBasicResponseDto } from "./productResponseDtos";

export interface SupplyItemResponseDto {
    id: number;
    productAmountPerUnit: number;
    quantity: number;
    product: ProductBasicResponseDto;
}