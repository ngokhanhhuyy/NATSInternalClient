declare global {
    class OrderUpsertItemRequestDto implements IProductExportableUpsertItemRequestDto {
        id: number | null;
        productAmountPerUnit: number;
        vatAmountPerUnit: number;
        quantity: number;
        productId: number;
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
}
export { };