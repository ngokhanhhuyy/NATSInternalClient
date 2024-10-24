declare global {
    interface SupplyItemResponseDto {
        id: number;
        productAmountPerUnit: number;
        quantity: number;
        product: ProductBasicResponseDto;
    }
}

export { };