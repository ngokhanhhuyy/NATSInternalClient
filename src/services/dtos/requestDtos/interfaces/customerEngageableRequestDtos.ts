declare global {
    interface ICustomerEngageableListRequestDto extends IFinancialEngageableListRequestDto {
        customerId?: number;
    }
    
    interface ICustomerEngageableUpsertRequestDto
            extends IFinancialEngageableUpsertRequestDto {
        customerId: number | null;
    }
}

export { };