declare global {
    interface ICreatorTrackableDetailResponseDto<
                TAuthorization extends IUpsertableExistingAuthorizationResponseDto>
            extends IUpsertableDetailResponseDto<TAuthorization> {
        createdUser: UserBasicResponseDto;
    }
}

export { };