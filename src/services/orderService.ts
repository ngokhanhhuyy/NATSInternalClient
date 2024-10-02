import { useApiClient } from "./apiClient";
import type {
    OrderListRequestDto,
    OrderUpsertRequestDto } from "./dtos/requestDtos";
import type {
    OrderListResponseDto,
    OrderDetailResponseDto } from "./dtos/responseDtos";

/**
 * A service to send requests and handle responses representing the order related operations.
 *
 * @returns An object containing the methods which perform the operations.
 */
export function useOrderService() {
    const apiClient = useApiClient();

    return {
        /**
         * Retrieves a list of orders based on the specified filtering and paginating
         * conditions.
         *
         * @param requestDto An object implementing the {@link OrderListRequestDto} interface,
         * containing the filtering and paginating conditions for the results.
         * @returns A {@link Promise} representing the asynchronous operation, which resolves
         * to an object implementing the {@link OrderListResponseDto} interface, containing
         * the results and some additional information for pagination.
         * @example
         * getListAsync();
         * @example
         * getListAsync(orderListRequestDto);
         *
         * @throws {ValidationError} Throws when the specified data in the `requestDto` object
         * is invalid.
         */
        async getListAsync(requestDto?: Partial<OrderListRequestDto>):
                Promise<OrderListResponseDto> {
            if (!requestDto) {
                return apiClient.getAsync<OrderListResponseDto>("/order");
            }

            return apiClient.getAsync<OrderListResponseDto>("/order", requestDto);
        },

        /**
         * Retrieves the details of a specific order by its id.
         *
         * @param id A {@link number} representing the id of the order to retrieve.
         * @returns A {@link Promise} representing the asynchronous operation, which resolves
         * to an object implement the {@link OrderDetailResponseDto} interface, containing the
         * details of the order.
         * @example
         * getDetailAsync(1);
         *
         * @throws {NotFoundError} Throws when the order with the specified id doesn't exist
         * or has already been deleted.
         */
        async getDetailAsync(id: number): Promise<OrderDetailResponseDto> {
            return apiClient.getAsync<OrderDetailResponseDto>(`/order/${id}`);
        },

        /**
         * Creates a new order based on the specified request data.
         *
         * @param requestDto An object implementing the {@link OrderUpsertRequestDto}
         * interface, containing the data for the new order.
         * @returns A {@link Promise} representing the asynchronous operation, which result
         * is an {@link number} representing the id of the new order.
         * @example
         * createAsync(orderUpsertRequestDto);
         *
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to perform the operation.
         * @throws {OperationError} Throws when the customer with the id specified by the
         * property `customerId` in the argument for the `requestDto` parameter doesn't exist
         * or has already been deleted.
         */
        async createAsync(requestDto: OrderUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("/order", requestDto);
        },

        /**
         * Updates an existing order based on the specified request data.
         *
         * @param id A {@link number} representing the id of the order to update.
         * @param requestDto An object implementing the {@link OrderUpsertRequestDto}
         * interface, containing the data for the order to be updated.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example
         * updateAsync(1, orderUpsertRequestDto);
         *
         * @throws {NotFoundError} Throws when the order with the specified id doesn't exist
         * or has already been deleted.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to perform the operation.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws when the customer with the id specified by the
         * property `customerId` in the argument for the `requestDto` parameter doesn't exist
         * or has already been deleted.
         */
        async updateAsync(id: number, requestDto: OrderUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`/order/${id}`, requestDto);
        },

        /**
         * Delete an existing order.
         *
         * @param id A {@link number} representing the id of the order to be deleted.
         * @returns A {@link Promise} representing the asynchronous operation.
         *
         * @throws {NotFoundError} Throws when the order with the specified id doesn't exist
         * or has already been deleted.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to perform the operation.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws when the order's deletion is restricted due to the
         * existence of some related data.
         */
        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`/order/${id}`);
        },
    };
}