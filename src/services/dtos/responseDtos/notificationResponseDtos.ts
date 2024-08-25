import type { UserBasicResponseDto } from "@/services/dtos/responseDtos";
import { NotificationType } from "@/services/dtos/enums";

export interface NotificationResponseDto {
    id: number;
    type: NotificationType;
    dateTime: string;
    deltaText: string;
    resourceIds: number[] | null;
    createdUser: UserBasicResponseDto | null;
    isRead: boolean;
}

export interface NotificationListResponseDto {
    pageCount: number;
    items: NotificationResponseDto[] | null;
}