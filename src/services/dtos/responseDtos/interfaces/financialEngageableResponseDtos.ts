declare global {
    interface IFinancialEngageableBasicResponseDto extends IUpsertableBasicResponseDto {
        amountBeforeVat: boolean;
        isLocked: boolean;
        authorization: IFinancialEngageableAuthorizationResponseDto | null;
    }
    
    interface IFinancialEngageableListResponseDto extends IUpsertableListResponseDto {
        monthYearOptions: MonthYearResponseDto[] | null;
    }
    
    interface IFinancialEngageableDetailResponseDto
            extends
                IFinancialEngageableBasicResponseDto,
                ICreatorTrackableDetailResponseDto,
                IUpdaterTrackableDetailResponseDto {
        updateHistories: IFinancialEngageableUpdateHistoryResponseDto[] | null;
        authorization: IFinancialEngageableAuthorizationResponseDto | null;
    }
    
    interface IFinancialEngageableAuthorizationResponseDto
            extends IUpsertableAuthorizationResponseDto {
        canSetStatsDateTime: boolean;
    }
    
    interface IFinancialEngageableUpdateHistoryResponseDto
            extends IUpdateHistoryResponseDto {
        oldStatsDateTime: string;
        newStatsDateTime: string;
        oldNote: string | null;
        newNote: string | null;
    }
}

export { };