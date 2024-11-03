declare global {
    interface IDebtListResponseDto extends IFinancialEngageableListResponseDto {
        items: IDebtBasicResponseDto[] | null;
    }

    interface IDebtBasicResponseDto extends ICustomerEngageableBasicResponseDto { }

    interface IDebtDetailResponseDto extends
            ICustomerEngageableBasicResponseDto,
            IFinancialEngageableDetailResponseDto {
        updateHistories: IDebtUpdateHistoryResponseDto[] | null;
    }
    
    interface IDebtUpdateHistoryResponseDto
            extends IFinancialEngageableUpdateHistoryResponseDto {
        oldAmount: number;
        newAmount: number;
    }
}

export { };