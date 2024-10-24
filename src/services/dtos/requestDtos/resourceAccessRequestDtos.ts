import type { ResourceAccessMode } from "../enums";

declare global {
    interface ResourceAccessRequestDto {
        type: string;
        primaryId: number;
        secondaryId: number | null;
        mode: ResourceAccessMode
    }
}

export { };