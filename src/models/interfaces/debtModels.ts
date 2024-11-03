declare global {
    interface IDebtBasicModel<
            TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
        extends ICustomerEngageableBasicModel<TAuthorization> { }
    
    interface IDebtListModel<
            TBasic extends ICustomerEngageableBasicModel<TAuthorization>,
            TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
        extends ICustomerEngageableListModel<TBasic, TAuthorization> { }
    
    interface IDebtDetailModel<
                TUpdateHistory extends IDebtUpdateHistoryModel,
                TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
            extends ICustomerEngageableDetailModel<TUpdateHistory, TAuthorization> {
        amount: number;
    }
    
    interface IDebtUpsertModel
            extends
                IFinancialEngageableUpsertModel,
                ICustomerEngageableUpsertModel {
        amount: number;
    }
    
    interface IDebtUpdateHistoryModel extends IFinancialEngageableUpdateHistoryModel {
        oldAmount: number;
        newAmount: number;
    }
}

export { };