import { NotificationType } from "../enums";

declare global {
    interface NotificationResponseDto {
        id: number;
        type: NotificationType;
        dateTime: string;
        resourceIds: number[] | null;
        createdUser: UserBasicResponseDto | null;
        isRead: boolean;
    }
    
    interface NotificationListResponseDto {
        pageCount: number;
        items: NotificationResponseDto[] | null;
    }
}

export { };