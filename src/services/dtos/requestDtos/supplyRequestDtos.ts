import type { SupplyItemRequestDto } from "./supplyItemRequestDtos";
import type { SupplyPhotoRequestDto } from "./supplyPhotoRequestDtos";

export interface SupplyListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    year: number | null;
    month: number | null;
    ignoreMonthYear: boolean;
    createdUserId: number | null;
    productId: number | null;
    page: number;
    resultsPerPage: number;
}

export interface SupplyUpsertRequestDto {
    statsDateTime: string | null;
    shipmentFee: number;
    note: string | null;
    items: SupplyItemRequestDto[] | null;
    photos: SupplyPhotoRequestDto[] | null;
    updatedReason: string | null;
}