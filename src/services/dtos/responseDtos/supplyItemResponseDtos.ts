import type { ProductBasicResponseDto } from "./productResponseDtos";

export interface SupplyItemResponseDto {
    id: number;
    amount: number;
    vatFactor: number;
    suppliedQuantity: number;
    product: ProductBasicResponseDto;
}