declare global {
    class ConsultantListRequestDto implements ICustomerEngageableListRequestDto {
        orderByAscending?: boolean;
        orderByField?: string;
        monthYear?: ListMonthYearRequestDto;
        customerId?: number;
        createdUserId?: number;
        page?: number;
        resultsPerPage?: number;
    }
    
    class ConsultantUpsertRequestDto implements ICustomerEngageableUpsertRequestDto {
        amountBeforeVat: number;
        vatAmount: number;
        note: string | null;
        statsDateTime: string | null;
        customerId: number;
        updatedReason: string | null;
    }
}

export { };