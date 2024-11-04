import type { ResourceAccessMode } from "../enums";

declare global {
    class ResourceAccessRequestDto {
        type: string;
        primaryId: number;
        secondaryId: number | null;
        mode: ResourceAccessMode;
    }
}

export { };