import type { OrderItemResponseDto } from "./orderItemResponseDtos";
import type { OrderPaymentResponseDto } from "./orderPaymentResponseDtos";
import type { OrderPhotoResponseDto } from "./orderPhotoResponseDtos";
import type { CustomerBasicResponseDto } from "./customerResponseDtos";
import type { UserBasicResponseDto } from "./userResponseDtos";

export interface OrderBasicResponseDto {
    id: number;
    orderedDateTime: string;
    amount: number;
    isClosed: boolean;
    customer: CustomerBasicResponseDto;
    authorization: OrderAuthorizationResponseDto | null;
}

export interface OrderListResponseDto {
    pageCount: number;
    items: OrderBasicResponseDto[];
}

export interface OrderDetailResponseDto {
    id: number;
    orderedDateTime: string;
    itemAmount: number;
    paidAmount: number;
    note: string;
    isClosed: boolean;
    items: OrderItemResponseDto[] | null;
    payments: OrderPaymentResponseDto[] | null;
    customer: CustomerBasicResponseDto;
    user: UserBasicResponseDto;
    photos: OrderPhotoResponseDto[] | null;
    authorization: OrderAuthorizationResponseDto | null;
}

export interface OrderListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface OrderAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
    canCreatePayment: boolean;
}