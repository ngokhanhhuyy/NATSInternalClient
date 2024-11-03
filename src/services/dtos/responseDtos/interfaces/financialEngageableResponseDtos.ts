declare global {
    interface IFinancialEngageableBasicResponseDto extends IUpsertableBasicResponseDto {
        amountBeforeVat: boolean;
        isLocked: boolean;
        authorization: IFinancialEngageableExistingAuthorizationResponseDto | null;
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
        authorization: IFinancialEngageableExistingAuthorizationResponseDto | null;
    }

    interface IFinancialEngageableExistingAuthorizationResponseDto {
        canSetStatsDateTime: boolean;
    }
    
    interface IFinancialEngageableExistingAuthorizationResponseDto
            extends IUpsertableExistingAuthorizationResponseDto {
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