declare global {
    class SupplyUpsertItemRequestDto implements IProductEngageableUpsertItemRequestDto {
        id: number | null;
        productAmountPerUnit: number;
        quantity: number;
        productId: number;
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
}

export { };