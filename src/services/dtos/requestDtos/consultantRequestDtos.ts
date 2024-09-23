export interface ConsultantListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    month: number;
    year: number;
    ignoreMonthYear: boolean;
    page: number;
    resultsPerPage: number;
}

export interface ConsultantUpsertRequestDto {
    amount: number;
    note: string | null;
    paidDateTime: string | null;
    customerId: number;
    updateReason: string | null;
}