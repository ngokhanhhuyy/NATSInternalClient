declare global {
    interface IUpsertableBasicResponseDto extends IBasicResponseDto {
        authorization: IUpsertableAuthorizationResponseDto | null;
    }
    
    interface IUpsertableListResponseDto extends IListResponseDto {
        items: IUpsertableBasicResponseDto[] | null;
        authorization: IUpsertableListAuthorizationResponseDto | null;
    }
    
    interface IUpsertableDetailResponseDto extends IUpsertableBasicResponseDto {
        createdDateTime: string; 
    }
    
    interface IUpsertableListAuthorizationResponseDto {
        canCreate: boolean;
    }
    
    interface IUpsertableAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
}

export { };