import type { UserBasicResponseDto } from "./userResponseDtos";

export interface ConsultantUpdateHistoryResponseDto {
    updatedDateTime: DateTimeISOString;
    updatedUser: UserBasicResponseDto;
    reason: string;
    oldPaidDateTime: DateTimeISOString;
    oldAmount: number;
    oldNote: string;
    newPaidDateTime: DateTimeISOString;
    newAmount: number;
    newNote: string;
}