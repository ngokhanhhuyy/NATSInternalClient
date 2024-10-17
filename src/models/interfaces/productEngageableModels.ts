import type { IUpsertModel } from "./baseModels";
import type { IUpsertableBasicModel, IUpsertableListAuthorizationModel,
    IUpsertableListModel } from "./upsertableModels";
import type { ProductBasicModel } from "@/models";
import type {
    IFinancialEngageableAuthorizationModel,
    IFinancialEngageableDetailModel,
    IFinancialEngageableUpdateHistoryModel } from "./financialEngageableModels";

export interface IProductEngageableListModel<
            TBasicModel extends IUpsertableBasicModel<TAuthorizationModel>,
            TListAuthorizationModel extends IUpsertableListAuthorizationModel,
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel,
            TRequestDto,
            TResponseDto>
        extends IUpsertableListModel<
            TBasicModel,
            TListAuthorizationModel,
            TAuthorizationModel,
            TRequestDto,
            TResponseDto> {
    readonly productId: number | null;
}

export interface IProductEngageableDetailModel<
            TItemModel extends IProductEngageableDetailItemModel,
            TUpdateHistoryModel extends IProductEngageableUpdateHistoryModel<
                TUpdateHistoryItemModel>,
            TUpdateHistoryItemModel extends IProductEngageableItemUpdateHistoryModel,
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel>
        extends IFinancialEngageableDetailModel<
            TUpdateHistoryModel,
            TAuthorizationModel> {
    readonly items: TItemModel[];
}

export interface IProductEngageableDetailItemModel {
    readonly id: number | null;
    readonly productAmountPerUnit: number;
    readonly quantity: number;
    readonly product: ProductBasicModel | null;
    readonly productAmount: number;
}

export interface IProductEngageableUpsertModel<
            TUpsertItemModel extends IProductEngageableUpsertItemModel<TItemRequestDto>,
            TRequestDto,
            TItemRequestDto>
        extends IUpsertModel<TRequestDto> {
    items: TUpsertItemModel[];
}

export interface IProductEngageableUpsertItemModel<TRequestDto>
        extends IUpsertModel<TRequestDto> {
    id: number | null;
    productAmountPerUnit: number;
    quantity: number;
    product: ProductBasicModel | null,
    hasBeenChanged: boolean;
    hasBeenDeleted: boolean;
}

export interface IProductEngageableUpdateHistoryModel<
            TItemUpdateHistoryModel extends IProductEngageableItemUpdateHistoryModel>
        extends IFinancialEngageableUpdateHistoryModel {
    oldItems: TItemUpdateHistoryModel[];
    newItems: TItemUpdateHistoryModel[];
}

export interface IProductEngageableItemUpdateHistoryModel {
    id: number;
    productAmountPerUnit: number
    quantity: number;
    productName: string;
}