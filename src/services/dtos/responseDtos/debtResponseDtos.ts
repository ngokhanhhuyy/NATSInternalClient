import type { DebtUpdateHistoryResponseDto } from "./debtUpdateHistoryResponseDtos";
import type { CustomerBasicResponseDto } from "../responseDtos/customerResponseDtos";
import type { UserBasicResponseDto } from "../responseDtos/userResponseDtos";

export interface DebtBasicResponseDto {
    id: number;
    amount: number;
    incurredDateTime: DateTimeISOString;
    isLocked: boolean;
    customer: CustomerBasicResponseDto;
    authorization: DebtAuthorizationResponseDto | null;
}

export interface DebtListResponseDto {
    pageCount: number;
    items: DebtBasicResponseDto[] | null;
    authorization: DebtListAuthorizationResponseDto | null;
}

export interface DebtDetailResponseDto {
    id: number;
    amount: number;
    note: string;
    incurredDateTime: DateTimeISOString;
    isLocked: boolean;
    customer: CustomerBasicResponseDto;
    user: UserBasicResponseDto;
    authorization: DebtAuthorizationResponseDto;
    updateHistories: DebtUpdateHistoryResponseDto[] | null;
}

export interface DebtListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface DebtAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
    canSetCreatedDateTime: boolean;
}