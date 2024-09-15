import { useApiClient } from "./apiClient";
import type { DebtIncurrenceUpsertRequestDto } from "./dtos/requestDtos";
import type { DebtIncurrenceDetailResponseDto } from "./dtos/responseDtos";

/**
 * A service to send the requests and handle the responses representing the operations which
 * is related to customer debt incurrence.
 *
 * @returns An object containing the methods to perform the operations.
 */
export function useCustomerDebtIncurrenceService() {
    const apiClient = useApiClient();

    return {
        /**
         * Retrieves the details of a specific debt incurrence by its id.
         *
         * @param customerId A {@link number} representing the id of the customer to which the
         * debt incurrence belongs.
         * @param debtIncurrenceId A {@link number} representing the id of the debt incurrence
         * to retrieve.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link DebtIncurrenceDetailResponseDto} interface,
         * containing the details of the debt incurrence.
         * @example getDetailAsync(1);
         *
         * @throws {NotFoundError} Throws when the debt incurrence specified by the
         * `customerId` and `debtIncurrenceId` arguments doesn't exist or has already been
         * deleted.
         */
        async getDetailAsync(customerId: number, debtIncurrenceId: number):
                Promise<DebtIncurrenceDetailResponseDto> {
            return apiClient.getAsync<DebtIncurrenceDetailResponseDto>(
                `customer/${customerId}/debtIncurrence/${debtIncurrenceId}`);
        },

        /**
         * Creates a new debt incurrence for a specific customer, specified by the customer id
         * and its id.
         *
         * @param customerId A {@link Promise} representing the id of the customer to which the
         * debt incurrence belongs.
         * @param requestDto An object implementing the {@link DebtIncurrenceUpsertRequestDto}
         * interface, containing the data for the creating operation.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * a {@link number} representing the id of the new debt incurrence.
         * @example createAsync(1, debtIncurrenceUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified by the `requestDto`
         * argument is invalid.
         * @throws {NotFoundError} Throws when the customer which has the id specified by the
         * value of the `customerId` argument doesn't exist or has already been deleted.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to specify a value for the `incurredDateTime` property in the
         * `requestDto` argument.
         * @throws {ConcurrencyError} Throws when the information of the requesting user has
         * been deleted before the operation.
         */
        async createAsync(
                customerId: number, 
                requestDto: DebtIncurrenceUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>(
                `/customer/${customerId}/debtIncurrence`,
                requestDto);
        },

        /**
         * Updates an existing debt incurrence, based on the id of the customer to which it
         * belongs, its id and the specified data.
         *
         * @param customerId A {@link number} representing the id of the customer to which the
         * updating debt incurrence belongs.
         * @param debtIncurrenceId A {@link number} representing the id of the debt incurrence
         * to update.
         * @param requestDto An object implementing the {@link DebtIncurrenceUpsertRequestDto}
         * interface, containing the data for the updating operation.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example updateAsync(1, 2, debtIncurrenceUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified by the `requestDto`
         * argument is invalid.
         * @throws {NotFoundError} Throws when the customer which has the id specified by the
         * value of the `customerId` argument doesn't exist or has already been deleted.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to specify a value for the `incurredDateTime` property in the
         * `requestDto` argument.
         * @throws {ConcurrencyError} Throws under the following circumstances:
         * - When the information of the requesting user has been deleted before the operation.
         * - When the debt incurrence information has been modified before the operation.
         * @throws {OperationError} Throws under the following circumstances:
         * - The `incurredDateTime` property in the `requestDto` argument is specified a value
         * when the debt incurrence has already been locked.
         * - The remaining debt amount of the specified customer becomes negative after the
         * operation.
         */
        async updateAsync(
                customerId: number,
                debtIncurrenceId: number,
                requestDto: DebtIncurrenceUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(
                `/customer/${customerId}/debtIncurrence/${debtIncurrenceId}`,
                requestDto);
        },

        /**
         * Deletes an existing debt incurrence based on its id.
         *
         * @param customerId A {@link number} representing the id of the customer to which the
         * deleting debt incurrence belongs.
         * @param debtIncurrenceId A {@link number} representing the id of the debt incurrence to delete.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example deleteAsync(1, 2);
         *
         * @throws {NotFoundError} Throws when the customer specified by the `customerId`
         * argument, or the debt incurrence specified by the `debtIncurrenceId` argument
         * doesn't exist or has already been deleted.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to delete the specified debt incurrence.
         * @throws {ConcurrencyError} Throws under the following circumstances:
         * - When the information of the requesting user has been deleted before the operation.
         * - When the debt incurrence has been modified before the operation.
         * @throws {OperationError} Throws when the remaining debt amount of the specified
         * customer becomes negative after the operation.
         */
        async deleteAsync(customerId: number, debtIncurrenceId: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(
                `/customer/${customerId}/debtIncurrence/${debtIncurrenceId}`);
        }
    };
}