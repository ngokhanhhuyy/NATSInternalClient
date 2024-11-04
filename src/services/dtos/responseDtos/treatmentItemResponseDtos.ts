declare global {
    class TreatmentItemResponseDto implements IProductEngageableItemResponseDto {
        id: number;
        productAmountPerUnit: number;
        vatAmountPerUnit: number;
        quantity: number;
        product: ProductBasicResponseDto;
    }
}

export { };