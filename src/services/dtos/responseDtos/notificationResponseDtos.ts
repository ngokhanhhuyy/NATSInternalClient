import { NotificationType } from "@enums";

declare global {
    type NotificationResponseDto = InstanceType<typeof ResponseDtos.Notification.Basic>;
    type NotificationListResponseDto = InstanceType<typeof ResponseDtos.Notification.List>;

    namespace ResponseDtos {
        namespace Notification {
            class Basic implements IBasic {
                id: number;
                type: NotificationType;
                dateTime: string;
                resourceIds: number[] | null;
                createdUser: UserBasicResponseDto | null;
                isRead: boolean;
            }
            
            class List implements IList<Basic> {
                pageCount: number;
                items: Basic[];
            }
        }
    }
}

export { };