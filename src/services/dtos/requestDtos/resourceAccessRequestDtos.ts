import type { ResourceAccessMode } from "../enums";

export interface ResourceAccessRequestDto {
    type: string;
    primaryId: number;
    secondaryId: number | null;
    mode: ResourceAccessMode
}