declare global {
    interface IDebtBasicModel extends ICustomerEngageableBasicModel { }
    
    interface IDebtListModel extends ICustomerEngageableListModel {
        items: IDebtBasicModel[];
    }
    
    interface IDebtDetailModel extends ICustomerEngageableDetailModel {
        amount: number;
    }
    
    interface IDebtUpsertModel
            extends
                IFinancialEngageableUpsertModel,
                ICustomerEngageableUpsertModel {
        amount: number;
        toRequestDto(): IDebtUpsertRequestDto;
    }
    
    interface IDebtUpdateHistoryModel extends IFinancialEngageableUpdateHistoryModel {
        oldAmount: number;
        newAmount: number;
    }
}

export { };