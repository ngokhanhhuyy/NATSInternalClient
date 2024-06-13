import { useApiClient } from "./apiClient";
import type {
    SupplyListRequestDto,
    SupplyUpsertRequestDto } from "./dtos/requestDtos/supplyRequestDtos";
import type {
    SupplyDetailResponseDto,
    SupplyListResponseDto } from "./dtos/responseDtos/supplyResponseDtos";

export function useSupplyService() {
    const apiClient = useApiClient();

    return {
        async getListAsync(requestDto: SupplyListRequestDto): Promise<SupplyListResponseDto> {
            return await apiClient.getAsync<SupplyListResponseDto>("/supply/list", requestDto);
        },

        async getDetailAsync(id: number): Promise<SupplyDetailResponseDto> {
            return await apiClient.getAsync<SupplyDetailResponseDto>(`/supply/${id}/detail`);
        },

        async createAsync(requestDto: SupplyUpsertRequestDto): Promise<number> {
            return await apiClient.postAsync<number>("/supply/create", requestDto);
        },

        async updateAsync(id: number, requestDto: SupplyUpsertRequestDto): Promise<void> {
            return await apiClient
                .putAndIgnoreAsync(`/supply/${id}/update`, requestDto);
        },

        async deleteAsync(id: number): Promise<void> {
            return await apiClient.deleteAndIgnoreAsync(`/supply/${id}/delete`);
        }
    }
}