declare global {
    interface ConsultantListRequestDto {
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
    
    interface ConsultantUpsertRequestDto {
        amountBeforeVat: number;
        vatAmount: number;
        note: string | null;
        statsDateTime: string | null;
        customerId: number;
        updatedReason: string | null;
    }
}

export { };