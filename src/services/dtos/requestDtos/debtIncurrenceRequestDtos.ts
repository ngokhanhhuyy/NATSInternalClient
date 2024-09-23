export interface DebtIncurrenceListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    month: number;
    year: number;
    ignoreMonthYear: boolean;
    customerId: number | null;
    createdUserId: number | null;
    page: number;
    resultsPerPage: number;
}

export interface DebtIncurrenceUpsertRequestDto {
    amount: number;
    note: string | null;
    incurredDateTime: string | null;
    customerId: number | null;
    updatingReason: string | null;
}