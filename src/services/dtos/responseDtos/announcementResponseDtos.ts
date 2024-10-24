import type { AnnouncementCategory } from "../enums";

declare global {
    interface AnnouncementListResponseDto {
        items: AnnouncementResponseDto[] | null;
        pageCount: number;
    }
    
    interface AnnouncementResponseDto {
        id: number;
        category: AnnouncementCategory;
        title: string;
        content: string;
        startingDateTime: string;
        endingDateTime: string;
        createdUser: UserBasicResponseDto
    }
}

export { };