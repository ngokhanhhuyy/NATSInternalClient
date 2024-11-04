declare global {
    interface ICustomerEngageableBasicResponseDto<
                TAuthorization extends IFinancialEngageableExistingAuthorizationResponseDto>
            extends IFinancialEngageableBasicResponseDto<TAuthorization> {
        customer: CustomerBasicResponseDto;
    }

    interface ICustomerEngageableListResponseDto<
            TBasic extends ICustomerEngageableBasicResponseDto<TAuthorization>,
            TAuthorization extends IFinancialEngageableExistingAuthorizationResponseDto>
        extends IFinancialEngageableListResponseDto<TBasic, TAuthorization> {
    }

    interface ICustomerEngageableDetailResponseDto<
                TUpdateHistory extends IFinancialEngageableUpdateHistoryResponseDto,
                TAuthorization extends IFinancialEngageableExistingAuthorizationResponseDto>
            extends IFinancialEngageableDetailResponseDto<TUpdateHistory, TAuthorization> {
        customer: CustomerBasicResponseDto;
    }
}

export { };