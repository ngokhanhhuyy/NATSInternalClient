declare global {
    interface IExportProductBasicModel<
                TAuthorization extends IHasStatsExistingAuthorizationModel>
            extends IHasCustomerBasicModel<TAuthorization> {
        amountAfterVat: number;
    }

    interface IExportProductListModel<
            TBasic extends IHasCustomerBasicModel<TAuthorization>,
            TAuthorization extends IHasStatsExistingAuthorizationModel>
        extends
            IHasProductListModel<TBasic, TAuthorization>,
            IHasCustomerListModel<TBasic, TAuthorization> { }
    
    interface IExportProductDetailModel<
                TItem extends IHasProductDetailItemModel,
                TUpdateHistory
                    extends IExportProductUpdateHistoryModel<TItemUpdateHistory>,
                TItemUpdateHistory extends IExportProductItemUpdateHistoryModel,
                TAuthorization extends IHasStatsExistingAuthorizationModel>
            extends
                IHasProductDetailModel<
                    TItem,
                    TUpdateHistory,
                    TItemUpdateHistory,
                    TAuthorization>,
                IHasCustomerDetailModel<TUpdateHistory, TAuthorization> {
        readonly productAmountBeforeVat: number;
        readonly productVatAmount: number;
        readonly amountBeforeVat: number;
        readonly vatAmount: number;
        readonly amountAfterVat: number;
    }
    
    interface IExportProductUpsertModel<
                TUpsertItem extends IExportProductUpsertItemModel,
                TPhoto extends IUpsertPhotoModel>
            extends
                IHasProductUpsertModel<TUpsertItem, TPhoto>,
                IHasCustomerUpsertModel {
        readonly productAmountBeforeVat: number;
        readonly productVatAmount: number;
        readonly productAmountAfterVat: number;
        readonly amountBeforeVat: number;
        readonly vatAmount: number;
        readonly amountAfterVat: number;
    }
    
    interface IExportProductDetailItemModel extends IHasProductDetailItemModel {
        vatAmountPerUnit: number;
    }
    
    interface IExportProductUpsertItemModel extends IHasProductUpsertItemModel {
        vatPercentagePerUnit: number;
        readonly vatAmountPerUnit: number;
    }
    
    interface IExportProductUpdateHistoryModel<
                TItemUpdateHistory extends IExportProductItemUpdateHistoryModel>
            extends IHasProductUpdateHistoryModel<TItemUpdateHistory> { }
    
    interface IExportProductItemUpdateHistoryModel
            extends IHasProductItemUpdateHistoryModel {
        vatAmountPerUnit: number;
    }
}

export { };