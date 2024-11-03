declare global {
    interface IUpsertableListModel<
            TBasic extends IUpsertableBasicModel<TAuthorization>,
            TAuthorization extends IUpsertableExistingAuthorizationModel>
        extends ISortableListModel<TBasic> { }
    
    interface IUpsertableBasicModel<
                TAuthorization extends IUpsertableExistingAuthorizationModel>
            extends IBasicModel {
        readonly authorization: TAuthorization | null;
    }
    
    interface IUpsertableDetailModel<
                TAuthorization extends IUpsertableExistingAuthorizationModel>
            extends IBasicModel {
        readonly authorization: TAuthorization;
    }
    
    interface IUpsertableExistingAuthorizationModel {
        readonly canEdit: boolean;
        readonly canDelete: boolean;
    }
}

export { };