declare global {
    interface ConsultantListRequestDto {
        orderByAscending?: boolean;
        orderByField?: string;
        monthYear?: ListMonthYearRequestDto;
        customerId?: number;
        createdUserId?: number;
        page?: number;
        resultsPerPage?: number;
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