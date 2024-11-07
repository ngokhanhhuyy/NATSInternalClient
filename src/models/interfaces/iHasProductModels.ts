import type { ProductBasicModel } from "../productModels";

declare global {
    interface IHasProductListModel<
                TBasic extends IHasStatsBasicModel<TAuthorization>,
                TAuthorization extends IHasStatsExistingAuthorizationModel>
            extends IHasStatsListModel<TBasic, TAuthorization> {
        readonly productId?: number;
    }
    
    interface IHasProductDetailModel<
                TItem extends IHasProductDetailItemModel,
                TUpdateHistory extends IHasProductUpdateHistoryModel<TItemUpdateHistory>,
                TItemUpdateHistory extends IHasProductItemUpdateHistoryModel,
                TAuthorization extends IHasStatsExistingAuthorizationModel>
            extends IHasStatsDetailModel<TUpdateHistory, TAuthorization> {
        items: TItem[];
    }
    
    interface IHasProductDetailItemModel {
        readonly id: number | null;
        readonly productAmountPerUnit: number;
        readonly quantity: number;
        readonly product: ProductBasicModel | null;
        readonly productAmount: number;
    }
    
    interface IHasProductUpsertModel<
                TUpsertItem extends IHasProductUpsertItemModel,
                TPhoto extends IUpsertPhotoModel>
            extends
                IHasStatsUpsertModel,
                IHasMultiplePhotoUpsertModel<TPhoto> {
        items: TUpsertItem[];
    }
    
    interface IHasProductUpsertItemModel {
        id: number | null;
        productAmountPerUnit: number;
        quantity: number;
        product: ProductBasicModel,
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
    
    interface IHasProductUpdateHistoryModel<
                TItemUpdateHistory extends IHasProductItemUpdateHistoryModel>
            extends IHasStatsUpdateHistoryModel {
        oldItems: TItemUpdateHistory[];
        newItems: TItemUpdateHistory[];
    }
    
    interface IHasProductItemUpdateHistoryModel {
        id: number;
        productAmountPerUnit: number
        quantity: number;
        productName: string;
    }
}

export { };