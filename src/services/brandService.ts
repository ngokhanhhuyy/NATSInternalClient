import { useApiClient } from "./apiClient";
import type {
    BrandListResponseDto,
    BrandDetailResponseDto } from "./dtos/responseDtos";
import type { BrandUpsertRequestDto } from "./dtos/requestDtos";

export function useBrandService() {
    const apiClient = useApiClient();

    async function getListAsync(): Promise<BrandListResponseDto> {
        return apiClient.getAsync<BrandListResponseDto>("/brand");
    }

    async function getDetailAsync(id: number): Promise<BrandDetailResponseDto> {
        return await apiClient
            .getAsync<BrandDetailResponseDto>(`/brand/${id}`);
    }

    async function createAsync(requestDto: BrandUpsertRequestDto): Promise<number> {
        return await apiClient
            .postAsync<number>("/brand", requestDto);
    }

    async function updateAsync(id: number, requestDto: BrandUpsertRequestDto): Promise<void> {
        return await apiClient
            .putAndIgnoreAsync(`/brand/${id}`, requestDto);
    }

    async function deleteAsync(id: number): Promise<void> {
        return await apiClient
            .deleteAndIgnoreAsync(`/brand/${id}`);
    }

    return { getListAsync, getDetailAsync, createAsync, updateAsync, deleteAsync };
}