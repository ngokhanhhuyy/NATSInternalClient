declare global {
    class DebtIncurrenceListRequestDto implements IDebtListRequestDto {
        orderByAscending?: boolean;
        orderByField?: string;
        month?: number;
        year?: number;
        ignoreMonthYear?: boolean;
        customerId?: number;
        createdUserId: number;
        page?: number;
        resultsPerPage?: number;
    }
    
    class DebtIncurrenceUpsertRequestDto implements IDebtUpsertRequestDto {
        amount: number;
        note: string | null;
        statsDateTime: string | null;
        customerId: number | null;
        updatedReason: string | null;
    }
}

export { };