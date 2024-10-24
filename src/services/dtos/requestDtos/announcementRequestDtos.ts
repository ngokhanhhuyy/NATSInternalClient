import { AnnouncementCategory } from "@/services/dtos/enums";

declare global {
    interface AnnouncementListRequestDto {
        page: number;
        resultsPerPage: number;
    }
    
    interface AnnouncementUpsertRequestDto {
        category: AnnouncementCategory;
        title: string;
        content: string;
        startingDateTime: string | null;
        intervalInMinutes: number;
    }
}

export { };