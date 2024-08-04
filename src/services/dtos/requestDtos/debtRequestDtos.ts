export interface DebtListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    rangeFrom: string | null;
    rangeTo: string | null;
    page: number;
    resultsPerPage: number;
}

export interface DebtUpsertRequestDto {
    amount: number;
    note: string | null;
    incurredDateTime: string | null;
    customerId: number | null;
    updatingReason: string | null;
}