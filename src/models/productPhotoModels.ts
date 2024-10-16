import type { ProductPhotoRequestDto } from "@/services/dtos/requestDtos";
import type { ProductPhotoResponseDto } from "@/services/dtos/responseDtos";

export class ProductPhotoModel {
    public id: number | null = null;
    public url: string | null = null;
    public file: string | null = null;
    public hasBeenChanged: boolean = false;
    public hasBeenDeleted: boolean = false;

    constructor(responseDto?: ProductPhotoResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.url = responseDto.url;
        }
    }

    public toRequestDto(): ProductPhotoRequestDto {
        return {
            id: this.id,
            file: this.url,
            hasBeenChanged: this.hasBeenChanged,
            hasBeenDeleted: this.hasBeenDeleted
        };
    }
}