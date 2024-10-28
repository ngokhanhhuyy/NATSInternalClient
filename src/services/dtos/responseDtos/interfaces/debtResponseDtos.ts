declare global {
    interface IDebtDetailResponseDto
            extends ICustomerEngageableBasicResponseDto, IFinancialEngageableDetailResponseDto {
        updateHistories: IDebtUpdateHistoryResponseDto[] | null;
    }
    
    interface IDebtUpdateHistoryResponseDto
            extends IFinancialEngageableUpdateHistoryResponseDto {
        oldAmount: number;
        newAmount: number;
    }
}

export { };