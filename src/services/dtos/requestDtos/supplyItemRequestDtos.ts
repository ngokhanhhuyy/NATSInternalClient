export interface SupplyItemRequestDto {
    id: number | null;
    amount: number;
    suppliedQuantity: number;
    productId: number;
    hasBeenChanged: boolean;
    hasBeenDeleted: boolean;
}