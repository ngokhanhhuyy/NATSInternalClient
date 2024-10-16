import type { UserBasicModel, MonthYearModel } from "@/models";
import type { IUpsertableListModel, IUpsertableBasicModel, IUpsertableAuthorizationModel,
    IUpsertableListAuthorizationModel } from "./upsertableModels";

export interface ILockableListModel<
            TBasicModel extends IUpsertableBasicModel<TAuthorizationModel>,
            TAuthorizationModel extends IUpsertableAuthorizationModel,
            TListAuthorizationModel extends IUpsertableListAuthorizationModel,
            TRequestDto,
            TResponseDto>
        extends IUpsertableListModel<
            TBasicModel,
            TAuthorizationModel,
            TListAuthorizationModel,
            TRequestDto,
            TResponseDto> {
    monthYear: MonthYearModel | null;
    createdUserId: number | null;
    monthYearOptions: MonthYearModel[];
}

export interface ILockableBasicModel<
            TAuthorizationModel extends IUpsertableAuthorizationModel>
        extends IUpsertableBasicModel<TAuthorizationModel> {
    readonly amount: number;
    readonly statsDateTime: IDateTimeDisplayModel;
    readonly isLocked: boolean;
}

export interface ILockableDetailModel<
            TAuthorizationModel extends ILockableAuthorizationModel>
        extends ILockableBasicModel<TAuthorizationModel> {
    readonly createdDateTime: IDateTimeDisplayModel;
    readonly createdUser: UserBasicModel;
    readonly note: string;
    readonly updateHistories: ILockableUpdateHistoryModel[] | null;
}

export interface ILockableAuthorizationModel extends IUpsertableAuthorizationModel {
    readonly canSetStatsDateTime: boolean;
}

export interface ILockableUpdateHistoryModel {
    readonly updatedDateTime: IDateTimeDisplayModel;
    readonly updatedUser: UserBasicModel;
    readonly updatingReason: string;
}