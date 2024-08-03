import type { UserBasicResponseDto } from "./userResponseDtos";

export interface TreatmentUpdateHistoryResponseDto {
    updatedDateTime: DateTimeISOString;
    updatedUser: UserBasicResponseDto;
    reason: string;
    oldPaidDateTime: DateTimeISOString;
    oldServiceAmount: number;
    oldServiceVatFactor: number;
    oldNote: string | null;
    oldTherapist: UserBasicResponseDto;
    oldItems: TreatmentItemUpdateHistoryDataDto[] | null;
    newPaidDateTime: DateTimeISOString;
    newServiceAmount: number;
    newServiceVatFactor: number;
    newNote: string | null;
    newTherapist: UserBasicResponseDto;
    newItems: TreatmentItemUpdateHistoryDataDto[] | null;
}

export interface TreatmentItemUpdateHistoryDataDto {
    id: number;
    amount: number;
    vatFactor: number;
    quantity: number;
    productName: string;
}