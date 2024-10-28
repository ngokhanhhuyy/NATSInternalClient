declare global {
    interface IUpdaterTrackableDetailResponseDto extends IUpsertableDetailResponseDto {
        updateHistories: IUpdateHistoryResponseDto[] | null;
    }
    
    interface IUpdateHistoryResponseDto {
        updatedDateTime: string;
        updatedUser: UserBasicResponseDto;
        updatedReason: string;
    }
}

export { };