export interface DebtPaymentListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    rangeFrom: string | null;
    rangeTo: string | null;
    page: number;
    resultsPerPage: number;
}

export interface DebtPaymentUpsertRequestDto {
    amount: number;
    note: string | null;
    paidDateTime: string | null;
    customerId: number;
}