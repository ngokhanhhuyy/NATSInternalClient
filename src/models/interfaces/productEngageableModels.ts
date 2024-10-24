import type { ProductBasicModel } from "../productModels";
declare global {
    interface IProductEngageableListModel extends IFinancialEngageableListModel {
        readonly productId: number | null;
        toRequestDto(): IProductEngageableListRequestDto
    }
    
    interface IProductEngageableDetailModel
            extends IFinancialEngageableDetailModel {
        readonly items: IProductEngageableDetailItemModel[];
        readonly updateHistories: IProductEngageableUpdateHistoryModel[];
    }
    
    interface IProductEngageableDetailItemModel {
        readonly id: number | null;
        readonly productAmountPerUnit: number;
        readonly quantity: number;
        readonly product: ProductBasicModel | null;
        readonly productAmount: number;
    }
    
    interface IProductEngageableUpsertModel extends IUpsertModel {
        items: IProductEngageableUpsertItemModel[];
    }
    
    interface IProductEngageableUpsertItemModel extends IUpsertModel {
        id: number | null;
        productAmountPerUnit: number;
        quantity: number;
        product: ProductBasicModel,
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
    
    interface IProductEngageableUpdateHistoryModel
            extends IFinancialEngageableUpdateHistoryModel {
        oldItems: IProductEngageableItemUpdateHistoryModel[];
        newItems: IProductEngageableItemUpdateHistoryModel[];
    }
    
    interface IProductEngageableItemUpdateHistoryModel {
        id: number;
        productAmountPerUnit: number
        quantity: number;
        productName: string;
    }
}

export { };