import type { SupplyPhotoRequestDto } from "@/services/dtos/requestDtos/supplyPhotoRequestDtos";
import type { SupplyPhotoResponseDto } from "@/services/dtos/responseDtos/supplyPhotoResponseDtos";

export class SupplyPhotoModel {
    public id: number | null = null;
    public url: string | null = null;
    public file: string | null = null;
    public hasBeenChanged: boolean = false;

    constructor(responseDto?: SupplyPhotoResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.url = responseDto.url;
        };
    }

    public toRequestDto(): SupplyPhotoRequestDto {
        return {
            id: this.id,
            file: this.file,
            hasBeenChanged: this.hasBeenChanged
        };
    }
}