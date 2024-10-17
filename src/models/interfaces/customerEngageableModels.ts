import type { CustomerBasicModel } from "../customerModels";
import type { IFinancialEngageableAuthorizationModel, IFinancialEngageableBasicModel, IFinancialEngageableDetailModel } from "./financialEngageableModels";
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
    readonly customer: CustomerBasicModel | null;
}

export interface ICustomerEngageableDetailModel<
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel>
        extends IFinancialEngageableDetailModel<TAuthorizationModel>{
    readonly customer: CustomerBasicModel;
}