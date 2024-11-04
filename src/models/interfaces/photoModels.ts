declare global {
    interface IHasPhotoBasicModel extends IBasicModel {
        thumbnailUrl: string;
    }
    
    interface IHasSinglePhotoDetailModel extends IHasPhotoBasicModel {
        thumbnailUrl: string;
    }
    
    interface IHasSinglePhotoUpsertModel {
        thumbnailUrl: string | null;
        thumbnailFile: string | null;
        thumbnailChanged: boolean;
    }
    
    interface IHasMultiplePhotoDetailModel<TPhoto extends IDetailPhotoModel> {
        photos: TPhoto[] | null;
    }
    
    interface IHasMultiplePhotoUpsertModel<TPhoto extends IUpsertPhotoModel> {
        photos: TPhoto[];
    }
    
    interface IDetailPhotoModel {
        id: number;
        url: string;
    }
    
    interface IUpsertPhotoModel {
        id: number | null;
        url: string | null;
        file: string | null;
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
    }
}

export { };