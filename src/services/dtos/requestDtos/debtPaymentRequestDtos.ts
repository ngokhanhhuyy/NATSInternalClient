export interface DebtPaymentListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    rangeFrom: DateISOString | null;
    rangeTo: DateISOString | null;
    page: number;
    resultsPerPage: number;
}

export interface DebtPaymentUpsertRequestDto {
    amount: number;
    note: string | null;
    paidDateTime: DateTimeISOString | null;
    customerId: number;
}