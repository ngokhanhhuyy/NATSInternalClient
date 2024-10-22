import type { CustomerBasicModel } from "@/models";
import type {
    IFinancialEngageableListModel,
    IFinancialEngageableBasicModel,
    IFinancialEngageableDetailModel,
    IFinancialEngageableUpsertModel } from "./financialEngageableModels";

export interface ICustomerEngageableListModel extends IFinancialEngageableListModel {
    readonly customerId: number | null;
}

export interface ICustomerEngageableBasicModel extends IFinancialEngageableBasicModel {
    customer: CustomerBasicModel;
}

export interface ICustomerEngageableDetailModel extends IFinancialEngageableDetailModel{
    readonly customer: CustomerBasicModel;
}

export interface ICustomerEngageableUpsertModel extends IFinancialEngageableUpsertModel{
    customer: CustomerBasicModel | null;
}