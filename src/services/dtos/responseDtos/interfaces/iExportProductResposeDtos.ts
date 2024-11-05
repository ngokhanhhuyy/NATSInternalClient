declare global {
    namespace ResponseDtos {
        interface IExportProductBasic<
                TAuthorization extends IHasStatsExistingAuthorization>
            extends IHasCustomerBasic<TAuthorization> {
        }
    
        interface IExportProductList<
                TBasic extends IExportProductBasic<TAuthorization>,
                TAuthorization extends IHasStatsExistingAuthorization>
            extends IHasStatsList<TBasic, TAuthorization> {
        }
        
        interface IExportProductDetail<
                TItem extends IHasProductDetailItem,
                TPhoto extends IPhoto,
                TUpdateHistory extends IExportProductUpdateHistory<TItemUpdateHistory>,
                TItemUpdateHistory extends IExportProductItemUpdateHistory,
                TAuthorization extends IHasStatsExistingAuthorization>
            extends
                IHasProductDetail<
                    TItem,
                    TPhoto,
                    TUpdateHistory,
                    TItemUpdateHistory,
                    TAuthorization>,
                IHasCustomerDetail<TUpdateHistory, TAuthorization> {
        }
        
        interface IExportProductUpdateHistory<
                    TItemUpdateHistory extends IExportProductItemUpdateHistory>
                extends IHasProductUpdateHistory<TItemUpdateHistory> {
        }
        
        interface IExportProductItemUpdateHistory extends IHasProductItemUpdateHistory {
            vatAmountPerUnit: number;
        }
    }
}

export { };