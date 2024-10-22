import type { UserBasicResponseDto } from "../userResponseDtos";
import type { IUpsertableDetailResponseDto } from "./upsertableResponseDtos";

export interface IUpdaterTrackableDetailResponseDto extends IUpsertableDetailResponseDto {
    updateHistories: IUpdateHistoryResponseDto[] | null;
}

export interface IUpdateHistoryResponseDto {
    updatedDateTime: string;
    updatedUser: UserBasicResponseDto;
    updatedReason: string;
}