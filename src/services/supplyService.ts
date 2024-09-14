import { useApiClient } from "./apiClient";
import type {
    SupplyListRequestDto,
    SupplyUpsertRequestDto } from "./dtos/requestDtos";
import type {
    SupplyDetailResponseDto,
    SupplyListResponseDto } from "./dtos/responseDtos";

/**
 * A service to send requests and handle responses related to supplies.
 */
export function useSupplyService() {
    const apiClient = useApiClient();

    return {
        /**
         * Gets a list of supplies, with the filters and conditions for the results specified
         * in the `requestDto`.
         *
         * @param requestDto (Optional) An object implementing `Partial<SupplyListRequestDto>`
         * type, containing the values for the filters and conditions for the results.
         * @returns A {@link Promise} which resolves to an object implementing the
         * {@link SupplyListResponseDto}, containing the results and some additional
         * information for pagination.
         *
         * @throws {ValidationError} Throws when the specified filtering conditions violates
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
         * Gets the detailed information of the supply with specified id.
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

        /**
         * Creates a new supply with the specified data.
         *
         * @param requestDto An object implementing {@link SupplyUpsertRequestDto} containing
         * the data for a new supply.
         * @returns A {@link Promise} which resolves to a number representing the id of the
         * created supply.
         *
         * @throws {ValidationError} Throws when the specified data violates some of the
         * validation rules.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to perform the operation.
         * @throws {OperationError} Throws when the product with the id specified by property
         * `productId` in the provided data object doesn't exist or has already been deleted.
         */
        async createAsync(requestDto: SupplyUpsertRequestDto): Promise<number> {
            return await apiClient.postAsync<number>("/supply", requestDto);
        },

        /**
         * Update the supply which has the specified id.
         *
         * @param id - A {@link number} representing the id of the supply to update.
         * @param requestDto - An object implementing {@link SupplyUpsertRequestDto} interface,
         * containing the updated data for the supply.
         * @returns A {@link Promise} instance representing the asynchronous operation.
         *
         * @throws {ValidationError} Throws when the specified data violates some of the
         * validation rules.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permission to perform the operation.
         * @throws {NotFoundError} Throws when the supply which has the specified id doesn't
         * exist.
         * @throws {ConcurrencyError} Throws when there is concurrency related conflict during
         * the operation.
         * @throws {OperationError} Throws when the product with the id specified by property
         * `productId` in the provided data object doesn't exist or has already been deleted.
         */
        async updateAsync(
                id: number,
                requestDto: SupplyUpsertRequestDto): Promise<void> {
            return await apiClient
                .putAndIgnoreAsync(`/supply/${id}`, requestDto);
        },

        /**
         * Delete the supply which has the specified id.
         *
         * @param id A {@link number} representing the id of the supply.
         * @returns A {@link Promise} representing the asynchronous operation.
         *
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to perform the operation.
         * @throws {NotFoundError} Throws when the supply which has the specified id doesn't
         * exist.
         * @throws {ConcurrencyError} Throws when there is concurrency related conflict during
         * the operation.
         * @throws {OperationError} Throws when the supply deletion is restricted due to the
         * existence of some related data.
         */
        async deleteAsync(id: number): Promise<void> {
            return await apiClient.deleteAndIgnoreAsync(`/supply/${id}`);
        }
    };
}