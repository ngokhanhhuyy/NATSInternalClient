import { useApiClient } from "./apiClient";
import type {
    DebtListRequestDto,
    DebtUpsertRequestDto } from "./dtos/requestDtos/debtRequestDtos";
import type {
    DebtListResponseDto,
    DebtDetailResponseDto } from "./dtos/responseDtos/debtResponseDtos";

export interface IDebtService {
    getListAsync(requestDto: DebtListRequestDto): Promise<DebtListResponseDto>;
    getDetailAsync(id: number): Promise<DebtDetailResponseDto>;
    createAsync(requestDto: DebtUpsertRequestDto): Promise<number>;
    updateAsync(id: number, requestDto: DebtUpsertRequestDto): Promise<void>;
    deleteAsync(id: number): Promise<void>;
}

export function useDebtService(): IDebtService {
    const apiClient = useApiClient();

    return {
        async getListAsync(requestDto: DebtListRequestDto): Promise<DebtListResponseDto> {
            return apiClient.getAsync<DebtListResponseDto>("/api/debt", requestDto);
        },

        async getDetailAsync(id: number): Promise<DebtDetailResponseDto> {
            return apiClient.getAsync<DebtDetailResponseDto>(`api/debt/${id}`);
        },

        async createAsync(requestDto: DebtUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("api/debt", requestDto);
        },

        async updateAsync(id: number, requestDto: DebtUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`api/debt/${id}`, requestDto);
        },

        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`api/debt/${id}`);
        }
    };
}