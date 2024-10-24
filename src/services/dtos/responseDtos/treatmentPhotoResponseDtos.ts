import { TreatmentPhotoType } from "../enums";

declare global {
    interface TreatmentPhotoResponseDto {
        id: number;
        url: string;
        type: TreatmentPhotoType
    }
}

export { };