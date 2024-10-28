declare global {
    interface ICreatorTrackableDetailResponseDto extends IUpsertableDetailResponseDto {
        createdUser: UserBasicResponseDto;
    }
}

export { };