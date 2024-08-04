import type { UserBasicResponseDto } from "./userResponseDtos";

export interface DebtPaymentUpdateHistoryResponseDto {
    updatedDateTime: string;
    updatedUser: UserBasicResponseDto;
    reason: string;
    oldPaidDateTime: string;
    oldAmount: number;
    oldNote: string | null;
    newPaidDateTime: string;
    newAmount: number;
    newNote: string | null;
}