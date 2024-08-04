import type { UserBasicResponseDto } from "./userResponseDtos";

export interface ConsultantUpdateHistoryResponseDto {
    updatedDateTime: string;
    updatedUser: UserBasicResponseDto;
    reason: string;
    oldPaidDateTime: string;
    oldAmount: number;
    oldNote: string;
    newPaidDateTime: string;
    newAmount: number;
    newNote: string;
}