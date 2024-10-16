import type { UserBasicResponseDto } from "./userResponseDtos";

export interface DebtIncurrenceUpdateHistoryResponseDto {
    updatedDateTime: string;
    updatedUser: UserBasicResponseDto;
    updatedReason: string;
    oldStatsDateTime: string;
    oldAmount: number;
    oldNote: string;
    newStatsDateTime: string;
    newAmount: number;
    newNote: string;
}