import type { ExpensePhotoRequestDto } from "./expensePhotoRequestDtos";
import type { ExpenseCategory } from "../enums";

export interface ExpenseListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    month: number | null;
    year: number | null;
    category: ExpenseCategory | null;
    page: number;
    resultsPerPage: number;
}

export interface ExpenseUpsertRequestDto {
    amount: number;
    paidDateTime: string | null;
    category: ExpenseCategory;
    note: string | null;
    payeeName: string;
    photos: ExpensePhotoRequestDto[] | null;
}