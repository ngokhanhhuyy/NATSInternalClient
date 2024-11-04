declare global {
    class SupplyItemResponseDto implements IProductEngageableItemResponseDto {
        id: number;
        productAmountPerUnit: number;
        quantity: number;
        product: ProductBasicResponseDto;
    }
}

export { };