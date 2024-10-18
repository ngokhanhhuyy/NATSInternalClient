import { MonthYearModel, UserBasicModel } from "@/models";
import type {
    IUpsertableAuthorizationModel,
    IUpsertableBasicModel,
    IUpsertableListAuthorizationModel,
    IUpsertableListModel } from "./upsertableModels";
import type { IUpdateHistoryModel } from "@/models/interfaces/updateHistoryModels";
import type { DateTimeDisplayModel } from "../dateTimeModels";
import type { IUpsertModel } from "./baseModels";

export interface IFinancialEngageableListModel<
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
    monthYear: MonthYearModel | null;
    ignoreMonthYear: boolean;
    monthYearOptions: MonthYearModel[];
}

export interface IFinancialEngageableBasicModel<
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel>
        extends IUpsertableBasicModel<TAuthorizationModel> {
    readonly statsDateTime: DateTimeDisplayModel;
    readonly isLocked: boolean;
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
    id: number;
    statsDateTime: string;
    note: string;
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