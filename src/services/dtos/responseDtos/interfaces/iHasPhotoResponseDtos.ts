declare global {
    namespace ResponseDtos {
        interface IHasThumbnailBasic {
            thumbnailUrl: string | null;
        }
        
        interface IHasThumbnailDetail {
            thumbnailUrl: string | null;
        }
        
        interface IHasMultiplePhotosDetail<TPhoto extends IPhoto> {
            photos: TPhoto[] | null;
        }
        
        interface IPhoto {
            id: number;
            url: string;
        }
    }
}

export { };