export interface OrderPaymentRequestDto {
    id: number | null;
    amount: number;
    paidDateTime: string | null;
    note: string | null;
    hasBeenChanged: boolean;
}