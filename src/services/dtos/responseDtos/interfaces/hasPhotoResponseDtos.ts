export interface IHasThumbnailBasicResponseDto {
    thumbnailUrl: string | null;
}

export interface IHasThumbnailDetailResponseDto extends IHasThumbnailBasicResponseDto { }

export interface IHasMultiplePhotosDetailResponseDto {
    photos: IPhotoResponseDto[] | null;
}

export interface IPhotoResponseDto {
    id: number;
    url: string;
}