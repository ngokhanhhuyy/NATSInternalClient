import type { UserBasicResponseDto } from "./userResponseDtos";

export interface DebtUpdateHistoryResponseDto {
    updatedDateTime: DateTimeISOString;
    updatedUser: UserBasicResponseDto;
    reason: string;
    oldIncurredDateTime: DateTimeISOString;
    oldAmount: number;
    oldNote: string;
    newIncurredDateTime: DateTimeISOString;
    newAmount: number;
    newNote: string;
}