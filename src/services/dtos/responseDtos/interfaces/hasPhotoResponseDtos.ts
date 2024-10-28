declare global {
    interface IHasThumbnailBasicResponseDto {
        thumbnailUrl: string | null;
    }
    
    interface IHasThumbnailDetailResponseDto extends IHasThumbnailBasicResponseDto { }
    
    interface IHasMultiplePhotosDetailResponseDto {
        photos: IPhotoResponseDto[] | null;
    }
    
    interface IPhotoResponseDto {
        id: number;
        url: string;
    }
}

export { };