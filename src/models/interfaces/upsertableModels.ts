import type { IOrderableListModel, IBasicModel } from "./baseModels";

export interface IUpsertableListModel<
            TBasicModel extends IUpsertableBasicModel<TAuthorizationModel>,
            TListAuthorizationModel extends IUpsertableListAuthorizationModel,
            TAuthorizationModel extends IUpsertableAuthorizationModel,
            TRequestDto,
            TResponseDto>
        extends IOrderableListModel<TBasicModel, TRequestDto, TResponseDto> {
    readonly authorization: TListAuthorizationModel | null;
}

export interface IUpsertableBasicModel<TAuthorization extends IUpsertableAuthorizationModel>
        extends IBasicModel {
    readonly authorization: TAuthorization | null;
}

export interface IUpsertableListAuthorizationModel {
    readonly canCreate: boolean;
}

export interface IUpsertableAuthorizationModel {
    readonly canEdit: boolean;
    readonly canDelete: boolean;
}