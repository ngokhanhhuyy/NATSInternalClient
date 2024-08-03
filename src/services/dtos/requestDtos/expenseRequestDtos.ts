import type { ExpensePhotoRequestDto } from "./expensePhotoRequestDtos";
import type { ExpenseCategory } from "../enums";

export interface ExpenseListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    rangeFrom: DateISOString | null;
    rangeTo: DateISOString | null;
    category: ExpenseCategory | null;
    page: number;
    resultsPerPage: number;
}

export interface ExpenseUpsertRequestDto {
    amount: number;
    paidDateTime: DateTimeISOString | null;
    category: ExpenseCategory;
    note: string | null;
    payeeName: string;
    photos: ExpensePhotoRequestDto[] | null;
}