import type { SupplyItemRequestDto } from "./supplyItemRequestDtos";
import type { SupplyPhotoRequestDto } from "./supplyPhotoRequestDtos";

export interface SupplyListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    rangeFrom: string | null;
    rangeTo: string | null;
    userId: number | null;
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