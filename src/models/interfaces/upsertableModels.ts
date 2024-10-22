import type { IUpsertableListResponseDto } from "@/services/dtos/responseDtos/interfaces";
import type { IOrderableListModel, IBasicModel } from "./baseModels";

export interface IUpsertableListModel extends IOrderableListModel {
    readonly authorization: IUpsertableListAuthorizationModel | null;
    mapFromResponseDto(responseDto: IUpsertableListResponseDto): void;
}

export interface IUpsertableBasicModel extends IBasicModel {
    readonly authorization: IUpsertableAuthorizationModel | null;
}

export interface IUpsertableListAuthorizationModel {
    readonly canCreate: boolean;
}

export interface IUpsertableAuthorizationModel {
    readonly canEdit: boolean;
    readonly canDelete: boolean;
}