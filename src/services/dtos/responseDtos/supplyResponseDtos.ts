import type { SupplyItemResponseDto } from "./supplyItemResponseDtos";
import type { SupplyPhotoResponseDto } from "./supplyPhotoResponseDtos";
import type { SupplyUpdateHistoryResponseDto } from "./supplyUpdateHistoryResponseDtos";
import type { UserBasicResponseDto } from "./userResponseDtos";
import type { MonthYearResponseDto } from "./monthYearResponseDtos";

export interface SupplyBasicResponseDto {
    id: number;
    paidDateTime: string;
    totalAmount: number;
    isLocked: boolean;
    user: UserBasicResponseDto;
    firstPhotoUrl: string | null;
}

export interface SupplyListResponseDto {
    items: SupplyBasicResponseDto[] | null;
    pageCount: number;
    monthYearOptions: MonthYearResponseDto[];
    authorization: SupplyListAuthorizationResponseDto;
}

export interface SupplyDetailResponseDto {
    id: number;
    paidDateTime: string;
    shipmentFee: number;
    itemAmount: number;
    totalAmount: number;
    note: string | null;
    createdDateTime: string;
    updatedDateTime: string | null;
    isLocked: boolean;
    items: SupplyItemResponseDto[] | null;
    photos: SupplyPhotoResponseDto[] | null;
    user: UserBasicResponseDto;
    authorization: SupplyAuthorizationResponseDto;
    updateHistories: SupplyUpdateHistoryResponseDto[] | null;
}

export interface SupplyListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface SupplyAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
}

