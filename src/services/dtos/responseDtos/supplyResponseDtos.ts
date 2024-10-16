import type { SupplyItemResponseDto } from "./supplyItemResponseDtos";
import type { SupplyPhotoResponseDto } from "./supplyPhotoResponseDtos";
import type { SupplyUpdateHistoryResponseDto } from "./supplyUpdateHistoryResponseDtos";
import type { UserBasicResponseDto } from "./userResponseDtos";
import type { MonthYearResponseDto } from "./monthYearResponseDtos";

export interface SupplyBasicResponseDto {
    id: number;
    statsDateTime: string;
    amount: number;
    isLocked: boolean;
    createdUser: UserBasicResponseDto;
    thumbnailUrl: string | null;
    authorization: SupplyAuthorizationResponseDto | null;
}

export interface SupplyListResponseDto {
    pageCount: number;
    items: SupplyBasicResponseDto[] | null;
    monthYearOptions: MonthYearResponseDto[] | null;
    authorization: SupplyListAuthorizationResponseDto;
}

export interface SupplyDetailResponseDto {
    id: number;
    statsDateTime: string;
    shipmentFee: number;
    itemAmount: number;
    amount: number;
    note: string | null;
    createdDateTime: string;
    createdUser: UserBasicResponseDto;
    isLocked: boolean;
    items: SupplyItemResponseDto[] | null;
    photos: SupplyPhotoResponseDto[] | null;
    authorization: SupplyAuthorizationResponseDto;
    updateHistories: SupplyUpdateHistoryResponseDto[] | null;
}

export interface SupplyListAuthorizationResponseDto {
    canCreate: boolean;
}

export interface SupplyAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
    canSetStatsDateTime: boolean;
}

