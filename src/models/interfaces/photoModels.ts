import type { IPhotoUpsertRequestDto } from "@/services/dtos/requestDtos/interfaces";
import type { IBasicModel, IUpsertModel } from "./baseModels";

export interface IHasPhotoBasicModel extends IBasicModel {
    thumbnailUrl: string;
}

export interface IHasSinglePhotoDetailModel extends IHasPhotoBasicModel {
    thumbnailUrl: string;
}

export interface IHasSinglePhotoUpsertModel extends IUpsertModel {
    thumbnailUrl: string | null;
    thumbnailFile: string | null;
    thumbnailChanged: boolean;
}

export interface IHasMultiplePhotoDetailModel {
    photos: IDetailPhotoModel[];
}

export interface IHasMultiplePhotoUpsertModel {
    photos: IUpsertPhotoModel[];
}

export interface IDetailPhotoModel {
    id: number;
    url: string;
}

export interface IUpsertPhotoModel extends IUpsertModel {
    id: number | null;
    url: string | null;
    file: string | null;
    hasBeenChanged: boolean;
    hasBeenDeleted: boolean;
    toRequestDto(): IPhotoUpsertRequestDto;
}