import type { ProductBasicResponseDto } from "./productResponseDtos";

export interface OrderItemResponseDto {
    id: number;
    productAmountPerUnit: number;
    vatAmountPerUnit: number;
    quantity: number;
    product: ProductBasicResponseDto
}