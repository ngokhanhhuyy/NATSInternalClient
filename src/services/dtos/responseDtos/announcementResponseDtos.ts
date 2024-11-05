import type { AnnouncementCategory } from "@enums";

declare global {
    namespace ResponseDtos {
        namespace Announcement {
            type List = Implements<IUpsertableList<Basic, ExistingAuthorization>, {
                items: Basic[];
                pageCount: number;
            }>;
            
            type Basic = Implements<IUpsertableBasic<ExistingAuthorization>, {
                id: number;
                category: AnnouncementCategory;
                title: string;
                content: string;
                startingDateTime: string;
                endingDateTime: string;
                createdUser: UserBasicResponseDto;
                authorization: ExistingAuthorization | null;
            }>;
        
            type ExistingAuthorization = Implements<IUpsertableExistingAuthorization, {
                canEdit: boolean;
                canDelete: boolean;
            }>;
        }
    }
}

export { };