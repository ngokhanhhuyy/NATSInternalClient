import type { ProductBasicResponseDto } from "./productResponseDtos";

export interface TreatmentItemResponseDto {
    id: number;
    productAMountPerUnit: number;
    vatAmountPerUnit: number;
    quantity: number;
    product: ProductBasicResponseDto
}