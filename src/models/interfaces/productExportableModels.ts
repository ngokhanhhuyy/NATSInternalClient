declare global {
    interface IProductExportableBasicModel<
                TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
            extends ICustomerEngageableBasicModel<TAuthorization> {
        amountAfterVat: number;
    }

    interface IProductExportableListModel<
            TBasic extends ICustomerEngageableBasicModel<TAuthorization>,
            TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
        extends
            IProductEngageableListModel<TBasic, TAuthorization>,
            ICustomerEngageableListModel<TBasic, TAuthorization> { }
    
    interface IProductExportableDetailModel<
                TItem extends IProductEngageableDetailItemModel,
                TUpdateHistory
                    extends IProductExportableUpdateHistoryModel<TItemUpdateHistory>,
                TItemUpdateHistory extends IProductExportableItemUpdateHistoryModel,
                TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
            extends
                IProductEngageableDetailModel<
                    TItem,
                    TUpdateHistory,
                    TItemUpdateHistory,
                    TAuthorization>,
                ICustomerEngageableDetailModel<TUpdateHistory, TAuthorization> {
        readonly productAmountBeforeVat: number;
        readonly productVatAmount: number;
        readonly amountBeforeVat: number;
        readonly vatAmount: number;
        readonly amountAfterVat: number;
    }
    
    interface IProductExportableUpsertModel<
                TUpsertItem extends IProductExportableUpsertItemModel,
                TPhoto extends IUpsertPhotoModel>
            extends
                IProductEngageableUpsertModel<TUpsertItem, TPhoto>,
                ICustomerEngageableUpsertModel {
        readonly productAmountBeforeVat: number;
        readonly productVatAmount: number;
        readonly productAmountAfterVat: number;
        readonly amountBeforeVat: number;
        readonly vatAmount: number;
        readonly amountAfterVat: number;
    }
    
    interface IProductExportableDetailItemModel extends IProductEngageableDetailItemModel {
        vatAmountPerUnit: number;
    }
    
    interface IProductExportableUpsertItemModel extends IProductEngageableUpsertItemModel {
        vatPercentagePerUnit: number;
        readonly vatAmountPerUnit: number;
    }
    
    interface IProductExportableUpdateHistoryModel<
                TItemUpdateHistory extends IProductExportableItemUpdateHistoryModel>
            extends IProductEngageableUpdateHistoryModel<TItemUpdateHistory> { }
    
    interface IProductExportableItemUpdateHistoryModel
            extends IProductEngageableItemUpdateHistoryModel {
        vatAmountPerUnit: number;
    }
}

export { };