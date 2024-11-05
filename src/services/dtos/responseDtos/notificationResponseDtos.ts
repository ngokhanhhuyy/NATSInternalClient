import { NotificationType } from "@enums";

declare global {
    namespace ResponseDtos {
        namespace Notification {
            type Basic = Implements<IBasic, {
                id: number;
                type: NotificationType;
                dateTime: string;
                resourceIds: number[] | null;
                createdUser: ResponseDtos.User.Basic | null;
                isRead: boolean;
            }>;
            
            type List = Implements<IList<Basic>, {
                pageCount: number;
                items: Basic[];
            }>
        }
    }
}

export { };