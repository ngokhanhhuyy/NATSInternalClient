import { useApiClient } from "./apiClient";
import type { DebtPaymentUpsertRequestDto } from "./dtos/requestDtos";
import type { DebtPaymentDetailResponseDto } from "./dtos/responseDtos";

/**
 * A service to send the requests and handle the responses representing the operations which
 * are related to customer debt payment.
 *
 * @returns An object containing the methods which are to perform the operations.
 */
export function useCustomerDebtPaymentPaymentService() {
    const apiClient = useApiClient();

    return {
        /**
         * Retrieves the details of a specific debt payment by its id.
         *
         * @param customerId A {@link number} representing the id of the customer to which the
         * debt payment belongs.
         * @param debtPaymentId A {@link number} representing the id of the debt payment to
         * retrieve.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link DebtPaymentDetailResponseDto} interface,
         * containing the details of the debt payment.
         * @example getDetailAsync(1, 2);
         *
         * @throws {NotFoundError} Throws when the debt payment, specified by the `customerId`
         * and the `debtPaymentId` arguments, doesn't exist or has already been deleted.
         */
        async getDetailAsync(
                customerId: number,
                debtPaymentId): Promise<DebtPaymentDetailResponseDto> {
            return apiClient.getAsync<DebtPaymentDetailResponseDto>(
                `/customer/${customerId}/debtPayment/${debtPaymentId}`);
        },

        /**
         * Creates a new debt payment for a specific customer, specified by the id of the
         * customer and the provided data.
         *
         * @param customerId A {@link number} representing the id of the customer to which the
         * new debt payment belongs.
         * @param requestDto An object implementing the {@link DebtPaymentUpsertRequestDto}
         * interface, containing the data for the creating operation.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * a {@link number} representing the id of the new debt payment.
         * @example createAsync(1, debtPaymentUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified in the `requestDto`
         * argument is invalid.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to specify a value for the `paidDateTime` property in the `requestDto`
         * argument.
         * @throws {ConcurrencyError} Throws when the information of the requesting user has
         * already been deleted before the operation.
         * @throws {OperationError} Throws under the following circumstances:
         * - The customer specified by the `customerId` argument doesn't exist or has already
         * been deleted.
         * - The remaining debt amount of the specified customer becomes negative after the
         * operation.
         */
        async createAsync(
                customerId: number,
                requestDto: DebtPaymentUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>(
                `/customer/${customerId}/debtPayment`, requestDto);
        },

        /**
         * Updates an existing debt payment, based on the id of the customer to which it
         * belongs, its id and the provided data.
         *
         * @param customerId A {@link number} representing the id of the customer to which the
         * updating debt payment belongs.
         * @param debtPaymentId A {@link number} representing the id of the debt payment to
         * update.
         * @param requestDto An object implementing the {@link DebtPaymentUpsertRequestDto}
         * interface, containing the data for the updating operation.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example updateAsync(1, 2, debtPaymentUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified in the `requestDto`
         * argument is invalid.
         * @throws {NotFoundError} Throws when the debt payment specified by the `customerId`
         * and the `debtPaymentId` argument doesn't exist.
         * @throws {AuthorizationError} Throws under the specific circumstances:
         * - When the requesting user doesn't have enough permissions to update the debt
         * payment.
         * - When the requesting user can update the debt payment, but doesn't have enough
         * permissions to specify a value for the `paidDateTime` property in the `requestDto`
         * argument.
         * @throws {OperationError} Throws under the following circumstances:
         * - When the `paidDateTime` property in the `requestDto` argument is specified a value
         * while the debt payment has already been locked.
         * - When the remaining debt amount of the specified customer becomes negative after
         * the operation.
         * @throws {ConcurrencyError} Throws under the following circumstances:
         * - When the debt payment has been modified by another process before the operation.
         * - When the information of the requesting user has been deleted by another process
         * before the operation.
         */
        async updateAsync(
                customerId: number,
                debtPaymentId: number,
                requestDto: DebtPaymentUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(
                `customer/customerId/${customerId}/debtPayment/${debtPaymentId}`,
                requestDto);
        },

        /**
         * Deletes an existing debt payment, specified by its id.
         *
         * @param customerId A {@link number} representing the id of the customer to which the
         * deleting debt payment belongs.
         * @param debtPaymentId A {@link number} representing the id of the debt payment to
         * delete.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example deleteAsync(1, 2);
         *
         * @throws {NotFoundError} Throws when the debt payment specified by the `customerId`
         * and the `debtPaymentId` argument doesn't exist.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to delete the specified debt payment.
         * @throws {OperationError} Throws under the following circumstances:
         * - When the debt payment is locked.
         * - When the specified customer's remaining debt amount becomes negative after the
         * operation.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         */
        async deleteAsync(
                customerId: number,
                debtPaymentId: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(
                `/customerId/${customerId}/debtPayment/${debtPaymentId}`);
        }
    };
}