import type { OrderItemRequestDto } from "./orderItemRequestDtos";
import type { DebtPaymentUpsertRequestDto } from "./debtPaymentRequestDtos";
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
    customerId: number;
    items: OrderItemRequestDto[];
    payment: DebtPaymentUpsertRequestDto | null;
    photos: OrderPhotoRequestDto[];
}