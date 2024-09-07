import { useApiClient } from "./apiClient";
import type {
    ExpenseListRequestDto,
    ExpenseUpsertRequestDto } from "@/services/dtos/requestDtos";
import type {
    ExpenseDetailResponseDto,
    ExpenseListResponseDto } from "./dtos/responseDtos";

export function useExpenseService() {
    const apiClient = useApiClient();

    return {
        async getListAsync(requestDto?: ExpenseListRequestDto): Promise<ExpenseListResponseDto> {
            return apiClient.getAsync<ExpenseListResponseDto>("/expense", requestDto);
        },

        async getDetailAsync(id: number): Promise<ExpenseDetailResponseDto> {
            return apiClient.getAsync<ExpenseDetailResponseDto>(`/expense/${id}`);
        },

        async createAsync(requestDto: ExpenseUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("/expense", requestDto);
        },

        async updateAsync(id: number, requestDto: ExpenseUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`/expense/${id}`, requestDto);
        },

        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`/expense/${id}`);
        }
    };
}