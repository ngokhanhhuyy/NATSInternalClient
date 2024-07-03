import type { UserBasicResponseDto } from "./userResponseDtos";

export interface OrderPaymentResponseDto {
    id: number;
    amount: number;
    paidDateTime: string;
    note: string | null;
    isClosed: boolean;
    userInCharge: UserBasicResponseDto;
}

export interface OrderPaymentCreateResponseDto {
    orderId: number;
    orderPaymentId: number;
}