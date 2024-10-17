import type { IUpsertModel } from "./baseModels";
import type { IUpsertableBasicModel, IUpsertableListAuthorizationModel,
    IUpsertableListModel } from "./upsertableModels";
import type { ProductBasicModel } from "../productModels";
import type { IFinancialEngageableAuthorizationModel, IFinancialEngageableDetailModel } from "./financialEngageableModels";

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
    readonly product: ProductBasicModel | null;
}

export interface IProductEngageableDetailModel<
            TItemModel extends IProductEngageableDetailItemModel,
            TAuthorizationModel extends IFinancialEngageableAuthorizationModel>
        extends IFinancialEngageableDetailModel<TAuthorizationModel> {
    readonly items: TItemModel[];
}

export interface IProductEngageableDetailItemModel {
    readonly id: number | null;
    readonly productAmountPerUnit: number;
    readonly quantity: number;
    readonly product: ProductBasicModel | null;
    readonly productAmount: number;
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