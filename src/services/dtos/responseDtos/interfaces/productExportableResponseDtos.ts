import type { ICustomerEngageableBasicResponseDto } from "./customerEngageableResponseDtos";
import type { IProductEngageableDetailResponseDto, IProductEngageableItemUpdateHistoryDataDto, IProductEngageableUpdateHistoryResponseDto } from "./productEngageableResponseDtos";

export interface IProductExportableBasicResponseDto
        extends ICustomerEngageableBasicResponseDto {}

export interface IProductExportableDetailResponseDto
        extends IProductEngageableDetailResponseDto, ICustomerEngageableBasicResponseDto {
    updateHistories: IProductExportableUpdateHistoryResponseDto[] | null;
}

export interface IProductExportableUpdateHistoryResponseDto
        extends IProductEngageableUpdateHistoryResponseDto {
    oldItems: IProductExportableItemUpdateHistoryDataDto[] | null;
    newItems: IProductExportableItemUpdateHistoryDataDto[] | null;
}

export interface IProductExportableItemUpdateHistoryDataDto
        extends IProductEngageableItemUpdateHistoryDataDto {
    vatAmountPerUnit: number;
}