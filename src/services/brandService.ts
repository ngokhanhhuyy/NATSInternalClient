import { useApiClient } from "./apiClient";
import type {
    BrandListResponseDto,
    BrandDetailResponseDto } from "@/services/dtos/responseDtos/brandResponseDtos";
import type { BrandUpsertRequestDto } from "./dtos/requestDtos/brandRequestDtos";

export function useBrandService() {
    const apiClient = useApiClient();

    async function getListAsync(): Promise<BrandListResponseDto> {
        return apiClient.getAsync<BrandListResponseDto>("/brand/list");
    }

    async function getDetailAsync(id: number): Promise<BrandDetailResponseDto> {
        return await apiClient
            .getAsync<BrandDetailResponseDto>(`/brand/${id}/detail`);
    }

    async function createAsync(requestDto: BrandUpsertRequestDto): Promise<number> {
        return await apiClient
            .postAsync<number>("/brand/create", requestDto);
    }

    async function updateAsync(id: number, requestDto: BrandUpsertRequestDto): Promise<void> {
        return await apiClient
            .putAndIgnoreAsync(`/brand/${id}/update`, requestDto);
    }

    async function deleteAsync(id: number): Promise<void> {
        return await apiClient
            .deleteAndIgnoreAsync(`/brand/${id}/delete`);
    }

    return { getListAsync, getDetailAsync, createAsync, updateAsync, deleteAsync };
}