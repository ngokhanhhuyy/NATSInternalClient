import type { SupplyPhotoRequestDto } from "@/services/dtos/requestDtos/supplyPhotoRequestDtos";
import type { SupplyPhotoResponseDto } from "@/services/dtos/responseDtos/supplyPhotoResponseDtos";
import { Model } from "./baseModels";

export class SupplyPhotoModel extends Model {
    public id: number | null = null;
    public url: string | null = null;
    public file: string | null = null;
    public hasBeenChanged: boolean = false;

    constructor(responseDto?: SupplyPhotoResponseDto) {
        super();
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