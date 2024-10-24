declare global {
    interface DebtIncurrenceListRequestDto {
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
    
    interface DebtIncurrenceUpsertRequestDto {
        amount: number;
        note: string | null;
        statsDateTime: string | null;
        customerId: number | null;
        updatedReason: string | null;
    }
}

export { };