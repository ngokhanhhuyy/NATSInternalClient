import type { CustomerBasicModel } from "@/models";
import type {
    IFinancialEngageableAuthorizationModel,
    IFinancialEngageableBasicModel,
    IFinancialEngageableDetailModel,
    IFinancialEngageableUpdateHistoryModel, IFinancialEngageableUpsertModel
} from "./financialEngageableModels";
import type { IUpsertableListAuthorizationModel, IUpsertableListModel } from "./upsertableModels";

export interface ICustomerEngageableListModel<
            TBasicModel extends IFinancialEngageableBasicModel<TAuthorizationModel>,
            TListAuthorizationModel extends IUpsertableListAuthorizationModel,
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel,
            TRequestDto, 
            TResponseDto>
        extends IUpsertableListModel<
            TBasicModel,
            TListAuthorizationModel,
            TAuthorizationModel,
            TRequestDto,
            TResponseDto> {
    readonly customerId: number | null;
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