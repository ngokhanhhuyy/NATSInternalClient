import type { OrderItemResponseDto } from "./orderItemResponseDtos";
import type { OrderPhotoResponseDto } from "./orderPhotoResponseDtos";
import type { CustomerBasicResponseDto } from "./customerResponseDtos";
import type { UserBasicResponseDto } from "./userResponseDtos";
import type { OrderUpdateHistoryResponseDto } from "./orderUpdateHistoryResponseDtos";
import type { MonthYearResponseDto } from "./monthYearResponseDtos";

export interface OrderBasicResponseDto {
    id: number;
    paidDateTime: string;
    amount: number;
    isLocked: boolean;
    customer: CustomerBasicResponseDto;
    authorization: OrderAuthorizationResponseDto | null;
}

export interface OrderListResponseDto {
    pageCount: number;
    items: OrderBasicResponseDto[] | null;
    monthYearOptions: MonthYearResponseDto[];
    authorization: OrderListAuthorizationResponseDto | null;
}

export interface OrderDetailResponseDto {
    id: number;
    paidDateTime: string;
    createdDateTime: string;
    beforeVatAmount: number;
    vatAmount: number;
    afterVatAmount: number;
    note: string;
    isLocked: boolean;
    items: OrderItemResponseDto[] | null;
    customer: CustomerBasicResponseDto;
    user: UserBasicResponseDto;
    photos: OrderPhotoResponseDto[] | null;
    authorization: OrderAuthorizationResponseDto | null;
    updateHistories: OrderUpdateHistoryResponseDto[] | null;
}

export interface OrderListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface OrderAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
    canSetPaidDateTime: boolean;
}