import { AnnouncementCategory } from "@enums";

declare global {
    class AnnouncementListRequestDto implements ISortableListRequestDto {
        page: number;
        resultsPerPage: number;
    }
    
    class AnnouncementUpsertRequestDto {
        category: AnnouncementCategory;
        title: string;
        content: string;
        startingDateTime: string | null;
        intervalInMinutes: number;
    }
}

export { };