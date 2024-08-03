import type { SupplyItemResponseDto } from "./supplyItemResponseDtos";
import type { SupplyPhotoResponseDto } from "./supplyPhotoResponseDtos";
import type { SupplyUpdateHistoryResponseDto } from "./supplyUpdateHistoryResponseDtos";
import type { UserBasicResponseDto } from "./userResponseDtos";

export interface SupplyBasicResponseDto {
    id: number;
    paidDateTime: DateTimeISOString;
    totalAmount: number;
    isLocked: boolean;
    user: UserBasicResponseDto;
    firstPhotoUrl: string | null;
}

export interface SupplyListResponseDto {
    items: SupplyBasicResponseDto[] | null;
    pageCount: number;
}

export interface SupplyDetailResponseDto {
    id: number;
    paidDateTime: DateTimeISOString;
    shipmentFee: number;
    itemAmount: number;
    totalAmount: number;
    note: string | null;
    createdDateTime: DateTimeISOString;
    updatedDateTime: DateTimeISOString | null;
    isLocked: boolean;
    items: SupplyItemResponseDto[] | null;
    photos: SupplyPhotoResponseDto[] | null;
    user: UserBasicResponseDto;
    authorization: SupplyDetailAuthorizationResponseDto;
    updateHistories: SupplyUpdateHistoryResponseDto[] | null;
}

export interface SupplyDetailAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
}

