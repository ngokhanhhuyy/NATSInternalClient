import type { SupplyItemResponseDto } from "./supplyItemResponseDtos";
import type { SupplyPhotoResponseDto } from "./supplyPhotoResponseDtos";
import type { UserBasicResponseDto } from "./userResponseDtos";

export interface SupplyBasicResponseDto {
    id: number;
    suppliedDateTime: string;
    totalAmount: number;
    isClosed: boolean;
    user: UserBasicResponseDto;
    firstPhotoUrl: string | null;
}

export interface SupplyListResponseDto {
    items: SupplyBasicResponseDto[] | null;
    pageCount: number;
}

export interface SupplyDetailResponseDto {
    id: number;
    suppliedDateTime: string;
    shipmentFee: number;
    itemAmount: number;
    totalAmount: number;
    note: string | null;
    createdDateTime: string;
    updatedDateTime: string | null;
    isClosed: boolean;
    items: SupplyItemResponseDto[] | null;
    photos: SupplyPhotoResponseDto[] | null;
    user: UserBasicResponseDto;
    authorization: SupplyDetailAuthorizationResponseDto;
}

export interface SupplyDetailAuthorizationResponseDto {
    canEdit: boolean;
    canDelete: boolean;
}

