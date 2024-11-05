declare global {
    type DebtIncurrenceListRequestDto = Implements<IDebtListRequestDto, {
        orderByAscending?: boolean;
        orderByField?: string;
        month?: number;
        year?: number;
        ignoreMonthYear?: boolean;
        customerId?: number;
        createdUserId: number;
        page?: number;
        resultsPerPage?: number;
    }>;
    
    type Upsert = Implements<IDebtUpsertRequestDto, {
        amount: number;
        note: string | null;
        statsDateTime: string | null;
        customerId: number | null;
        updatedReason: string | null;
    }>;
}

export { };