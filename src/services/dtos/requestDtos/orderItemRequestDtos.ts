export interface OrderItemRequestDto {
    id: number | null;
    productAmountPerUnit: number;
    vatAmountPerUnit: number;
    quantity: number;
    productId: number;
    hasBeenChanged: boolean;
    hasBeenDeleted: boolean;
}