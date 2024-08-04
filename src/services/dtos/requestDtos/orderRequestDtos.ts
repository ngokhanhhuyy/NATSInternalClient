import type { OrderItemRequestDto } from "./orderItemRequestDtos";
import type { OrderPhotoRequestDto } from "./orderPhotoRequestDtos";

export interface OrderListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    rangeFrom: string | null;
    rangeTo: string | null;
    page: number;
    resultsPerPage: number;
}

export interface OrderUpsertRequestDto {
    paidDateTime: string | null;
    note: string | null;
    customerId: number;
    items: OrderItemRequestDto[];
    photos: OrderPhotoRequestDto[];
    updateReason: string | null;
}