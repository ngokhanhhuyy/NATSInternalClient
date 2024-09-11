import { useApiClient } from "./apiClient";
import type {
    ConsultantListRequestDto,
    ConsultantUpsertRequestDto } from "./dtos/requestDtos";
import type {
    ConsultantListResponseDto,
    ConsultantDetailResponseDto } from "./dtos/responseDtos";

export interface IConsultantService {
    getListAsync(requestDto?: ConsultantListRequestDto): Promise<ConsultantListResponseDto>;
    getDetailAsync(id: number): Promise<ConsultantDetailResponseDto>;
    createAsync(requestDto: ConsultantUpsertRequestDto): Promise<number>;
    updateAsync(id: number, requestDto: ConsultantUpsertRequestDto): Promise<void>;
    deleteAsync(id: number): Promise<void>;
}

export function useConsultantService(): IConsultantService {
    const apiClient = useApiClient();

    return {
        async getListAsync(
                requestDto?: ConsultantListRequestDto): Promise<ConsultantListResponseDto> {
            return apiClient.getAsync<ConsultantListResponseDto>("/consultant", requestDto);
        },

        async getDetailAsync(id: number): Promise<ConsultantDetailResponseDto> {
            return apiClient.getAsync<ConsultantDetailResponseDto>(`/consultant/${id}`);
        },

        async createAsync(requestDto: ConsultantUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("/consultant", requestDto);
        },

        async updateAsync(id: number, requestDto: ConsultantUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`/consultant/${id}`, requestDto);
        },

        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`/consultant/${id}`);
        }
    };
}