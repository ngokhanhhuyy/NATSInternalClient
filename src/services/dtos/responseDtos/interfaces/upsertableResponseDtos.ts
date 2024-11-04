declare global {
    interface IUpsertableBasicResponseDto<
                TAuthorization extends IUpsertableExistingAuthorizationResponseDto>
            extends IBasicResponseDto {
        authorization: TAuthorization | null;
    }
    
    interface IUpsertableListResponseDto<
            TBasic extends IUpsertableBasicResponseDto<TAuthorization>,
            TAuthorization extends IUpsertableExistingAuthorizationResponseDto>
        extends IListResponseDto<TBasic> { }
    
    interface IUpsertableDetailResponseDto<
            TAuthorization extends IUpsertableExistingAuthorizationResponseDto> {
        createdDateTime: string;
        authorization: TAuthorization | null;
    }
    
    interface IUpsertableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
}

export { };