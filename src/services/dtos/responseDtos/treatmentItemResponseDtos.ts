declare global {
    interface TreatmentItemResponseDto {
        id: number;
        productAMountPerUnit: number;
        vatAmountPerUnit: number;
        quantity: number;
        product: ProductBasicResponseDto
    }
}

export { };