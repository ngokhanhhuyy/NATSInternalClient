declare global {
    interface TreatmentItemRequestDto {
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