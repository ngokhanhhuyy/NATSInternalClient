import { useApiClient } from "./apiClient";
import type {
    SupplyListRequestDto,
    SupplyUpsertRequestDto } from "./dtos/requestDtos";
import type {
    SupplyDetailResponseDto,
    SupplyListResponseDto } from "./dtos/responseDtos";

export function useSupplyService() {
    const apiClient = useApiClient();

    return {
        /**
         * Get a list of supplies, with the filters and conditions for the results specified
         * in the `requestDto`.
         * 
         * @param requestDto An object implementing `Partial<SupplyListRequestDto>` type,
         * containing the values for the filters and conditions for the results.
         * @returns PromiseA `Promise` which resolves to an object implementing
         * `SupplyListResponseDto`, containing the results and some additional information
         * for pagination.
         * 
         * @throws `ValidationError` Throws when the specified filtering conditions violates
         * some validation rules.
         */
        async getListAsync(
                requestDto: Partial<SupplyListRequestDto>): Promise<SupplyListResponseDto> {
            if (!requestDto) {
                return await apiClient.getAsync<SupplyListResponseDto>("/supply");
            }
            
            return await apiClient.getAsync<SupplyListResponseDto>("/supply", requestDto);
        },

        /**
         * Gets the detail information of the supply with specified id.
         * 
         * @param id A `number` representing the id of the retrieving supply.
         * @returns A `Promise` which resolves to an object implementing
         * `SupplyDetailResponseDto` interface, containing the detail information of the
         * retrieving supply.
         * 
         * @throws {NotFoundError} Throws when the supply with the specified id doesn't exist.
         */
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