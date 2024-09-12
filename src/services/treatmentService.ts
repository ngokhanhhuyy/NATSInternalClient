import { useApiClient } from "./apiClient";
import type {
    TreatmentListRequestDto,
    TreatmentUpsertRequestDto } from "./dtos/requestDtos";
import type {
    TreatmentListResponseDto,
    TreatmentDetailResponseDto } from "./dtos/responseDtos";

export function useTreatmentService() {
    const apiClient = useApiClient();

    return {
        async getListAsync(
                requestDto?: Partial<TreatmentListRequestDto>
        ): Promise<TreatmentListResponseDto>
        {
            if (!requestDto) {
                return apiClient.getAsync<TreatmentListResponseDto>("/treatment");
            }

            return apiClient.getAsync<TreatmentListResponseDto>("/treatment", requestDto);
        },

        async getDetailAsync(id: number): Promise<TreatmentDetailResponseDto> {
            return apiClient.getAsync<TreatmentDetailResponseDto>(`/treatment/${id}`);
        },

        async createAsync(requestDto: TreatmentUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("/treatment", requestDto);
        },

        async updateAsync(
                id: number,
                requestDto: TreatmentUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`/treatment/${id}`, requestDto);
        },

        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`/treatment/${id}`);
        },
    };
}