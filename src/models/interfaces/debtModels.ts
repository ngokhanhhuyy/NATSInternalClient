import type {
    IFinancialEngageableAuthorizationModel, 
    IFinancialEngageableUpdateHistoryModel,
    IFinancialEngageableUpsertModel} from "./financialEngageableModels";
import type {
    ICustomerEngageableBasicModel,
    ICustomerEngageableDetailModel,
    ICustomerEngageableListModel, 
    ICustomerEngageableUpsertModel} from "./customerEngageableModels";
import type { IUpsertableListAuthorizationModel } from "./upsertableModels";

export interface IDebtBasicModel<
            TAuthorization extends IFinancialEngageableAuthorizationModel>
        extends ICustomerEngageableBasicModel<TAuthorization> { }

export interface IDebtListModel<
            TBasicModel extends IDebtBasicModel<TAuthorizationModel>,
            TListAuthorizationModel extends IUpsertableListAuthorizationModel,
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel,
            TRequestDto,
            TResponseDto>
        extends ICustomerEngageableListModel<
            TBasicModel,
            TListAuthorizationModel,
            TAuthorizationModel,
            TRequestDto,
            TResponseDto> {}

export interface IDebtDetailModel<
            TUpdateHistoryModel extends IDebtUpdateHistoryModel,
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel>
        extends ICustomerEngageableDetailModel<TUpdateHistoryModel, TAuthorizationModel> {
    amount: number;
}

export interface IDebtUpsertModel<TRequestDto> extends
        IFinancialEngageableUpsertModel<TRequestDto>,
        ICustomerEngageableUpsertModel<TRequestDto> {
    amount: number;
}

export interface IDebtUpdateHistoryModel extends IFinancialEngageableUpdateHistoryModel {
    oldAmount: number;
    newAmount: number;
}