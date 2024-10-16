import type { IListModel, IBasicModel } from "./baseModels";

export interface IUpsertableListModel<
            TBasicModel extends IUpsertableBasicModel<TAuthorizationModel>,
            TAuthorizationModel extends IUpsertableAuthorizationModel,
            TListAuthorizationModel extends IUpsertableListAuthorizationModel,
            TRequestDto,
            TResponseDto>
        extends IListModel<TBasicModel, TRequestDto, TResponseDto> {
    readonly authorization: TListAuthorizationModel | null;
}

export interface IUpsertableBasicModel<TAuthorizationModel extends IUpsertableAuthorizationModel>
        extends IBasicModel {
    readonly authorization: TAuthorizationModel | null;
}

export interface IUpsertableListAuthorizationModel {
    readonly canCreate: boolean;
}

export interface IUpsertableAuthorizationModel {
    readonly canEdit: boolean;
    readonly canDelete: boolean;
}