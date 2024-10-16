import type { UserBasicResponseDto } from "./userResponseDtos";

export interface SupplyUpdateHistoryResponseDto {
    updatedDateTime: string;
    updatedUser: UserBasicResponseDto;
    updatedReason: string;
    oldStatsDateTime: string;
    oldShipmentFee: number;
    oldNote: string | null;
    oldItems: SupplyItemUpdateHistoryDataDto[] | null;
    newStatsDateTime: string;
    newShipmentFee: number;
    newNote: string | null;
    newItems: SupplyItemUpdateHistoryDataDto[] | null;
}

export interface SupplyItemUpdateHistoryDataDto {
    id: number;
    productAmountPerUnit: number;
    quantity: number;
    productName: string;
}