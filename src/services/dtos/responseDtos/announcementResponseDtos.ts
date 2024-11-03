import type { AnnouncementCategory } from "@enums";

declare global {
    interface AnnouncementListResponseDto extends IUpsertableListResponseDto {
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
        createdUser: UserBasicResponseDto;
        authorization: AnnouncementExistingAuthorizationResponseDto | null;
    }

    interface AnnouncementExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
}

export { };