import { TreatmentPhotoType } from "@enums";

declare global {
    class TreatmentPhotoResponseDto implements IPhotoResponseDto {
        id: number;
        url: string;
        type: TreatmentPhotoType;
    }
}

export { };