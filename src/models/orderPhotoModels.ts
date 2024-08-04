import type { OrderPhotoRequestDto } from "@/services/dtos/requestDtos/orderPhotoRequestDtos";
import type { OrderPhotoResponseDto } from "@/services/dtos/responseDtos/orderPhotoResponseDtos";
import { Model } from "./baseModels";

export class OrderPhotoModel extends Model {
    public id: number | null = null;
    public url: string | null = null;
    public file: string | null = null;
    public hasBeenChanged: boolean = false;

    constructor(responseDto?: OrderPhotoResponseDto) {
        super();
        if (responseDto) {
            this.id = responseDto.id;
            this.url = responseDto.url;
        }
    }

    public toRequestDto(): OrderPhotoRequestDto {
        return {
            id: this.id,
            file: this.file,
            hasBeenChanged: this.hasBeenChanged
        };
    }
}