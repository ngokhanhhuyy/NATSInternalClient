declare global {
    interface IProductExportableBasicModel extends ICustomerEngageableBasicModel {
        amountAfterVat: number;
    }

    interface IProductExportableListModel
            extends IProductEngageableListModel, ICustomerEngageableListModel {
        items: IProductExportableBasicModel[];
        toRequestDto(): IProductExportableListRequestDto;
    }
    
    interface IProductExportableDetailModel
            extends IProductEngageableDetailModel, ICustomerEngageableDetailModel {
        readonly items: IProductExportableDetailItemModel[];
        readonly productAmountBeforeVat: number;
        readonly productVatAmount: number;
        readonly amountBeforeVat: number;
        readonly vatAmount: number;
        readonly amountAfterVat: number;
        readonly updateHistories: IProductExportableUpdateHistoryModel[];
    }
    
    interface IProductExportableUpsertModel
            extends
                IProductEngageableUpsertModel,
                ICustomerEngageableUpsertModel,
                IHasMultiplePhotoUpsertModel {
        items: IProductExportableUpsertItemModel[];
        photos: IUpsertPhotoModel[];
        toRequestDto(): IProductExportableUpsertRequestDto;
    }
    
    interface IProductExportableDetailItemModel extends IProductEngageableDetailItemModel {
        vatAmountPerUnit: number;
    }
    
    interface IProductExportableUpsertItemModel extends IProductEngageableUpsertItemModel {
        vatPercentagePerUnit: number;
        readonly vatAmountPerUnit: number;
    }
    
    interface IProductExportableUpdateHistoryModel
            extends IProductEngageableUpdateHistoryModel {
        oldItems: IProductExportableItemUpdateHistoryModel[];
        newItems: IProductExportableItemUpdateHistoryModel[]
    }
    
    interface IProductExportableItemUpdateHistoryModel
            extends IProductEngageableItemUpdateHistoryModel {
        vatAmountPerUnit: number;
    }
}

export { };