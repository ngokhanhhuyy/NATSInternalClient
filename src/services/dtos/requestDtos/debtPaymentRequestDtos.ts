export interface DebtPaymentListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    month: number | null;
    year: number | null;
    page: number;
    resultsPerPage: number;
}

export interface DebtPaymentUpsertRequestDto {
    amount: number;
    note: string | null;
    paidDateTime: string | null;
    customerId: number;
}