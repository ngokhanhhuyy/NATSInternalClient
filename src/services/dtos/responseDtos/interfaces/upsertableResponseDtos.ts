declare global {
    interface IUpsertableBasicResponseDto extends IBasicResponseDto {
        authorization: IUpsertableExistingAuthorizationResponseDto | null;
    }
    
    interface IUpsertableListResponseDto extends IListResponseDto {
        items: IUpsertableBasicResponseDto[];
    }
    
    interface IUpsertableDetailResponseDto extends IUpsertableBasicResponseDto {
        createdDateTime: string; 
    }
    
    interface IUpsertableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
}

export { };