import type { IUpsertModel } from "./baseModels";
import type { ProductBasicModel } from "@/models";
import type {
    IFinancialEngageableDetailModel,
    IFinancialEngageableListModel,
    IFinancialEngageableUpdateHistoryModel } from "./financialEngageableModels";
import type { IProductEngageableListRequestDto } from "@/services/dtos/requestDtos/interfaces";

export interface IProductEngageableListModel extends IFinancialEngageableListModel {
    readonly productId: number | null;
    toRequestDto(): IProductEngageableListRequestDto
}

export interface IProductEngageableDetailModel
        extends IFinancialEngageableDetailModel {
    readonly items: IProductEngageableDetailItemModel[];
    readonly updateHistories: IProductEngageableUpdateHistoryModel[];
}

export interface IProductEngageableDetailItemModel {
    readonly id: number | null;
    readonly productAmountPerUnit: number;
    readonly quantity: number;
    readonly product: ProductBasicModel | null;
    readonly productAmount: number;
}

export interface IProductEngageableUpsertModel extends IUpsertModel {
    items: IProductEngageableUpsertItemModel[];
}

export interface IProductEngageableUpsertItemModel extends IUpsertModel {
    id: number | null;
    productAmountPerUnit: number;
    quantity: number;
    product: ProductBasicModel,
    hasBeenChanged: boolean;
    hasBeenDeleted: boolean;
}

export interface IProductEngageableUpdateHistoryModel
        extends IFinancialEngageableUpdateHistoryModel {
    oldItems: IProductEngageableItemUpdateHistoryModel[];
    newItems: IProductEngageableItemUpdateHistoryModel[];
}

export interface IProductEngageableItemUpdateHistoryModel {
    id: number;
    productAmountPerUnit: number
    quantity: number;
    productName: string;
}