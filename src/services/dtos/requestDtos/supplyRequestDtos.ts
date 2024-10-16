import type { SupplyItemRequestDto } from "./supplyItemRequestDtos";
import type { SupplyPhotoRequestDto } from "./supplyPhotoRequestDtos";

export interface SupplyListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    year: number;
    month: number;
    ignoreMonthYear: boolean;
    createdUserId: number | null;
    productId: number | null;
    page: number;
    resultsPerPage: number;
}

export interface SupplyUpsertRequestDto {
    paidDateTime: string | null;
    shipmentFee: number;
    note: string | null;
    items: SupplyItemRequestDto[] | null;
    photos: SupplyPhotoRequestDto[] | null;
    updateReason: string | null;
}