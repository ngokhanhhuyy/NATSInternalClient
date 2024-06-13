import type { SupplyItemResponseDto } from "./supplyItemResponseDtos";
import type { SupplyPhotoResponseDto } from "./supplyPhotoResponseDtos";
import type { UserBasicResponseDto } from "./userResponseDtos";

export interface SupplyBasicResponseDto {
    id: number;
    suppliedDateTime: string;
    totalAmount: number;
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
    paidAmount: number;
    note: string | null;
    items: SupplyItemResponseDto[] | null;
    photos: SupplyPhotoResponseDto[] | null;
    user: UserBasicResponseDto;
}