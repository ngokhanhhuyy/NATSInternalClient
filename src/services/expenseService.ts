import { useApiClient } from "./apiClient";
import type {
    ExpenseListRequestDto,
    ExpenseUpsertRequestDto } from "@/services/dtos/requestDtos/expenseRequestDtos";
import type {
    ExpenseDetailResponseDto,
    ExpenseListResponseDto } from "./dtos/responseDtos/expenseResponseDtos";

export function useExpenseService() {
    const apiClient = useApiClient();

    return {
        async getListAsync(requestDto: ExpenseListRequestDto): Promise<ExpenseListResponseDto> {
            return apiClient.getAsync<ExpenseListResponseDto>("/expense/list", requestDto);
        },

        async getDetailAsync(id: number): Promise<ExpenseDetailResponseDto> {
            return apiClient.getAsync<ExpenseDetailResponseDto>(`/expense/${id}/detail`);
        },

        async createAsync(requestDto: ExpenseUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("/expense/create", requestDto);
        },

        async updateAsync(id: number, requestDto: ExpenseUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`/expense/${id}/update`, requestDto);
        },

        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`/expense/${id}/update`);
        }
    };
}