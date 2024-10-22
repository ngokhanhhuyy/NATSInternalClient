import type { TreatmentUpsertPhotoRequestDto } from "@/services/dtos/requestDtos/";
import type { TreatmentPhotoResponseDto } from "@/services/dtos/responseDtos/";
import type { IDetailPhotoModel, IUpsertPhotoModel } from "@/models/interfaces";

export class TreatmentDetailPhotoModel implements IDetailPhotoModel {
    public id: number;
    public url: string;

    constructor(responseDto: TreatmentPhotoResponseDto) {
        this.id = responseDto.id;
        this.url = responseDto.url;
    }
}

export class TreatmentUpsertPhotoModel implements IUpsertPhotoModel<TreatmentUpsertPhotoRequestDto> {
    public id: number | null = null;
    public url: string | null = null;
    public file: string | null = null;

    public hasBeenChanged: boolean = false;
    public hasBeenDeleted: boolean = false;

    constructor(responseDto?: TreatmentPhotoResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.url = responseDto.url;
        }
    }

    public toRequestDto(): TreatmentUpsertPhotoRequestDto {
        return {
            id: this.id,
            file: this.file,
            hasBeenChanged: this.hasBeenChanged
        };
    }
}