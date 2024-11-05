declare global {
    namespace ResponseDtos {
        interface ICreatorTrackableDetail<
                    TAuthorization extends IUpsertableExistingAuthorization>
                extends IUpsertableDetail<TAuthorization> {
            createdUser: UserBasicResponseDto;
        }

    }
}

export { };