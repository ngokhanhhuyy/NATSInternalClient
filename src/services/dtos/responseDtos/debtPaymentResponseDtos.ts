import type { DebtPaymentUpdateHistoryResponseDto } from "./debtPaymentUpdateHistoryResponseDtos";
import type { CustomerBasicResponseDto } from "./customerResponseDtos";
import type { UserBasicResponseDto } from "./userResponseDtos";
import type { MonthYearResponseDto } from "./monthYearResponseDtos";

export interface DebtPaymentBasicResponseDto {
    id: number;
    amount: number;
    paidDateTime: string;
    isLocked: boolean;
    customer: CustomerBasicResponseDto;
    authorization: DebtPaymentAuthorizationResponseDto | null;
}

export interface DebtPaymentListResponseDto {
    pageCount: number;
    items: DebtPaymentBasicResponseDto[] | null;
    monthYearOptions: MonthYearResponseDto[];
    authorization: DebtPaymentListAuthorizationResponseDto;
}

export interface DebtPaymentDetailResponseDto {
    id: number;
    amount: number;
    note: string | null;
    paidDateTime: string;
    isLocked: boolean;
    customer: CustomerBasicResponseDto;
    user: UserBasicResponseDto;
    authorization: DebtPaymentAuthorizationResponseDto;
    updateHistories: DebtPaymentUpdateHistoryResponseDto[] | null;
}

export interface DebtPaymentListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface DebtPaymentAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
    canSetPaidDateTime: boolean;
}