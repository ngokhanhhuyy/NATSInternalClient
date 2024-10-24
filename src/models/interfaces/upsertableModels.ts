declare global {
    interface IUpsertableListModel extends IOrderableListModel {
        readonly authorization: IUpsertableListAuthorizationModel | null;
        mapFromResponseDto(responseDto: IUpsertableListResponseDto): void;
    }
    
    interface IUpsertableBasicModel extends IBasicModel {
        readonly authorization: IUpsertableAuthorizationModel | null;
    }
    
    interface IUpsertableListAuthorizationModel {
        readonly canCreate: boolean;
    }
    
    interface IUpsertableAuthorizationModel {
        readonly canEdit: boolean;
        readonly canDelete: boolean;
    }
}

export { };