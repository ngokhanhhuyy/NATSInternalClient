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
    paidDateTime: string | null;
    note: string | null;
    hasBeenChanged: boolean;
}