import type { UserBasicResponseDto } from "./userResponseDtos";

export interface OrderUpdateHistoryResponseDto {
    updatedDateTime: DateTimeISOString;
    updatedUser: UserBasicResponseDto;
    reason: string;
    oldPaidDateTime: DateTimeISOString;
    oldNote: string | null;
    oldItems: OrderItemUpdateHistoryDataDto[] | null;
    newPaidDateTime: DateTimeISOString;
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