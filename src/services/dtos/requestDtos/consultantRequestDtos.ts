export interface ConsultantListRequestDto {
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

export interface ConsultantUpsertRequestDto {
    amount: number;
    note: string | null;
    statsDateTime: string | null;
    customerId: number;
    updatedReason: string | null;
}