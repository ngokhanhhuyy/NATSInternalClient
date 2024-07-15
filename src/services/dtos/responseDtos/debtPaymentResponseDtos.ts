import type { CustomerBasicResponseDto } from "./customerResponseDtos";
import type { UserBasicResponseDto } from "./userResponseDtos";

export interface DebtPaymentBasicResponseDto {
    id: number;
    amount: number;
    note: string | null;
    paidDateTime: string;
    isClosed: boolean;
    customer: CustomerBasicResponseDto;
    authorization: DebtPaymentAuthorizationResponseDto | null;
}

export interface DebtPaymentListResponseDto {
    pageCount: number;
    items: DebtPaymentBasicResponseDto[] | null;
    authorization: DebtPaymentListAuthorizationResponseDto;
}

export interface DebtPaymentDetailResponseDto {
    id: number;
    amount: number;
    note: string | null;
    paidDateTime: string;
    isClosed: boolean;
    customer: CustomerBasicResponseDto;
    user: UserBasicResponseDto;
    authorization: DebtPaymentAuthorizationResponseDto;
}

export interface DebtPaymentListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface DebtPaymentAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
    canSetPaidDateTime: boolean;
}