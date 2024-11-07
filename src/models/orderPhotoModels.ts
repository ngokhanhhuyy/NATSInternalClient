export class OrderDetailPhotoModel implements IDetailPhotoModel {
    public id: number;
    public url: string;

    constructor(responseDto: ResponseDtos.Order.Photo) {
        this.id = responseDto.id;
        this.url = responseDto.url;
    }
}

export class OrderUpsertPhotoModel implements IUpsertPhotoModel {
    public id: number | null = null;
    public url: string | null = null;
    public file: string | null = null;
    public hasBeenChanged: boolean = false;
    public hasBeenDeleted: boolean = false;

    constructor(responseDto?: ResponseDtos.Order.Photo) {
        if (responseDto) {
            this.id = responseDto.id;
            this.url = responseDto.url;
        }
    }

    public toRequestDto(): RequestDtos.OrderUpsert.Photo {
        return {
            id: this.id,
            file: this.file,
            hasBeenChanged: this.hasBeenChanged,
            hasBeenDeleted: this.hasBeenDeleted
        };
    }
}