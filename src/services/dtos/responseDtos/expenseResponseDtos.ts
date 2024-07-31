import type { UserBasicResponseDto } from "./userResponseDtos";
import type { ExpensePayeeResponseDto } from "./expensePayeeResponseDtos";
import type { ExpensePhotoResponseDto } from "./expensePhotoResponseDtos";
import type { ExpenseCategory } from "../enums";

export interface ExpenseBasicResponseDto {
    id: number;
    amount: number;
    paidDateTime: string;
    category: ExpenseCategory;
    isLocked: boolean;
    authorization: ExpenseAuthorizationResponseDto;
}

export interface ExpenseListResponseDto {
    items: ExpenseBasicResponseDto[] | null;
    pageCount: number;
}

export interface ExpenseDetailResponseDto {
    id: number;
    amount: number;
    paidDateTime: string;
    category: ExpenseCategory;
    note: string;
    isLocked: boolean;
    user: UserBasicResponseDto;
    payee: ExpensePayeeResponseDto;
    photos: ExpensePhotoResponseDto[] | null;
    authorization: ExpenseAuthorizationResponseDto | null;
}

export interface ExpenseAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
}