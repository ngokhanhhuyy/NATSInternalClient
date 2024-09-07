import type { TreatmentPhotoRequestDto } from "@/services/dtos/requestDtos/treatmentPhotoRequestDtos";
import type { TreatmentPhotoResponseDto } from "@/services/dtos/responseDtos/treatmentPhotoResponseDtos";

export class TreatmentPhotoModel {
    public id: number | null = null;
    public url: string | null = null;
    public file: string | null = null;
    public hasBeenChanged: boolean = false;

    constructor(responseDto?: TreatmentPhotoResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.url = responseDto.url;
        }
    }

    public toRequestDto(): TreatmentPhotoRequestDto {
        return {
            id: this.id,
            file: this.file,
            hasBeenChanged: this.hasBeenChanged
        };
    }
}