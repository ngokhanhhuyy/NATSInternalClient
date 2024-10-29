declare global {
    interface TreatmentItemResponseDto {
        id: number;
        productAmountPerUnit: number;
        vatAmountPerUnit: number;
        quantity: number;
        product: ProductBasicResponseDto
    }
}

export { };