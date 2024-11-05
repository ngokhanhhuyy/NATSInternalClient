declare global {
    namespace ResponseDtos {
        interface IUpdaterTrackableDetailResponseDto<
                    TAuthorization extends IUpsertableExistingAuthorization>
                extends IUpsertableDetail<TAuthorization> {
            updateHistories: IUpdateHistory[] | null;
        }
        
        interface IUpdateHistory {
            updatedDateTime: string;
            updatedUser: UserBasicResponseDto;
            updatedReason: string;
        }
    }
}

export { };