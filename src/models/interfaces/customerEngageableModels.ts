import type { CustomerBasicModel } from "../customerModels";

declare global {
    interface ICustomerEngageableListModel<
                TBasic extends ICustomerEngageableBasicModel<TAuthorization>,
                TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
            extends IFinancialEngageableListModel<TBasic, TAuthorization> {
        readonly customerId?: number;
    }
    
    interface ICustomerEngageableBasicModel<
                TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
            extends IFinancialEngageableBasicModel<TAuthorization> {
        customer: CustomerBasicModel;
    }
    
    interface ICustomerEngageableDetailModel<
                TUpdateHistory extends IFinancialEngageableUpdateHistoryModel,
                TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
            extends IFinancialEngageableDetailModel<TUpdateHistory, TAuthorization> {
        readonly customer: CustomerBasicModel;
    }
    
    interface ICustomerEngageableUpsertModel extends IFinancialEngageableUpsertModel {
        customer: CustomerBasicModel | null;
    }
}

export { };