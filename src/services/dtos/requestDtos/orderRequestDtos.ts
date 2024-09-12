import type { OrderItemRequestDto } from "./orderItemRequestDtos";
import type { OrderPhotoRequestDto } from "./orderPhotoRequestDtos";

export interface OrderListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    month: number | null;
    year: number | null;
    userId: number | null;
    customerId: number | null;
    productId: number | null;
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