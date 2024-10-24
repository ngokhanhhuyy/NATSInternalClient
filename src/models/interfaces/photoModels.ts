declare global {
    interface IHasPhotoBasicModel extends IBasicModel {
        thumbnailUrl: string;
    }
    
    interface IHasSinglePhotoDetailModel extends IHasPhotoBasicModel {
        thumbnailUrl: string;
    }
    
    interface IHasSinglePhotoUpsertModel extends IUpsertModel {
        thumbnailUrl: string | null;
        thumbnailFile: string | null;
        thumbnailChanged: boolean;
    }
    
    interface IHasMultiplePhotoDetailModel {
        photos: IDetailPhotoModel[];
    }
    
    interface IHasMultiplePhotoUpsertModel {
        photos: IUpsertPhotoModel[];
    }
    
    interface IDetailPhotoModel {
        id: number;
        url: string;
    }
    
    interface IUpsertPhotoModel extends IUpsertModel {
        id: number | null;
        url: string | null;
        file: string | null;
        hasBeenChanged: boolean;
        hasBeenDeleted: boolean;
        toRequestDto(): IPhotoUpsertRequestDto;
    }
}

export { };