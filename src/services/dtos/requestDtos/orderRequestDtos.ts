import type { OrderItemRequestDto } from "./orderItemRequestDtos";
import type { OrderPaymentRequestDto } from "./orderPaymentRequestDtos";
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
    orderedDateTime: string | null;
    note: string | null;
    isClosed: boolean;
    customerId: number;
    items: OrderItemRequestDto[];
    payments: OrderPaymentRequestDto[];
    photos: OrderPhotoRequestDto[];
}