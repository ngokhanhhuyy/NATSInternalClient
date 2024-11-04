declare global {
    interface IFinancialEngageableBasicResponseDto<
                TAuthorization extends IFinancialEngageableExistingAuthorizationResponseDto>
            extends IUpsertableBasicResponseDto<TAuthorization> {
        amount: number;
        isLocked: boolean;
    }
    
    interface IFinancialEngageableListResponseDto<
                TBasic extends IFinancialEngageableBasicResponseDto<TAuthorization>,
                TAuthorization extends IFinancialEngageableExistingAuthorizationResponseDto>
            extends IUpsertableListResponseDto<TBasic, TAuthorization> {
    }
    
    interface IFinancialEngageableDetailResponseDto<
                TUpdateHistory extends IFinancialEngageableUpdateHistoryResponseDto,
                TAuthorization extends IFinancialEngageableExistingAuthorizationResponseDto>
            extends
                ICreatorTrackableDetailResponseDto<TAuthorization>,
                IUpdaterTrackableDetailResponseDto<TAuthorization> {
        isLocked: boolean;
        updateHistories: TUpdateHistory[] | null;
    }

    interface IFinancialEngageableCreatingAuthorizationResponseDto {
        canSetStatsDateTime: boolean;
    }
    
    interface IFinancialEngageableExistingAuthorizationResponseDto
            extends IUpsertableExistingAuthorizationResponseDto {
        canSetStatsDateTime: boolean;
    }
    
    interface IFinancialEngageableUpdateHistoryResponseDto extends IUpdateHistoryResponseDto {
        oldStatsDateTime: string;
        newStatsDateTime: string;
        oldNote: string | null;
        newNote: string | null;
    }
}

export { };