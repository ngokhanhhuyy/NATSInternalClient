import { useApiClient } from "./apiClient";
import type {
    DebtIncurrenceListRequestDto,
    DebtIncurrenceUpsertRequestDto } from "./dtos/requestDtos";
import type {
    DebtIncurrenceListResponseDto,
    DebtIncurrenceDetailResponseDto } from "./dtos/responseDtos";

/**
 * A service to send the requests and handle the responses representing the operations which
 * are related to customer debt incurrence.
 *
 * @returns An object containing the methods to perform the operations.
 */
export function useDebtIncurrenceService() {
    const apiClient = useApiClient();
    return {
        /**
         * Retrieves a list of debt incurrences with the basic information, based on the
         * specified filtering, sorting and paginating conditions.
         * 
         * @param requestDto (Optional) An object which is a {@link Partial} implementation of
         * the {@link DebtIncurrenceListRequestDto} interface, containing the conditions for
         * the results.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link DebtIncurrenceListResponseDto} interface,
         * containing the results and the additional information for pagination.
         * @example getListAsync();
         * @example getListAsync(debtIncurrenceListRequestDto);
         * 
         * @throws {ValidationError} Throws when the data specified in the `requestDto`
         * argument is invalid.
         */
        async getListAsync(requestDto?: Partial<DebtIncurrenceListRequestDto>):
                Promise<DebtIncurrenceListResponseDto>
        {
            if (!requestDto) {
                return apiClient.getAsync<DebtIncurrenceListResponseDto>("/debtIncurrence");
            }
            return apiClient
                .getAsync<DebtIncurrenceListResponseDto>("/debtIncurrence", requestDto);
        },

        /**
         * Retrieves the details of a specific debt incurrence by its id.
         *
         * @param id A {@link number} representing the id of the debt incurrence to retrieve.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link DebtIncurrenceDetailResponseDto} interface,
         * containing the details of the debt incurrence.
         * @example getDetailAsync(1);
         *
         * @throws {NotFoundError} Throws when the debt incurrence specified by the `id`
         * argument doesn't exist or has already been deleted.
         */
        async getDetailAsync(id: number): Promise<DebtIncurrenceDetailResponseDto> {
            return apiClient
                .getAsync<DebtIncurrenceDetailResponseDto>(`/debtIncurrence/${id}`);
        },

        /**
         * Creates a new debt incurrence based on the specified data.
         *
         * @param requestDto An object implementing the {@link DebtIncurrenceUpsertRequestDto}
         * interface, containing the data for the creating operation.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * a {@link number} representing the id of the new debt incurrence.
         * @example createAsync(debtIncurrenceUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified by the `requestDto`
         * argument is invalid.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to specify a value for the `incurredDateTime` property in the
         * `requestDto` argument.
         * @throws {ConcurrencyError} Throws when the information of the requesting user has
         * been deleted before the operation.
         * @throws {OperationError} Throws when the customer which has the id specified by the
         * value of the `customerId` property in the `requestDto` argument doesn't exist or has
         * already been deleted.
         */
        async createAsync(requestDto: DebtIncurrenceUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("/debtIncurrence", requestDto);
        },

        /**
         * Updates an existing debt incurrence, based on the id of the customer to which it
         * belongs, its id and the specified data.
         *
         * @param id A {@link number} representing the id of the debt incurrence to update.
         * @param requestDto An object implementing the {@link DebtIncurrenceUpsertRequestDto}
         * interface, containing the data for the updating operation.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example updateAsync(1, debtIncurrenceUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified by the `requestDto`
         * argument is invalid.
         * @throws {NotFoundError} Throws when the debt incurrence with the id specified by
         * the `id` argument doesn't exist or has already been deleted.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to specify a value for the `incurredDateTime` property in the
         * `requestDto` argument.
         * @throws {ConcurrencyError} Throws under the following circumstances:
         * - When the information of the requesting user has been deleted before the operation.
         * - When the debt incurrence information has been modified before the operation.
         * @throws {OperationError} Throws under the following circumstances:
         * - When the `incurredDateTime` property in the `requestDto` argument is specified a
         * value while the debt incurrence has already been locked.
         * - When the remaining debt amount of the specified customer becomes negative after
         * the operation.
         */
        async updateAsync(
                id: number,
                requestDto: DebtIncurrenceUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`/debtIncurrence/${id}`, requestDto);
        },

        /**
         * Deletes an existing debt incurrence based on its id.
         *
         * @param id A {@link number} representing the id of the debt incurrence to delete.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example deleteAsync(1);
         *
         * @throws {NotFoundError} Throws when the debt incurrence specified by the
         * `id` argument doesn't exist or has already been deleted.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to delete the specified debt incurrence.
         * @throws {ConcurrencyError} Throws under the following circumstances:
         * - When the information of the requesting user has been deleted before the operation.
         * - When the debt incurrence has been modified before the operation.
         * @throws {OperationError} Throws when the remaining debt amount of the specified
         * customer becomes negative after the operation.
         */
        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`/debtIncurrence/${id}`);
        }
    };
}