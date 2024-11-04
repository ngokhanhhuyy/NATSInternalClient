declare global {
    class DebtPaymentListRequestDto implements IDebtListRequestDto {
        orderByAscending?: boolean;
        orderByField?: string;
        month?: number;
        year?: number;
        ignoreMonthYear?: boolean;
        customerId?: number;
        createdUserId?: number;
        page?: number;
        resultsPerPage?: number;
    }
    
    class DebtPaymentUpsertRequestDto implements IDebtUpsertRequestDto {
        amount: number;
        note: string | null;
        statsDateTime: string | null;
        customerId: number;
        updatedReason: string | null;
    }
}

export { };