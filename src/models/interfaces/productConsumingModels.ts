import type { ProductBasicModel } from "../productModels";

export interface IProductConsumingListModel {
    productId: number | null;
}

export interface IProductConsumingDetailModel< TItemModel extends IProductConsumingItemModel> {
    items: TItemModel[];
}

export interface IProductConsumingItemModel {
    id: number | null;
    amount: number;
    quantity: number;
    product: ProductBasicModel | null;
    hasBeenChanged: boolean;
    hasBeenDeleted: boolean;
}