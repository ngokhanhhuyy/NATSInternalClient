import type { IBasicModel, IUpsertModel } from "./baseModels";

export interface IHasPhotoBasicModel extends IBasicModel {
    thumbnailUrl: string;
}

export interface IHasSinglePhotoDetailModel extends IHasPhotoBasicModel {
    thumbnailUrl: string;
}

export interface  IHasSinglePhotoUpsertModel<
            TPhotoModel extends IUpsertPhotoModel<TRequestDto>,
            TRequestDto extends IUpsertModel<TRequestDto>,
            TPhotoRequestDto extends IUpsertPhotoModel<TPhotoRequestDto>>
        extends IUpsertModel<TRequestDto> {
    photos: TPhotoModel[];
}

export interface IHasMultiplePhotoDetailModel<TPhotoModel extends IDetailPhotoModel> {
    items: TPhotoModel[];
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