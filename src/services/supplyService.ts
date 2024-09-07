import { useApiClient } from "./apiClient";
import type {
    SupplyListRequestDto,
    SupplyUpsertRequestDto } from "./dtos/requestDtos";
import type {
    SupplyDetailResponseDto,
    SupplyListResponseDto } from "./dtos/responseDtos";

export interface ISupplyService {
    getListAsync(): Promise<SupplyListResponseDto>;
    getListAsync(requestDto: SupplyListRequestDto): Promise<SupplyListResponseDto>;
    getListAsync(resultsPerPage: number): Promise<SupplyListResponseDto>;
    getDetailAsync(id: number): Promise<SupplyDetailResponseDto>;
    createAsync(requestDto: SupplyUpsertRequestDto): Promise<number>;
    updateAsync(id: number, requestDto: SupplyUpsertRequestDto): Promise<void>;
    deleteAsync(id: number): Promise<void>;
}

export function useSupplyService(): ISupplyService {
    const apiClient = useApiClient();

    return {
        async getListAsync(
                arg?: SupplyListRequestDto | number): Promise<SupplyListResponseDto> {
            if (arg) {
                if (typeof arg === "number") {
                    return await apiClient.getAsync<SupplyListResponseDto>("/supply", {
                        resultsPerPage: arg
                    }); 
                }
                return await apiClient.getAsync<SupplyListResponseDto>("/supply", arg);
            }
            
            return await apiClient.getAsync<SupplyListResponseDto>("/supply");

        },

        async getDetailAsync(id: number): Promise<SupplyDetailResponseDto> {
            return await apiClient.getAsync<SupplyDetailResponseDto>(`/supply/${id}`);
        },

        async createAsync(requestDto: SupplyUpsertRequestDto): Promise<number> {
            return await apiClient.postAsync<number>("/supply", requestDto);
        },

        async updateAsync(
                id: number,
                requestDto: SupplyUpsertRequestDto): Promise<void> {
            return await apiClient
                .putAndIgnoreAsync(`/supply/${id}`, requestDto);
        },

        async deleteAsync(id: number): Promise<void> {
            return await apiClient.deleteAndIgnoreAsync(`/supply/${id}`);
        }
    };
}