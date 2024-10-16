import type { ExpensePhotoRequestDto } from "./expensePhotoRequestDtos";
import type { ExpenseCategory } from "../enums";

export interface ExpenseListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    month: number;
    year: number;
    ignoreMonthYear: boolean;
    category: ExpenseCategory | null;
    createdUserId: number | null;
    page: number;
    resultsPerPage: number;
}

export interface ExpenseUpsertRequestDto {
    amount: number;
    statsDateTime: string | null;
    category: ExpenseCategory;
    note: string | null;
    payeeName: string;
    photos: ExpensePhotoRequestDto[] | null;
    updatedReason: string;
}