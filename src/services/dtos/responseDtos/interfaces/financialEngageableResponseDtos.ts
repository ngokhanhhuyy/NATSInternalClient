import type { MonthYearResponseDto } from "../monthYearResponseDtos";
import type { ICreatorTrackableDetailResponseDto } from "./creatorTrackableResponseDtos";
import type { IUpdateHistoryResponseDto, IUpdaterTrackableDetailResponseDto } from "./updaterTrackableResponseDtos";
import type {
    IUpsertableAuthorizationResponseDto,
    IUpsertableBasicResponseDto, 
    IUpsertableListResponseDto } from "./upsertableResponseDtos";

export interface IFinancialEngageableBasicResponseDto extends IUpsertableBasicResponseDto {
    amountBeforeVat: boolean;
    isLocked: boolean;
    authorization: IFinancialEngageableAuthorizationResponseDto | null;
}

export interface IFinancialEngageabeListResponseDto extends IUpsertableListResponseDto {
    monthYearOptions: MonthYearResponseDto[];
}

export interface IFinancialEngageableDetailResponseDto
        extends
            IFinancialEngageableBasicResponseDto,
            ICreatorTrackableDetailResponseDto,
            IUpdaterTrackableDetailResponseDto {
    updateHistories: IFinancialEngageableUpdateHistoryResponseDto[] | null;
    authorization: IFinancialEngageableAuthorizationResponseDto | null;
}

export interface IFinancialEngageableAuthorizationResponseDto
        extends IUpsertableAuthorizationResponseDto {
    canSetStatsDateTime: boolean;
}

export interface IFinancialEngageableUpdateHistoryResponseDto
        extends IUpdateHistoryResponseDto {
    oldStatsDateTime: string;
    newStatsDateTime: string;
    oldNote: string | null;
    newNote: string | null;
}