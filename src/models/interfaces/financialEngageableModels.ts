import { UserBasicModel } from "@/models";
import type { IUpsertableAuthorizationModel, IUpsertableBasicModel } from "./upsertableModels";
import type { IUpdateHistoryModel } from "@/models/interfaces/updateHistoryModels";
import type { DateTimeDisplayModel } from "../dateTimeModels";
import type { IUpsertModel } from "./baseModels";

export interface IFinancialEngageableBasicModel<
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel>
        extends IUpsertableBasicModel<TAuthorizationModel> {
    readonly statsDateTime: DateTimeDisplayModel;
    readonly authorization: TAuthorizationModel | null;
}

export interface IFinancialEngageableDetailModel<
            TUpdateHistoryModel extends IFinancialEngageableUpdateHistoryModel,
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel>
        extends IFinancialEngageableBasicModel<TAuthorizationModel> {
    readonly createdDateTime: DateTimeDisplayModel;
    readonly note: string | null;
    readonly isLocked: boolean;
    readonly createdUser: UserBasicModel;
    readonly updateHistories: TUpdateHistoryModel[] | null;
}

export interface IFinancialEngageableUpsertModel<TRequestDto>
        extends IUpsertModel<TRequestDto> {
    updatedReason: string;
}

export interface IFinancialEngageableAuthorizationModel extends IUpsertableAuthorizationModel {
    readonly canSetStatsDateTime: boolean;
}

export interface IFinancialEngageableUpdateHistoryModel extends IUpdateHistoryModel {
    oldStatsDateTime: DateTimeDisplayModel;
    oldNote: string | null;
    newStatsDateTime: DateTimeDisplayModel;
    newNote: string | null;
}