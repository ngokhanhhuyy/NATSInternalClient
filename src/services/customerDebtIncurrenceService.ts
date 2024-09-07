import { useApiClient } from "./apiClient";
import type { DebtIncurrenceUpsertRequestDto } from "./dtos/requestDtos";
import type { DebtIncurrenceDetailResponseDto } from "./dtos/responseDtos";

export interface ICustomerDebtIncurrenceService {
    getDetailAsync(
        customerId: number,
        debtPaymentId: number): Promise<DebtIncurrenceDetailResponseDto>;
    createAsync(
        customerId: number,
        requestDto: DebtIncurrenceUpsertRequestDto): Promise<number>;
    updateAsync(
        customerId: number,
        debtId: number,
        requestDto: DebtIncurrenceUpsertRequestDto): Promise<void>;
    deleteAsync(
        customerId: number,
        debtId: number): Promise<void>;
}

export function useCustomerDebtIncurrenceService(): ICustomerDebtIncurrenceService {
    const apiClient = useApiClient();

    return {
        async getDetailAsync(
                customerId: number,
                debtId: number): Promise<DebtIncurrenceDetailResponseDto> {
            return apiClient
                .getAsync<DebtIncurrenceDetailResponseDto>(
                    `customer/${customerId}/debtIncurrence/${debtId}`);
        },

        async createAsync(
                customerId: number, 
                requestDto: DebtIncurrenceUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>(
                `/customer/${customerId}/debtIncurrence`,
                requestDto);
        },

        async updateAsync(
                customerId: number,
                debtId: number,
                requestDto: DebtIncurrenceUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(
                `/customer/${customerId}/debtIncurrence/${debtId}`,
                requestDto);
        },

        async deleteAsync(
                customerId: number,
                debtId: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(
                `/customer/${customerId}/debtIncurrence/${debtId}`);
        }
    };
}