declare global {
    export interface DebtPaymentListRequestDto {
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
    
    export interface DebtPaymentUpsertRequestDto {
        amount: number;
        note: string | null;
        statsDateTime: string | null;
        customerId: number;
        updatedReason: string | null;
    }
}

export { };