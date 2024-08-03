import type { UserBasicResponseDto } from "./userResponseDtos";

export interface SupplyUpdateHistoryResponseDto {
    updatedDateTime: DateTimeISOString;
    updatedUser: UserBasicResponseDto;
    reason: string;
    oldPaidDateTime: DateTimeISOString;
    oldShipmentFee: number;
    oldNote: string | null;
    oldItems: SupplyItemUpdateHistoryDataDto[] | null;
    newPaidDateTime: DateTimeISOString;
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