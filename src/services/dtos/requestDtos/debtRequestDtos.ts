export interface DebtListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    rangeFrom: DateISOString | null;
    rangeTo: DateISOString | null;
    page: number;
    resultsPerPage: number;
}

export interface DebtUpsertRequestDto {
    amount: number;
    note: string | null;
    incurredDateTime: DateTimeISOString | null;
    customerId: number | null;
    updatingReason: string | null;
}