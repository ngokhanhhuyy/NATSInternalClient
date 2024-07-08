import { useApiClient } from "./apiClient";
import type {
    OrderPaymentRequestDto } from "./dtos/requestDtos/orderPaymentRequestDtos";
import type {
    OrderPaymentCreateResponseDto, 
    OrderPaymentResponseDto} from "./dtos/responseDtos/orderPaymentResponseDtos";

export function useOrderPaymentService() {
    const apiClient = useApiClient();

    return {
        async getDetailAsync(orderId: number, id: number): Promise<OrderPaymentResponseDto> {
            return apiClient.getAsync(`/order/${orderId}/payments/${id}`);
        },

        async createAsync(
                orderId: number,
                requestDto: OrderPaymentRequestDto): Promise<OrderPaymentCreateResponseDto>
        {
            return apiClient
                .postAsync<OrderPaymentCreateResponseDto>(`/order/${orderId}/payments`, requestDto);
        },

        async updateAsync(orderId: number, paymentId: number, requestDto: OrderPaymentRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(
                `/order/${orderId}/payments/${paymentId}`,
                requestDto
            );
        },

        async deleteAsync(orderId: number, paymentId: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`/order/${orderId}/payments/${paymentId}`);
        }
    };
}