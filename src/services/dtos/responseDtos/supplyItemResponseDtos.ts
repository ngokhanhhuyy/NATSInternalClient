import type { ProductBasicResponseDto } from "./productResponseDtos";

export interface SupplyItemResponseDto {
    id: number;
    amount: number;
    suppliedQuantity: number;
    product: ProductBasicResponseDto;
}