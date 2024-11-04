declare global {
    interface IHasThumbnailBasicResponseDto {
        thumbnailUrl: string | null;
    }
    
    interface IHasThumbnailDetailResponseDto {
        thumbnailUrl: string | null;
    }
    
    interface IHasMultiplePhotosDetailResponseDto<TPhoto extends IPhotoResponseDto> {
        photos: TPhoto[] | null;
    }
    
    interface IPhotoResponseDto {
        id: number;
        url: string;
    }
}

export { };