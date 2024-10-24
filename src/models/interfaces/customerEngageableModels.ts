import type { CustomerBasicModel } from "../customerModels";

declare global {
    interface ICustomerEngageableListModel extends IFinancialEngageableListModel {
        readonly customerId: number | null;
    }
    
    interface ICustomerEngageableBasicModel extends IFinancialEngageableBasicModel {
        customer: CustomerBasicModel;
    }
    
    interface ICustomerEngageableDetailModel extends IFinancialEngageableDetailModel{
        readonly customer: CustomerBasicModel;
    }
    
    interface ICustomerEngageableUpsertModel extends IFinancialEngageableUpsertModel{
        customer: CustomerBasicModel | null;
    }
}

export { };