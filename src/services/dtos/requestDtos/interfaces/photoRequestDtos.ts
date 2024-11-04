declare global {
    interface IUpsertPhotoRequestDto {
        id: number | null;
        file: string | null;
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }

    interface IHasMultiplePhotosUpsertRequestDto<TPhoto extends IUpsertPhotoRequestDto> {
        photos: TPhoto[] | null;
    }

    interface IHasThumbnailUpsertRequestDto {
        thumbnailFile: string | null;
        thumbnailChanged: boolean;
    }
}

export { };