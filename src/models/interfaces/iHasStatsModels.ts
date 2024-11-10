import { ListMonthYearModel, ListMonthYearOptionsModel } from "../listMonthYearModels";
import { UserBasicModel } from "../userModels";
import type { DateTimeDisplayModel } from "../dateTimeModels";

type MonthYearOptionsResponseDto = ResponseDtos.List.MonthYearOptions;

declare global {
    interface IHasStatsListModel<
                TBasic extends IHasStatsBasicModel<TAuthorization>,
                TAuthorization extends IHasStatsExistingAuthorizationModel>
            extends
                IUpsertableListModel<TBasic, TAuthorization>,
                ISortableListModel<TBasic>{
        monthYear?: ListMonthYearModel;
        monthYearOptions?: ListMonthYearOptionsModel;
        mapFromMonthYearOptionsResponseDto(responseDto: MonthYearOptionsResponseDto): void;
    }
    
    interface IHasStatsBasicModel<TAuthorization extends IHasStatsExistingAuthorizationModel>
            extends IUpsertableBasicModel<TAuthorization> {
        readonly amount: number;
        readonly statsDateTime: DateTimeDisplayModel;
        readonly isLocked: boolean;
    }
    
    interface IHasStatsDetailModel<
                TUpdateHistory extends IHasStatsUpdateHistoryModel,
                TAuthorization extends IHasStatsExistingAuthorizationModel>
            extends IUpsertableDetailModel<TAuthorization> {
        readonly createdDateTime: DateTimeDisplayModel;
        readonly statsDateTime: DateTimeDisplayModel;
        readonly note: string | null;
        readonly isLocked: boolean;
        readonly createdUser: UserBasicModel;
        readonly updateHistories: TUpdateHistory[] | null;
    }
    
    interface IHasStatsUpsertModel {
        id: number;
        statsDateTime: IStatsDateTimeInputModel;
        note: string;
        updatedReason: string;
    }

    interface IHasStatsCreatingAuthorizationModel {
        readonly canSetStatsDateTime: boolean;
    }
    
    interface IHasStatsExistingAuthorizationModel
            extends IUpsertableExistingAuthorizationModel {
        readonly canSetStatsDateTime: boolean;
    }
    
    interface IHasStatsUpdateHistoryModel extends IUpdateHistoryModel {
        oldStatsDateTime: DateTimeDisplayModel;
        oldNote: string | null;
        newStatsDateTime: DateTimeDisplayModel;
        newNote: string | null;
    }
}

export { };