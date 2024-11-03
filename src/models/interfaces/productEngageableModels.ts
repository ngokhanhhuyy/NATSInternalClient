import type { ProductBasicModel } from "../productModels";

declare global {
    interface IProductEngageableListModel<
                TBasic extends IFinancialEngageableBasicModel<TAuthorization>,
                TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
            extends IFinancialEngageableListModel<TBasic, TAuthorization> {
        readonly productId?: number;
    }
    
    interface IProductEngageableDetailModel<
                TItem extends IProductEngageableDetailItemModel,
                TUpdateHistory
                    extends IProductEngageableUpdateHistoryModel<TItemUpdateHistory>,
                TItemUpdateHistory extends IProductEngageableItemUpdateHistoryModel,
                TAuthorization extends IFinancialEngageableExistingAuthorizationModel>
            extends IFinancialEngageableDetailModel<TUpdateHistory, TAuthorization> {
        items: TItem[];
    }
    
    interface IProductEngageableDetailItemModel {
        readonly id: number | null;
        readonly productAmountPerUnit: number;
        readonly quantity: number;
        readonly product: ProductBasicModel | null;
        readonly productAmount: number;
    }
    
    interface IProductEngageableUpsertModel<
                TUpsertItem extends IProductEngageableUpsertItemModel,
                TPhoto extends IUpsertPhotoModel>
            extends
                IFinancialEngageableUpsertModel,
                IHasMultiplePhotoUpsertModel<TPhoto> {
        items: TUpsertItem[];
    }
    
    interface IProductEngageableUpsertItemModel {
        id: number | null;
        productAmountPerUnit: number;
        quantity: number;
        product: ProductBasicModel,
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
    
    interface IProductEngageableUpdateHistoryModel<
                TItemUpdateHistory extends IProductEngageableItemUpdateHistoryModel>
            extends IFinancialEngageableUpdateHistoryModel {
        oldItems: TItemUpdateHistory[];
        newItems: TItemUpdateHistory[];
    }
    
    interface IProductEngageableItemUpdateHistoryModel {
        id: number;
        productAmountPerUnit: number
        quantity: number;
        productName: string;
    }
}

export { };