import type { UserBasicResponseDto } from "./userResponseDtos";

export interface DebtPaymentUpdateHistoryResponseDto {
    updatedDateTime: DateTimeISOString;
    updatedUser: UserBasicResponseDto;
    reason: string;
    oldPaidDateTime: DateTimeISOString;
    oldAmount: number;
    oldNote: string | null;
    newPaidDateTime: DateTimeISOString;
    newAmount: number;
    newNote: string | null;
}