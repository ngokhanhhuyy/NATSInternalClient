export interface ConsultantListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    month: number | null;
    year: number | null;
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