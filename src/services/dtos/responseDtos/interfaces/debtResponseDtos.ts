declare global {
    interface IDebtListResponseDto<
                TBasic extends IDebtBasicResponseDto<TAuthorization>,
                TAuthorization extends IFinancialEngageableExistingAuthorizationResponseDto>
            extends IFinancialEngageableListResponseDto<TBasic, TAuthorization> { }

    interface IDebtBasicResponseDto<
                TAuthorization extends IFinancialEngageableExistingAuthorizationResponseDto>
            extends ICustomerEngageableBasicResponseDto<TAuthorization> { }

    interface IDebtDetailResponseDto<
                TUpdateHistory extends IFinancialEngageableUpdateHistoryResponseDto,
                TAuthorization extends IFinancialEngageableExistingAuthorizationResponseDto>
            extends
                ICustomerEngageableDetailResponseDto<TUpdateHistory, TAuthorization> { }
    
    interface IDebtUpdateHistoryResponseDto
            extends IFinancialEngageableUpdateHistoryResponseDto {
        oldAmount: number;
        newAmount: number;
    }
}

export { };