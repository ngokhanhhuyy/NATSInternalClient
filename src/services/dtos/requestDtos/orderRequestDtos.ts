import type { OrderItemRequestDto } from "./orderItemRequestDtos";
import type { OrderPhotoRequestDto } from "./orderPhotoRequestDtos";

export interface OrderListRequestDto {
    orderByAscending: boolean;
    orderByField: string;
    rangeFrom: DateISOString | null;
    rangeTo: DateISOString | null;
    page: number;
    resultsPerPage: number;
}

export interface OrderUpsertRequestDto {
    paidDateTime: DateTimeISOString | null;
    note: string | null;
    customerId: number;
    items: OrderItemRequestDto[];
    photos: OrderPhotoRequestDto[];
}