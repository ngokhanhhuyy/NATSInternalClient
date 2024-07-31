export interface TreatmentItemRequestDto {
    id: number | null;
    amount: number;
    vatFactor: number;
    quantity: number;
    productId: number;
    hasBeenChanged: boolean;
    hasBeenDeleted: boolean;
}