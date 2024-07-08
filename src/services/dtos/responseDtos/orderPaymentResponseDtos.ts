import type { UserBasicResponseDto } from "./userResponseDtos";

export interface OrderPaymentResponseDto {
    id: number;
    amount: number;
    paidDateTime: string;
    note: string | null;
    isClosed: boolean;
    userInCharge: UserBasicResponseDto;
    authorization: OrderPaymentAuthorizationResponseDto | null;
}

export interface OrderPaymentAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
}

export interface OrderPaymentCreateResponseDto {
    orderId: number;
    orderPaymentId: number;
}