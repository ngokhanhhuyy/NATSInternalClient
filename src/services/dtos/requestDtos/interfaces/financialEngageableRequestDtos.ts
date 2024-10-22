import type { ICreatorTrackableListRequestDto } from "./creatorTrackableRequestDtos";

export interface IFinancialEngageableListRequestDto extends ICreatorTrackableListRequestDto {
    year: number | null;
    month: number | null;
    ignoreMonthYear: boolean;
}

export interface IFinancialEngageableUpsertRequestDto {
    statsDateTime: string | null;
    note: string | null;
    updatedReason: string | null;
}