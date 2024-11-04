declare global {
    interface IProductExportableBasicResponseDto<
            TAuthorization extends IFinancialEngageableExistingAuthorizationResponseDto>
        extends ICustomerEngageableBasicResponseDto<TAuthorization> {
    }

    interface IProductExportableListResponseDto<
            TBasic extends IProductExportableBasicResponseDto<TAuthorization>,
            TAuthorization extends IFinancialEngageableExistingAuthorizationResponseDto>
        extends IFinancialEngageableListResponseDto<TBasic, TAuthorization> {}
    
    interface IProductExportableDetailResponseDto<
                TItem extends IProductEngageableItemResponseDto,
                TPhoto extends IPhotoResponseDto,
                TUpdateHistory
                    extends IProductEngageableUpdateHistoryResponseDto<TItemUpdateHistory>,
                TItemUpdateHistory extends IProductExportableItemUpdateHistoryDataDto,
                TAuthorization extends IFinancialEngageableExistingAuthorizationResponseDto>
            extends
                IProductEngageableDetailResponseDto<
                    TItem,
                    TPhoto,
                    TUpdateHistory,
                    TItemUpdateHistory,
                    TAuthorization>,
                ICustomerEngageableDetailResponseDto<TUpdateHistory, TAuthorization> {
    }
    
    interface IProductExportableUpdateHistoryResponseDto<
                TItemUpdateHistory extends IProductExportableItemUpdateHistoryDataDto>
            extends IProductEngageableUpdateHistoryResponseDto<TItemUpdateHistory> {
    }
    
    interface IProductExportableItemUpdateHistoryDataDto
            extends IProductEngageableItemUpdateHistoryDataDto {
        vatAmountPerUnit: number;
    }
}

export { };