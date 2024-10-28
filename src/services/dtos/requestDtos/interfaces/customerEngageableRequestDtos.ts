declare global {
    interface ICustomerEngageableListRequestDto extends IFinancialEngageableListRequestDto {
        customerId: number | null;
    }
    
    interface ICustomerEngageableUpsertRequestDto
            extends IFinancialEngageableUpsertRequestDto {
        customerId: number | null;
    }
}

export { };