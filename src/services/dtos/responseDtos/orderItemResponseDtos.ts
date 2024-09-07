import type { ProductBasicResponseDto } from "./productResponseDtos";

export interface OrderItemResponseDto {
    id: number;
    amount: number;
    vatFactor: number;
    quantity: number;
    product: ProductBasicResponseDto
}