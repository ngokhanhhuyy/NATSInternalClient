import type { UserBasicResponseDto } from "./userResponseDtos";

export interface DebtIncurrenceUpdateHistoryResponseDto {
    updatedDateTime: string;
    updatedUser: UserBasicResponseDto;
    reason: string;
    oldIncurredDateTime: string;
    oldAmount: number;
    oldNote: string;
    newIncurredDateTime: string;
    newAmount: number;
    newNote: string;
}