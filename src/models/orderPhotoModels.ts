import type { OrderPhotoRequestDto } from "@/services/dtos/requestDtos";
import type { OrderPhotoResponseDto } from "@/services/dtos/responseDtos";
import type { IDetailPhotoModel, IUpsertPhotoModel } from "./interfaces/photoModels";

export class OrderDetailPhotoModel implements IDetailPhotoModel {
    public id: number;
    public url: string;

    constructor(responseDto: OrderPhotoResponseDto) {
        this.id = responseDto.id;
        this.url = responseDto.url;
    }
}

export class OrderUpsertPhotoModel implements IUpsertPhotoModel<OrderPhotoRequestDto>{
    public id: number | null = null;
    public url: string | null = null;
    public file: string | null = null;
    public hasBeenChanged: boolean = false;
    public hasBeenDeleted: boolean = false;

    constructor(responseDto?: OrderPhotoResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.url = responseDto.url;
        }
    }

    public toRequestDto(): OrderPhotoRequestDto {
        return {
            id: this.id,
            file: this.file,
            hasBeenChanged: this.hasBeenChanged,
            hasBeenDeleted: this.hasBeenDeleted
        };
    }
}