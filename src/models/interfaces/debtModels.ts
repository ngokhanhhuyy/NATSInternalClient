import type {
    IFinancialEngageableUpdateHistoryModel,
    IFinancialEngageableUpsertModel} from "./financialEngageableModels";
import type {
    ICustomerEngageableBasicModel,
    ICustomerEngageableDetailModel,
    ICustomerEngageableListModel, 
    ICustomerEngageableUpsertModel} from "./customerEngageableModels";
import type { IDebtUpsertRequestDto } from "@/services/dtos/requestDtos/interfaces/debtRequestDtos";

export interface IDebtBasicModel extends ICustomerEngageableBasicModel { }

export interface IDebtListModel extends ICustomerEngageableListModel {
    items: IDebtBasicModel[];
}

export interface IDebtDetailModel extends ICustomerEngageableDetailModel {
    amount: IAmountDisplayModel;
}

export interface IDebtUpsertModel
        extends
            IFinancialEngageableUpsertModel,
            ICustomerEngageableUpsertModel {
    amount: number;
    toRequestDto(): IDebtUpsertRequestDto;
}

export interface IDebtUpdateHistoryModel extends IFinancialEngageableUpdateHistoryModel {
    oldAmount: IAmountDisplayModel;
    newAmount: IAmountDisplayModel;
}