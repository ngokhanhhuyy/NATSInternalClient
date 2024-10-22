import type { UserBasicResponseDto } from "../userResponseDtos";
import type { IUpsertableDetailResponseDto } from "./upsertableResponseDtos";

export interface ICreatorTrackableDetailResponseDto extends IUpsertableDetailResponseDto {
    createdUser: UserBasicResponseDto;
}