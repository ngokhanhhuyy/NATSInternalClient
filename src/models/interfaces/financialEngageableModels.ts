import { MonthYearModel } from "../monthYearModels";
import { UserBasicModel } from "../userModels";
import type { DateTimeDisplayModel } from "../dateTimeModels";

declare global {
    interface IFinancialEngageableListModel extends IUpsertableListModel {
        items: IFinancialEngageableBasicModel[];
        monthYear: MonthYearModel | null;
        ignoreMonthYear: boolean;
        monthYearOptions: MonthYearModel[];
        toRequestDto(): IFinancialEngageableListRequestDto;
    }
    
    interface IFinancialEngageableBasicModel extends IUpsertableBasicModel {
        readonly statsDateTime: DateTimeDisplayModel;
        readonly isLocked: boolean;
        readonly authorization: IFinancialEngageableAuthorizationModel | null;
    }
    
    interface IFinancialEngageableDetailModel extends IFinancialEngageableBasicModel {
        readonly createdDateTime: DateTimeDisplayModel;
        readonly note: string | null;
        readonly isLocked: boolean;
        readonly createdUser: UserBasicModel;
        readonly updateHistories: IFinancialEngageableUpdateHistoryModel[] | null;
        readonly authorization: IFinancialEngageableAuthorizationModel | null;
    }
    
    interface IFinancialEngageableUpsertModel extends IUpsertModel {
        id: number;
        statsDateTime: IDateTimeInputModel;
        note: string;
        updatedReason: string;
        toRequestDto(): IFinancialEngageableUpsertRequestDto;
    }
    
    interface IFinancialEngageableAuthorizationModel extends IUpsertableAuthorizationModel {
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