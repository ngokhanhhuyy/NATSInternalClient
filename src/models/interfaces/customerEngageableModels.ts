import type { CustomerBasicModel } from "@/models";
import type {
    IFinancialEngageableListModel,
    IFinancialEngageableBasicModel,
    IFinancialEngageableDetailModel,
    IFinancialEngageableUpsertModel,
    IFinancialEngageableUpdateHistoryModel,
    IFinancialEngageableAuthorizationModel
} from "./financialEngageableModels";
import type { IUpsertableListAuthorizationModel } from "./upsertableModels";

export interface ICustomerEngageableListModel<
            TBasicModel extends IFinancialEngageableBasicModel<TAuthorizationModel>,
            TListAuthorizationModel extends IUpsertableListAuthorizationModel,
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel,
            TRequestDto, 
            TResponseDto>
        extends IFinancialEngageableListModel<
            TBasicModel,
            TListAuthorizationModel,
            TAuthorizationModel,
            TRequestDto,
            TResponseDto> {
    readonly customerId: number | null;
}

export interface ICustomerEngageableBasicModel<
            TAuthorization extends IFinancialEngageableAuthorizationModel>
        extends IFinancialEngageableBasicModel<TAuthorization> {
    customer: CustomerBasicModel;
}

export interface ICustomerEngageableDetailModel<
            TUpdateHistoryModel extends IFinancialEngageableUpdateHistoryModel,
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel>
        extends IFinancialEngageableDetailModel<TUpdateHistoryModel, TAuthorizationModel>{
    readonly customer: CustomerBasicModel;
}

export interface ICustomerEngageableUpsertModel<TRequestDto>
        extends IFinancialEngageableUpsertModel<TRequestDto> {
    customer: CustomerBasicModel | null;
}

export interface ICustomerEngageableUpdateHistoryModel
        extends IFinancialEngageableUpdateHistoryModel { }