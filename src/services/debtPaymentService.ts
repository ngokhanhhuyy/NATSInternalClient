import { useApiClient } from "./apiClient";
import type {
    DebtPaymentListRequestDto,
    DebtPaymentUpsertRequestDto } from "./dtos/requestDtos/debtPaymentRequestDtos";
import type {
    DebtPaymentListResponseDto,
    DebtPaymentDetailResponseDto } from "./dtos/responseDtos/debtPaymentResponseDtos";

export interface IDebtPaymentPaymentService {
    getListAsync(requestDto: DebtPaymentListRequestDto): Promise<DebtPaymentListResponseDto>;
    getDetailAsync(id: number): Promise<DebtPaymentDetailResponseDto>;
    createAsync(requestDto: DebtPaymentUpsertRequestDto): Promise<number>;
    updateAsync(id: number, requestDto: DebtPaymentUpsertRequestDto): Promise<void>;
    deleteAsync(id: number): Promise<void>;
}

export function useDebtPaymentPaymentService(): IDebtPaymentPaymentService {
    const apiClient = useApiClient();

    return {
        async getListAsync(requestDto: DebtPaymentListRequestDto): Promise<DebtPaymentListResponseDto> {
            return apiClient.getAsync<DebtPaymentListResponseDto>("/api/debtPayment", requestDto);
        },

        async getDetailAsync(id: number): Promise<DebtPaymentDetailResponseDto> {
            return apiClient.getAsync<DebtPaymentDetailResponseDto>(`api/debtPayment/${id}`);
        },

        async createAsync(requestDto: DebtPaymentUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("api/debtPayment", requestDto);
        },

        async updateAsync(id: number, requestDto: DebtPaymentUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`api/debtPayment/${id}`, requestDto);
        },

        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`api/debtPayment/${id}`);
        }
    };
}