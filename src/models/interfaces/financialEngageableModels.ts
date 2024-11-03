import { ListMonthYearModel, ListMonthYearOptionsModel } from "../listMonthYearModels";
import { UserBasicModel } from "../userModels";
import type { DateTimeDisplayModel } from "../dateTimeModels";

declare global {
    interface IFinancialEngageableListModel<
                TBasic extends IFinancialEngageableBasicModel<TAuthorization>,
                TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
            extends IUpsertableListModel<TBasic, TAuthorization> {
        monthYear?: ListMonthYearModel;
        monthYearOptions?: ListMonthYearOptionsModel;
    }
    
    interface IFinancialEngageableBasicModel<
                TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
            extends IUpsertableBasicModel<TAuthorization> {
        readonly statsDateTime: DateTimeDisplayModel;
        readonly isLocked: boolean;
    }
    
    interface IFinancialEngageableDetailModel<
                TUpdateHistory extends IFinancialEngageableUpdateHistoryModel,
                TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
            extends IUpsertableDetailModel<TAuthorization> {
        readonly createdDateTime: DateTimeDisplayModel;
        readonly statsDateTime: DateTimeDisplayModel;
        readonly note: string | null;
        readonly isLocked: boolean;
        readonly createdUser: UserBasicModel;
        readonly updateHistories: TUpdateHistory[] | null;
    }
    
    interface IFinancialEngageableUpsertModel {
        id: number;
        statsDateTime: IStatsDateTimeInputModel;
        note: string;
        updatedReason: string;
    }

    interface IFinancialEngageableCreatingAuthorizationModel {
        readonly canSetStatsDateTime: boolean;
    }
    
    interface IFinancialEngageableExistingAuthorizationModel
            extends IUpsertableExistingAuthorizationModel {
        readonly canSetStatsDateTime: boolean;
    }
    
    interface IFinancialEngageableUpdateHistoryModel extends IUpdateHistoryModel {
        oldStatsDateTime: DateTimeDisplayModel;
        oldNote: string | null;
        newStatsDateTime: DateTimeDisplayModel;
        newNote: string | null;
    }
}

export { };