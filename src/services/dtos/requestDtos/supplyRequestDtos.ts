import type { SupplyItemRequestDto } from "./supplyItemRequestDtos";
import type { SupplyPhotoRequestDto } from "./supplyPhotoRequestDtos";

export interface SupplyListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    month: number | null;
    year: number | null;
    ignoreMonthYear: boolean;
    userId: number | null;
    customerId: number | null;
    productId: number | null;
    page: number;
    resultsPerPage: number;
}

export interface SupplyUpsertRequestDto {
    paidDateTime: string | null;
    shipmentFee: number;
    note: string | null;
    updateReason: string | null;
    items: SupplyItemRequestDto[] | null;
    photos: SupplyPhotoRequestDto[] | null;
}