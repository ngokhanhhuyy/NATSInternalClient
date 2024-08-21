import { useApiClient } from "./apiClient";
import type {
    OrderListRequestDto,
    OrderUpsertRequestDto } from "./dtos/requestDtos";
import type {
    OrderListResponseDto,
    OrderDetailResponseDto } from "./dtos/responseDtos";

export function useOrderService() {
    const apiClient = useApiClient();

    return {
        async getListAsync(requestDto?: OrderListRequestDto): Promise<OrderListResponseDto> {
            return apiClient.getAsync<OrderListResponseDto>("/order", requestDto);
        },

        async getDetailAsync(id: number): Promise<OrderDetailResponseDto> {
            return apiClient.getAsync<OrderDetailResponseDto>(`/order/${id}`);
        },

        async createAsync(requestDto: OrderUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("/order", requestDto);
        },

        async updateAsync(id: number, requestDto: OrderUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`/order/${id}`, requestDto);
        },

        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`/order/${id}`);
        },
    };
}