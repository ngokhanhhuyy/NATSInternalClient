import type { ExpenseCategory } from "../enums";

declare global {
    interface ExpenseListRequestDto {
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
    
    interface ExpenseUpsertRequestDto {
        amount: number;
        statsDateTime: string | null;
        category: ExpenseCategory;
        note: string | null;
        payeeName: string;
        photos: ExpenseUpsertPhotoRequestDto[] | null;
        updatedReason: string | null;
    }
}

export { };