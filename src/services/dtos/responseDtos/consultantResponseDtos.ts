import type { CustomerBasicResponseDto } from "./customerResponseDtos";
import type { UserBasicResponseDto } from "./userResponseDtos";

export interface ConsultantBasicResponseDto {
    id: number;
    amount: number;
    paidDateTime: string;
    isLocked: boolean;
    customer: CustomerBasicResponseDto;
    authorization: ConsultantAuthorizationResponseDto | null;
}

export interface ConsultantListResponseDto {
    pageCount: number;
    items: ConsultantBasicResponseDto[] | null;
    authorization: ConsultantListAuthorizationResponseDto | null;
}

export interface ConsultantDetailResponseDto {
    id: number;
    amount: number;
    note: string | null;
    paidDateTime: string;
    isLocked: boolean;
    customer: CustomerBasicResponseDto;
    user: UserBasicResponseDto;
    authorization: ConsultantAuthorizationResponseDto;
}

export interface ConsultantListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface ConsultantAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
    canSetPaidDateTime: boolean;
}