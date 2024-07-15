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
    createdDateTime: string | null;
    customerId: number
}