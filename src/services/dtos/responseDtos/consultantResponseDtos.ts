import type { ConsultantUpdateHistoryResponseDto } from "./consultantUpdateHistoryResponseDtos";
import type { CustomerBasicResponseDto } from "./customerResponseDtos";
import type { UserBasicResponseDto } from "./userResponseDtos";
import type { MonthYearResponseDto } from "./monthYearResponseDtos";

export interface ConsultantBasicResponseDto {
    id: number;
    amount: number;
    statsDateTime: string;
    isLocked: boolean;
    customer: CustomerBasicResponseDto;
    authorization: ConsultantAuthorizationResponseDto | null;
}

export interface ConsultantListResponseDto {
    pageCount: number;
    items: ConsultantBasicResponseDto[] | null;
    monthYearOptions: MonthYearResponseDto[];
    authorization: ConsultantListAuthorizationResponseDto | null;
}

export interface ConsultantDetailResponseDto {
    id: number;
    amountBeforeVat: number;
    vatAmount: number;
    note: string | null;
    statsDateTime: string;
    createdDateTime: string;
    isLocked: boolean;
    customer: CustomerBasicResponseDto;
    createdUser: UserBasicResponseDto;
    authorization: ConsultantAuthorizationResponseDto;
    updateHistories: ConsultantUpdateHistoryResponseDto[] | null;
}

export interface ConsultantListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface ConsultantAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
    canSetStatsDateTime: boolean;
}