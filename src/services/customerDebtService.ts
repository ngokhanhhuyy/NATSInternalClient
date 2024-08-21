import { useApiClient } from "./apiClient";
import type { DebtUpsertRequestDto } from "./dtos/requestDtos";
import type { DebtDetailResponseDto } from "./dtos/responseDtos";

export interface ICustomerDebtService {
    getDetailAsync(
        customerId: number,
        debtPaymentId: number): Promise<DebtDetailResponseDto>;
    createAsync(
        customerId: number,
        requestDto: DebtUpsertRequestDto): Promise<number>;
    updateAsync(
        customerId: number,
        debtId: number,
        requestDto: DebtUpsertRequestDto): Promise<void>;
    deleteAsync(
        customerId: number,
        debtId: number): Promise<void>;
}

export function useCustomerDebtService(): ICustomerDebtService {
    const apiClient = useApiClient();

    return {
        async getDetailAsync(customerId: number, debtId: number): Promise<DebtDetailResponseDto> {
            return apiClient
                .getAsync<DebtDetailResponseDto>(`customer/${customerId}/debt/${debtId}`);
        },

        async createAsync(
                customerId: number, 
                requestDto: DebtUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>(
                `/customer/${customerId}/debt`,
                requestDto);
        },

        async updateAsync(
                customerId: number,
                debtId: number,
                requestDto: DebtUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(
                `/customer/${customerId}/debt/${debtId}`,
                requestDto);
        },

        async deleteAsync(
                customerId: number,
                debtId: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(
                `/customer/${customerId}/debt/${debtId}`);
        }
    };
}