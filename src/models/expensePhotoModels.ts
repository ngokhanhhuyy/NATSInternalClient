export class ExpenseDetailPhotoModel implements IDetailPhotoModel  {
    public id: number;
    public url: string;

    constructor(responseDto: ExpensePhotoResponseDto) {
        this.id = responseDto.id;
        this.url = responseDto.url;
    }
}

export class ExpenseUpsertPhotoModel implements IUpsertPhotoModel {
    public id: number | null = null;
    public url: string | null = null;
    public file: string | null = null;
    public hasBeenChanged: boolean = false;
    public hasBeenDeleted: boolean = false;

    constructor(responseDto: ExpensePhotoResponseDto) {
        this.id = responseDto.id;
        this.url = responseDto.url;
    }

    public toRequestDto(): ExpensePhotoRequestDto {
        return {
            id: this.id,
            file: this.file,
            hasBeenChanged: this.hasBeenChanged,
            hasBeenDeleted: this.hasBeenDeleted
        };
    }
}