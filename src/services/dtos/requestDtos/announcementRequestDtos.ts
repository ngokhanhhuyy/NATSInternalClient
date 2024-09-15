import { AnnouncementCategory } from "@/services/dtos/enums";

export interface AnnouncementListRequestDto {
    page: number;
    resultsPerPage: number;
}

export interface AnnouncementUpsertRequestDto {
    category: AnnouncementCategory;
    title: string;
    content: string;
    startingDateTime: string | null;
    intervalInMinutes: number;
}