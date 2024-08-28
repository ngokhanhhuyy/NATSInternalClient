import { DebtOperationType, Gender } from "@/services/dtos/enums";
import type { DebtIncurrenceUpdateHistoryResponseDto } from "@/services/dtos/responseDtos/debtIncurrenceUpdateHistoryResponseDtos";

export interface CustomerBasicResponseDto {
    id: number;
    fullName: string;
    nickName: string | null;
    gender: Gender;
    birthday: string | null;
    phoneNumber: string | null;
    debtRemainingAmount: number;
    authorization: CustomerAuthorizationResponseDto | null;
}

export interface CustomerListResponseDto {
    pageCount: number;
    results: CustomerBasicResponseDto[] | null;
    authorization: CustomerListAuthorizationResponseDto | null;
}

export interface CustomerDetailResponseDto {
    id: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
    fullName: string;
    nickName: string | null;
    gender: Gender;
    birthday: string | null;
    phoneNumber: string | null;
    zaloNumber: string | null;
    facebookUrl: string | null;
    email: string | null;
    address: string | null;
    note: string | null;
    createdDateTime: string;
    updatedDateTime: string | null;
    introducer: CustomerBasicResponseDto | null;
    debtRemainingAmount: number;
    debtOperations: CustomerDebtOperationResponseDto[] | null;
    authorization: CustomerAuthorizationResponseDto;
}

export interface CustomerCreateResponseDto {
    id: number;
}

export interface CustomerAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
}

export interface CustomerListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface CustomerDebtOperationResponseDto {
    operation: DebtOperationType,
    amount: number;
    operatedDateTime: string;
    isLocked: boolean;
    authorization: CustomerDebtOperationAuthorizationResponseDto;
}

export interface CustomerDebtOperationAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
}