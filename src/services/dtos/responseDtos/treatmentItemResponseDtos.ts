import type { ProductBasicResponseDto } from "./productResponseDtos";

export interface TreatmentItemResponseDto {
    id: number;
    amount: number;
    vatFactor: number;
    quantity: number;
    product: ProductBasicResponseDto
}