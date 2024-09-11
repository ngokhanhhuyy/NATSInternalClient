import { useApiClient } from "./apiClient";
import type {
    OrderListRequestDto,
    OrderUpsertRequestDto } from "./dtos/requestDtos";
import type {
    OrderListResponseDto,
    OrderDetailResponseDto } from "./dtos/responseDtos";

export interface IOrderService {
    getListAsync(): Promise<OrderListResponseDto>;
    getListAsync(requestDto: OrderListRequestDto): Promise<OrderListResponseDto>;
    getListAsync(resultsPerPage: number): Promise<OrderListResponseDto>;
    getDetailAsync(id: number): Promise<OrderDetailResponseDto>;
    createAsync(requestDto: OrderUpsertRequestDto): Promise<number>;
    updateAsync(id: number, requestDto: OrderUpsertRequestDto): Promise<void>;
    deleteAsync(id: number): Promise<void>;
}

export function useOrderService(): IOrderService {
    const apiClient = useApiClient();

    return {
        async getListAsync(arg?: number | OrderListRequestDto): Promise<OrderListResponseDto> {
            if (arg != null) {
                if (typeof arg === "number") {
                    return apiClient.getAsync<OrderListResponseDto>("/order", {
                        resultsPerPage: arg
                    });
                }
    
                return apiClient.getAsync<OrderListResponseDto>("/order", arg);
            }

            return apiClient.getAsync<OrderListResponseDto>("/order");
        },

        async getDetailAsync(id: number): Promise<OrderDetailResponseDto> {
            return apiClient.getAsync<OrderDetailResponseDto>(`/order/${id}`);
        },

        async createAsync(requestDto: OrderUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("/order", requestDto);
        },

        async updateAsync(id: number, requestDto: OrderUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`/order/${id}`, requestDto);
        },

        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`/order/${id}`);
        },
    };
}