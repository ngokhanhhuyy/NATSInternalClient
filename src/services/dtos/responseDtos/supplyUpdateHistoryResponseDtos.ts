import type { UserBasicResponseDto } from "./userResponseDtos";

export interface SupplyUpdateHistoryResponseDto {
    updatedDateTime: string;
    updatedUser: UserBasicResponseDto;
    reason: string;
    oldPaidDateTime: string;
    oldShipmentFee: number;
    oldNote: string | null;
    oldItems: SupplyItemUpdateHistoryDataDto[] | null;
    newPaidDateTime: string;
    newShipmentFee: number;
    newNote: string | null;
    newItems: SupplyItemUpdateHistoryDataDto[] | null;
}

export interface SupplyItemUpdateHistoryDataDto {
    id: number;
    amount: number;
    suppliedQuantity: number;
    productName: string;
}