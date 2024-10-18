import type { UserBasicResponseDto } from "./userResponseDtos";
import type { ExpensePayeeResponseDto } from "./expensePayeeResponseDtos";
import type { ExpensePhotoResponseDto } from "./expensePhotoResponseDtos";
import type { ExpenseUpdateHistoryResponseDto } from "./expenseUpdateHistoryResponseDtos";
import type { MonthYearResponseDto } from "./monthYearResponseDtos";
import type { ExpenseCategory } from "../enums";

export interface ExpenseBasicResponseDto {
    id: number;
    amount: number;
    statsDateTime: string;
    category: ExpenseCategory;
    isLocked: boolean;
    thumbnailUrl: string | null;
    authorization: ExpenseAuthorizationResponseDto;
}

export interface ExpenseListResponseDto {
    pageCount: number;
    items: ExpenseBasicResponseDto[] | null;
    monthYearOptions: MonthYearResponseDto[];
    authorization: ExpenseListAuthorizationResponseDto | null;
}

export interface ExpenseDetailResponseDto {
    id: number;
    amount: number;
    statsDateTime: string;
    createdDateTime: string;
    category: ExpenseCategory;
    note: string;
    isLocked: boolean;
    createdUser: UserBasicResponseDto;
    payee: ExpensePayeeResponseDto;
    photos: ExpensePhotoResponseDto[] | null;
    authorization: ExpenseAuthorizationResponseDto | null;
    updateHistories: ExpenseUpdateHistoryResponseDto[] | null;
}

export interface ExpenseListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface ExpenseAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
    canSetStatsDateTime: boolean;
}