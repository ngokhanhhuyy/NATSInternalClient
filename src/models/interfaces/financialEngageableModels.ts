import type { IUpsertableAuthorizationModel, IUpsertableBasicModel } from "./upsertableModels";
import type { UserBasicModel } from "../userModels";
import type { DateTimeDisplayModel } from "../dateTimeModels";

export interface IFinancialEngageableBasicModel<
            TAuthorization extends IFinancialEngageableAuthorizationModel>
        extends IUpsertableBasicModel<TAuthorization> {
    readonly statsDateTime: DateTimeDisplayModel;
    readonly authorization: TAuthorization | null;
}

export interface IFinancialEngageableDetailModel<
            TAuthorization extends IFinancialEngageableAuthorizationModel>
        extends IFinancialEngageableBasicModel<TAuthorization> {
    readonly createdDateTime: DateTimeDisplayModel;
    readonly note: string | null;
    readonly isLocked: boolean;
    readonly createdUser: UserBasicModel;
}

export interface IFinancialEngageableAuthorizationModel extends IUpsertableAuthorizationModel {
    readonly canSetStatsDateTime: boolean;
}