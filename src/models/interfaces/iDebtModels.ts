declare global {
    interface IDebtBasicModel<
            TAuthorization extends IHasStatsExistingAuthorizationModel>
        extends IHasCustomerBasicModel<TAuthorization> { }
    
    interface IDebtListModel<
            TBasic extends IHasCustomerBasicModel<TAuthorization>,
            TAuthorization extends IHasStatsExistingAuthorizationModel>
        extends IHasCustomerListModel<TBasic, TAuthorization> { }
    
    interface IDebtDetailModel<
                TUpdateHistory extends IDebtUpdateHistoryModel,
                TAuthorization extends IHasStatsExistingAuthorizationModel>
            extends IHasCustomerDetailModel<TUpdateHistory, TAuthorization> {
        amount: number;
    }
    
    interface IDebtUpsertModel
            extends IHasStatsUpsertModel, IHasCustomerUpsertModel {
        amount: number;
        canSetStatsDateTime: boolean;
        canDelete: boolean;
    }
    
    interface IDebtUpdateHistoryModel extends IHasStatsUpdateHistoryModel {
        oldAmount: number;
        newAmount: number;
    }
}

export { };