import { useApiClient } from "./apiClient";

/**
 * A service to send requests and handle responses which represent the supply-related
 * operations.
 *
 * @returns An object containing the methods which perform the operations.
 */
export function useSupplyService() {
    const apiClient = useApiClient();

    return {
        /**
         * Retrieves a list of supplies with the basic information, based on the specified
         * filtering, sorting and paginating conditions.
         *
         * @param requestDto (Optional) An object containing the conditions for the results.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link SupplyListResponseDto} interface, containing the
         * results and the additional information for pagination.
         * @example getListAsync();
         * @example getListAsync(supplyListRequestDto);
         *
         * @throws {ValidationError} Throws when the specified filtering conditions violates
         * some validation rules.
         */
        async getListAsync(requestDto?: RequestDtos.Supply.List):
                Promise<ResponseDtos.Supply.List> {
            if (!requestDto) {
                return await apiClient.getAsync("/supply");
            }

            return await apiClient.getAsync("/supply", requestDto);
        },

        /**
         * Retrieves the details of a specific supply, specified by the id of the supply.
         *
         * @param id A {@link number} representing the id of the retrieving supply.
         * @returns A {@link Promise} representing the asynchronous operation, which results
         * is an object implementing {@link SupplyDetailResponseDto} interface, containing the
         * details of the supply.
         *
         * @throws {NotFoundError} Throws when the supply with the specified id doesn't exist
         * or has already been deleted.
         */
        async getDetailAsync(id: number): Promise<ResponseDtos.Supply.Detail> {
            return await apiClient.getAsync(`/supply/${id}`);
        },

        /**
         * Creates a new supply with the specified data.
         *
         * @param requestDto An object implementing {@link SupplyUpsertRequestDto}, containing
         * the data for a new supply.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * a {@link number} representing the id of the new supply.
         * @example createAsync(supplyUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the specified data violates some of the
         * validation rules.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to perform the operation.
         * @throws {OperationError} Throws when the product with the id specified by property
         * `productId` in the provided data object doesn't exist or has already been deleted.
         */
        async createAsync(requestDto: RequestDtos.Supply.Upsert): Promise<number> {
            return await apiClient.postAsync("/supply", requestDto);
        },

        /**
         * Update the supply which has the specified id.
         *
         * @param id - A {@link number} representing the id of the supply to update.
         * @param requestDto - An object implementing {@link SupplyUpsertRequestDto} interface,
         * containing the updated data for the supply.
         * @returns A {@link Promise} instance representing the asynchronous operation.
         * @example updateAsync(1, supplyUpsertRequestDto);
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
                requestDto: RequestDtos.Supply.Upsert): Promise<void> {
            return await apiClient.putAndIgnoreAsync(`/supply/${id}`, requestDto);
        },

        /**
         * Delete the supply which has the specified id.
         *
         * @param id A {@link number} representing the id of the supply.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example deleteAsync(id);
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