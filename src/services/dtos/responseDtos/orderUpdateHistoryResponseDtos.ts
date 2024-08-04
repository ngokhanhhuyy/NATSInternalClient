import type { UserBasicResponseDto } from "./userResponseDtos";

export interface OrderUpdateHistoryResponseDto {
    updatedDateTime: string;
    updatedUser: UserBasicResponseDto;
    reason: string;
    oldPaidDateTime: string;
    oldNote: string | null;
    oldItems: OrderItemUpdateHistoryDataDto[] | null;
    newPaidDateTime: string;
    newNote: string | null;
    newItems: OrderItemUpdateHistoryDataDto[] | null;
}

export interface OrderItemUpdateHistoryDataDto {
    id: number;
    amount: number;
    vatFactor: number;
    quantity: number;
    productName: string;
}