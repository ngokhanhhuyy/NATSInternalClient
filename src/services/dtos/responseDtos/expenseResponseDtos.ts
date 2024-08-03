import type { UserBasicResponseDto } from "./userResponseDtos";
import type { ExpensePayeeResponseDto } from "./expensePayeeResponseDtos";
import type { ExpensePhotoResponseDto } from "./expensePhotoResponseDtos";
import type { ExpenseUpdateHistoryResponseDto } from "./expenseUpdateHistoryResponseDtos";
import type { ExpenseCategory } from "../enums";

export interface ExpenseBasicResponseDto {
    id: number;
    amount: number;
    paidDateTime: DateTimeISOString;
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
    paidDateTime: DateTimeISOString;
    category: ExpenseCategory;
    note: string;
    isLocked: boolean;
    user: UserBasicResponseDto;
    payee: ExpensePayeeResponseDto;
    photos: ExpensePhotoResponseDto[] | null;
    authorization: ExpenseAuthorizationResponseDto | null;
    updateHistories: ExpenseUpdateHistoryResponseDto[] | null;
}

export interface ExpenseAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
}