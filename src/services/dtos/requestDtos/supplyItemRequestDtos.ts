export interface SupplyItemRequestDto {
    id: number | null;
    productAmountPerUnit: number;
    quantity: number;
    productId: number;
    hasBeenChanged: boolean;
    hasBeenDeleted: boolean;
}