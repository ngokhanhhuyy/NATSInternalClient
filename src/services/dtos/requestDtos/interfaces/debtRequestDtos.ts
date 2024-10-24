declare global {
    interface IDebtUpsertRequestDto extends IFinancialEngageableUpsertRequestDto {
        amount: number;
    }
}

export { };