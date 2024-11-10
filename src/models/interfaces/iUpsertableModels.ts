import type { RouteLocationRaw } from "vue-router";

declare global {
    interface IUpsertableListModel<
                TBasic extends IUpsertableBasicModel<TAuthorization>,
                TAuthorization extends IUpsertableExistingAuthorizationModel>
            extends IPaginatedListModel<TBasic> {
        readonly createRoute: RouteLocationRaw;
    }
    
    interface IUpsertableBasicModel<
                TAuthorization extends IUpsertableExistingAuthorizationModel>
            extends IBasicModel {
        readonly authorization: TAuthorization | null;
        readonly detailRoute: RouteLocationRaw;
        readonly updateRoute: RouteLocationRaw;
    }
    
    interface IUpsertableDetailModel<
                TAuthorization extends IUpsertableExistingAuthorizationModel> {
        readonly authorization: TAuthorization;
        readonly detailRoute: RouteLocationRaw;
        readonly updateRoute: RouteLocationRaw;
    }
    
    interface IUpsertableExistingAuthorizationModel {
        readonly canEdit: boolean;
        readonly canDelete: boolean;
    }
}

export { };