import type { ProductBasicResponseDto } from "../productResponseDtos";
import type { IFinancialEngageableDetailResponseDto, IFinancialEngageableUpdateHistoryResponseDto } from "./financialEngageableResponseDtos";
import type { IHasMultiplePhotosDetailResponseDto } from "./hasPhotoResponseDtos";

export interface IProductEngageableDetailResponseDto
        extends IFinancialEngageableDetailResponseDto, IHasMultiplePhotosDetailResponseDto {
    items: IProductEngageableItemResponseDto[] | null;
    updateHistories: IProductEngageableUpdateHistoryResponseDto[] | null;
}

export interface IProductEngageableItemResponseDto {
    id: number;
    productAmountPerUnit: number;
    quantity: number;
    product: ProductBasicResponseDto;
}

export interface IProductEngageableUpdateHistoryResponseDto
        extends IFinancialEngageableUpdateHistoryResponseDto {
    oldItems: IProductEngageableItemUpdateHistoryDataDto[] | null;
    newItems: IProductEngageableItemUpdateHistoryDataDto[] | null;
}

export interface IProductEngageableItemUpdateHistoryDataDto {
    id: number;
    productAmountPerUnit: number;
    quantity: number;
    productName: string;
}