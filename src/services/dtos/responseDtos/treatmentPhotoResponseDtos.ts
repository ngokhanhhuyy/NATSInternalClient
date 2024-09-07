import { TreatmentPhotoType } from "../enums";

export interface TreatmentPhotoResponseDto {
    id: number;
    url: string;
    type: TreatmentPhotoType
}