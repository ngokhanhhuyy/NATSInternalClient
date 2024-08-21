import { useApiClient } from "./apiClient";
import type {
    SupplyListRequestDto,
    SupplyUpsertRequestDto } from "./dtos/requestDtos";
import type {
    SupplyDetailResponseDto,
    SupplyListResponseDto } from "./dtos/responseDtos";

export function useSupplyService() {
    const apiClient = useApiClient();

    return {
        async getListAsync(requestDto?: SupplyListRequestDto): Promise<SupplyListResponseDto> {
            return await apiClient.getAsync<SupplyListResponseDto>("/supply", requestDto);
        },

        async getDetailAsync(id: number): Promise<SupplyDetailResponseDto> {
            return await apiClient.getAsync<SupplyDetailResponseDto>(`/supply/${id}`);
        },

        async createAsync(requestDto: SupplyUpsertRequestDto): Promise<number> {
            return await apiClient.postAsync<number>("/supply", requestDto);
        },

        async updateAsync(id: number, requestDto: SupplyUpsertRequestDto): Promise<void> {
            return await apiClient
                .putAndIgnoreAsync(`/supply/${id}`, requestDto);
        },

        async deleteAsync(id: number): Promise<void> {
            return await apiClient.deleteAndIgnoreAsync(`/supply/${id}`);
        }
    };
}