import { AnnouncementCategory } from "@enums";

declare global {
    namespace RequestDtos {
        namespace Announcement {
            type List = Implements<ISortableListRequestDto, {
                page: number;
                resultsPerPage: number;
            }>;
            
            type Upsert = {
                category: AnnouncementCategory;
                title: string;
                content: string;
                startingDateTime: string | null;
                intervalInMinutes: number;
            }
        }
    }
}

export { };