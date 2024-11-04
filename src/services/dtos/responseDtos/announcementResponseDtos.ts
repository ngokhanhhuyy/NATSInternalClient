import type { AnnouncementCategory } from "@enums";

declare global {
    class AnnouncementListResponseDto
            implements IUpsertableListResponseDto<
                AnnouncementResponseDto,
                AnnouncementExistingAuthorizationResponseDto> {
        items: AnnouncementResponseDto[];
        pageCount: number;
    }
    
    class AnnouncementResponseDto
            implements IUpsertableBasicResponseDto<
                AnnouncementExistingAuthorizationResponseDto> {
        id: number;
        category: AnnouncementCategory;
        title: string;
        content: string;
        startingDateTime: string;
        endingDateTime: string;
        createdUser: UserBasicResponseDto;
        authorization: AnnouncementExistingAuthorizationResponseDto | null;
    }

    class AnnouncementExistingAuthorizationResponseDto
            implements IUpsertableExistingAuthorizationResponseDto {
        canEdit: boolean;
        canDelete: boolean;
    }
}

export { };