import type { UserBasicResponseDto } from "./userResponseDtos";

export interface TreatmentUpdateHistoryResponseDto {
    updatedDateTime: string;
    updatedUser: UserBasicResponseDto;
    oldPaidDateTime: string;
    oldServiceAmount: number;
    oldServiceVatFactor: number;
    oldNote: string | null;
    oldTherapist: UserBasicResponseDto;
    oldItems: TreatmentItemUpdateHistoryDataDto[] | null;
    newPaidDateTime: string;
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