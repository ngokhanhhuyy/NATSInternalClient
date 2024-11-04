declare global {
    interface IDebtListRequestDto extends ICustomerEngageableListRequestDto { 
    }

    interface IDebtUpsertRequestDto extends IFinancialEngageableUpsertRequestDto {
        amount: number;
    }
}

export { };