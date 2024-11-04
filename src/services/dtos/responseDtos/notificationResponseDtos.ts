import { NotificationType } from "../enums";

declare global {
    class NotificationResponseDto implements IBasicResponseDto {
        id: number;
        type: NotificationType;
        dateTime: string;
        resourceIds: number[] | null;
        createdUser: UserBasicResponseDto | null;
        isRead: boolean;
    }
    
    class NotificationListResponseDto implements IListResponseDto<NotificationResponseDto> {
        pageCount: number;
        items: NotificationResponseDto[];
    }
}

export { };