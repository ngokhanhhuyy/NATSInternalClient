import type { IBasicModel, IUpsertModel } from "./baseModels";

export interface IHasPhotoBasicModel extends IBasicModel {
    thumbnailUrl: string;
}

export interface IHasSinglePhotoDetailModel extends IHasPhotoBasicModel {
    thumbnailUrl: string;
}

export interface  IHasSinglePhotoUpsertModel<TRequestDto> extends IUpsertModel<TRequestDto> {
    thumbnailUrl: string | null;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
}

export interface IHasMultiplePhotoDetailModel<TPhotoModel extends IDetailPhotoModel> {
    photos: TPhotoModel[];
}

export interface IHasMultiplePhotoUpsertModel<
        TPhotoModel extends IUpsertPhotoModel<TPhotoRequestDto>,
        TPhotoRequestDto> {
    photos: TPhotoModel[];
}

export interface IDetailPhotoModel {
    id: number;
    url: string;
}

export interface IUpsertPhotoModel<TRequestDto> extends IUpsertModel<TRequestDto> {
    id: number | null;
    url: string | null;
    file: string | null;
    hasBeenChanged: boolean;
    hasBeenDeleted: boolean;
}