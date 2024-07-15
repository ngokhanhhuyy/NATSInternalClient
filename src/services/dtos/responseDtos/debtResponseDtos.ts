import type { CustomerBasicResponseDto } from "../responseDtos/customerResponseDtos";
import type { UserBasicResponseDto } from "../responseDtos/userResponseDtos";

export interface DebtBasicResponseDto {
    id: number;
    amount: number;
    note: string;
    createdDateTime: string;
    isClosed: boolean;
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
    createdDateTime: string;
    isClosed: boolean;
    customer: CustomerBasicResponseDto;
    user: UserBasicResponseDto;
}

export interface DebtListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface DebtAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
    canSetCreatedDateTime: boolean;
}