import type { IFinancialEngageableListRequestDto, IFinancialEngageableUpsertRequestDto } from "./financialEngageableRequestDtos";
import type { IPhotoUpsertRequestDto } from "./photoRequestDtos";

export interface IProductEngageableListRequestDto extends IFinancialEngageableListRequestDto {
    productId: number | null;
}

export interface IProductEngageableUpsertRequestDto
        extends IFinancialEngageableUpsertRequestDto {
    items: IProductEngageableUpsertItemRequestDto[];
    photos: IPhotoUpsertRequestDto[] | null;
}

export interface IProductEngageableUpsertItemRequestDto {
    id: number | null;
    productAmountPerUnit: number;
    quantity: number;
    productId: number;
    hasBeenChanged: boolean;
    hasBeenDeleted: boolean;
}