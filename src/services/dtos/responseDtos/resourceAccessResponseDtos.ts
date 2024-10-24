import type { ResourceAccessMode } from "../enums";

declare global {
    interface ResourceAccessResponseDto {
        type: string;
        primaryId: number;
        secondaryId: number | null;
        mode: ResourceAccessMode
    }
}

export { };