import type { UserBasicModel } from "../userModels";

declare global {
    interface ICreatorTrackableListModel<TBasic extends IBasicModel>
            extends ISortableListModel<TBasic> {
        createdUserId?: number;
    }

    interface ICreateorTrackableDetailModel<
                TAuthorization extends IUpsertableExistingAuthorizationModel>
            extends IUpsertableDetailModel<TAuthorization> {
        createdUser: UserBasicModel;
    }
}

export { };