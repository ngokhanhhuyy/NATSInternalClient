import { useApiClient } from "./apiClient";
import type { NotificationListRequestDto } from "./dtos/requestDtos";
import type {
    NotificationListResponseDto,
    NotificationResponseDto } from "./dtos/responseDtos";

export interface INotificationService {
    getListAsync(requestDto?: NotificationListRequestDto): Promise<NotificationListResponseDto>;
    getSingleAsync(id: number): Promise<NotificationResponseDto>;
    markAsReadAsync(id: number): Promise<void>;
}

export function useNotificationService() : INotificationService {
    const apiClient = useApiClient();

    return {
        async getListAsync(requestDto?: NotificationListRequestDto): Promise<NotificationListResponseDto> {
            return apiClient.getAsync<NotificationListResponseDto>("/notification", requestDto);
        },

        async getSingleAsync(id: number): Promise<NotificationResponseDto> {
            return apiClient.getAsync<NotificationResponseDto>(`/notification/${id}`);
        },

        async markAsReadAsync(id: number): Promise<void> {
            return apiClient.postAndIgnoreAsync(`/notification/${id}`, {});
        }
    };
}