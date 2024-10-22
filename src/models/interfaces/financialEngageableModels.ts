import { MonthYearModel, UserBasicModel } from "@/models";
import type {
    IUpsertableAuthorizationModel,
    IUpsertableBasicModel,
    IUpsertableListModel } from "./upsertableModels";
import type { IUpdateHistoryModel } from "@/models/interfaces/updateHistoryModels";
import type { DateTimeDisplayModel } from "../dateTimeModels";
import type { IUpsertModel } from "./baseModels";
import type {
    IFinancialEngageableListRequestDto, 
    IFinancialEngageableUpsertRequestDto} from "@/services/dtos/requestDtos/interfaces";

export interface IFinancialEngageableListModel extends IUpsertableListModel {
    items: IFinancialEngageableBasicModel[];
    monthYear: MonthYearModel | null;
    ignoreMonthYear: boolean;
    monthYearOptions: MonthYearModel[];
    toRequestDto(): IFinancialEngageableListRequestDto;
}

export interface IFinancialEngageableBasicModel extends IUpsertableBasicModel {
    readonly statsDateTime: DateTimeDisplayModel;
    readonly isLocked: boolean;
    readonly authorization: IFinancialEngageableAuthorizationModel | null;
}

export interface IFinancialEngageableDetailModel extends IFinancialEngageableBasicModel {
    readonly createdDateTime: DateTimeDisplayModel;
    readonly note: string | null;
    readonly isLocked: boolean;
    readonly createdUser: UserBasicModel;
    readonly updateHistories: IFinancialEngageableUpdateHistoryModel[] | null;
    readonly authorization: IFinancialEngageableAuthorizationModel | null;
}

export interface IFinancialEngageableUpsertModel extends IUpsertModel {
    id: number;
    statsDateTime: IDateTimeInputModel;
    note: string;
    updatedReason: string;
    toRequestDto(): IFinancialEngageableUpsertRequestDto;
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