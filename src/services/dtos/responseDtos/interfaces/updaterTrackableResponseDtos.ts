declare global {
    interface IUpdaterTrackableDetailResponseDto<
                TAuthorization extends IUpsertableExistingAuthorizationResponseDto>
            extends IUpsertableDetailResponseDto<TAuthorization> {
        updateHistories: IUpdateHistoryResponseDto[] | null;
    }
    
    interface IUpdateHistoryResponseDto {
        updatedDateTime: string;
        updatedUser: UserBasicResponseDto;
        updatedReason: string;
    }
}

export { };