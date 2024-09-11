import { useApiClient } from "./apiClient";
import type { DebtPaymentUpsertRequestDto } from "./dtos/requestDtos";
import type { DebtPaymentDetailResponseDto } from "./dtos/responseDtos";

export interface ICustomerDebtPaymentPaymentService {
    getDetailAsync(
        customerId: number,
        debtPaymentId: number): Promise<DebtPaymentDetailResponseDto>;
    createAsync(
        customerId: number,
        requestDto: DebtPaymentUpsertRequestDto): Promise<number>;
    updateAsync(
        customerId: number,
        debtPaymentId: number,
        requestDto: DebtPaymentUpsertRequestDto): Promise<void>;
    deleteAsync(
        customerId: number,
        debtPaymentId: number): Promise<void>;
}

export function useCustomerDebtPaymentPaymentService(): ICustomerDebtPaymentPaymentService {
    const apiClient = useApiClient();

    return {
        async getDetailAsync(
                customerId: number,
                debtPaymentId): Promise<DebtPaymentDetailResponseDto> {
            return apiClient.getAsync<DebtPaymentDetailResponseDto>(
                `/customer/${customerId}/debtPayment/${debtPaymentId}`);
        },

        async createAsync(
                customerId: number,
                requestDto: DebtPaymentUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>(
                `/customer/${customerId}/debtPayment`, requestDto);
        },

        async updateAsync(
                customerId: number,
                debtPaymentId: number,
                requestDto: DebtPaymentUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(
                `customer/customerId/${customerId}/debtPayment/${debtPaymentId}`,
                requestDto);
        },

        async deleteAsync(
                customerId: number,
                debtPaymentId: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(
                `/customerId/${customerId}/debtPayment/${debtPaymentId}`);
        }
    };
}