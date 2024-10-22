import type { IProductExportableListRequestDto, IProductExportableUpsertRequestDto } from "@/services/dtos/requestDtos/interfaces";
import type {
    ICustomerEngageableListModel,
    ICustomerEngageableDetailModel,
    ICustomerEngageableUpsertModel } from "./customerEngageableModels";
import type {
    IProductEngageableListModel,
    IProductEngageableDetailModel,
    IProductEngageableDetailItemModel,
    IProductEngageableUpsertItemModel,
    IProductEngageableUpdateHistoryModel,
    IProductEngageableItemUpdateHistoryModel,
    IProductEngageableUpsertModel } from "./productEngageableModels";
import type { IHasMultiplePhotoUpsertModel, IUpsertPhotoModel } from "@/models/interfaces/";

export interface IProductExportableListModel
        extends IProductEngageableListModel, ICustomerEngageableListModel {
    toRequestDto(): IProductExportableListRequestDto;
}

export interface IProductExportableDetailModel
        extends IProductEngageableDetailModel, ICustomerEngageableDetailModel {
    readonly items: IProductExportableDetailItemModel[];
    readonly productAmountBeforeVat: number;
    readonly productVatAmount: number;
    readonly amountBeforeVat: number;
    readonly vatAmount: number;
    readonly amountAfterVat: number;
    readonly updateHistories: IProductExportableUpdateHistoryModel[];
}

export interface IProductExportableUpsertModel
        extends
            IProductEngageableUpsertModel,
            ICustomerEngageableUpsertModel,
            IHasMultiplePhotoUpsertModel {
    items: IProductExportableUpsertItemModel[];
    photos: IUpsertPhotoModel[];
    toRequestDto(): IProductExportableUpsertRequestDto;
}

export interface IProductExportableDetailItemModel extends IProductEngageableDetailItemModel {
    vatAmountPerUnit: number;
}

export interface IProductExportableUpsertItemModel extends IProductEngageableUpsertItemModel {
    vatPercentagePerUnit: number;
    readonly vatAmountPerUnit: number;
}

export interface IProductExportableUpdateHistoryModel
        extends IProductEngageableUpdateHistoryModel {
    oldItems: IProductExportableItemUpdateHistoryModel[];
    newItems: IProductExportableItemUpdateHistoryModel[]
}

export interface IProductExportableItemUpdateHistoryModel
        extends IProductEngageableItemUpdateHistoryModel {
    vatAmountPerUnit: number;
}