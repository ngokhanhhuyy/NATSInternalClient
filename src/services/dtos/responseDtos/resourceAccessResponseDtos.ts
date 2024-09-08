import type { ResourceAccessMode } from "../enums";

export interface ResourceAccessResponseDto {
    type: string;
    primaryId: number;
    secondaryId: number | null;
    mode: ResourceAccessMode
}