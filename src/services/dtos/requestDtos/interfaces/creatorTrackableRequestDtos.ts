import type { IOrderableListRequestDto } from "./baseRequestDtos";

export interface ICreatorTrackableListRequestDto extends IOrderableListRequestDto {
    createdUserId: number | null;
}