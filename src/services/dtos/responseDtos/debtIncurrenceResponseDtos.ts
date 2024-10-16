import type { DebtIncurrenceUpdateHistoryResponseDto } from "./debtIncurrenceUpdateHistoryResponseDtos";
import type { CustomerBasicResponseDto } from "./customerResponseDtos";
import type { UserBasicResponseDto } from "./userResponseDtos";
import type { MonthYearResponseDto } from "./monthYearResponseDtos";

export interface DebtIncurrenceBasicResponseDto {
    id: number;
    amount: number;
    statsDateTime: string;
    isLocked: boolean;
    customer: CustomerBasicResponseDto;
    authorization: DebtIncurrenceAuthorizationResponseDto | null;
}

export interface DebtIncurrenceListResponseDto {
    pageCount: number;
    items: DebtIncurrenceBasicResponseDto[] | null;
    monthYearOptions: MonthYearResponseDto[];
    authorization: DebtIncurrenceListAuthorizationResponseDto | null;
}

export interface DebtIncurrenceDetailResponseDto {
    id: number;
    amount: number;
    note: string;
    statsDateTime: string;
    createdDateTime: string;
    isLocked: boolean;
    customer: CustomerBasicResponseDto;
    createdUser: UserBasicResponseDto;
    authorization: DebtIncurrenceAuthorizationResponseDto;
    updateHistories: DebtIncurrenceUpdateHistoryResponseDto[] | null;
}

export interface DebtIncurrenceListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface DebtIncurrenceAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
    canSetStatsDateTime: boolean;
}