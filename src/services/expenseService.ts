import { useApiClient } from "./apiClient";

/**
 * A service to send the requests and handle the responses representing the expense-related
 * operations.
 *
 * @returns An object containing the methods to perform the operations.
 */
export function useExpenseService() {
    const apiClient = useApiClient();

    return {
        /**
         * Retrieves a list of expenses with the basic information, based on the specified
         * filtering, sorting and paginating conditions.
         *
         * @param requestDto An object which is a {@link Partial} implementation of the
         * {@link ExpenseListRequestDto} interface, containing the conditions for the results.
         * @returns A {@link Promise} representing the asynchronous operation, which result
         * is an object implementing the {@link ExpenseListResponseDto} interface, containing
         * the results and the additional information for the pagination.
         * @example
         * getListAsync(expenseListRequestDto);
         *
         * @throws {ValidationError} Throws when the values for the conditions specified in
         * the `requestDto` is invalid.
         */
        async getListAsync(requestDto?: Partial<ExpenseListRequestDto>):
                Promise<ExpenseListResponseDto> {
            return apiClient.getAsync<ExpenseListResponseDto>("/expense", requestDto);
        },

        /**
         * Retrieves the details of a specific expense, based on the specified id.
         *
         * @param id A {@link number} representing the id of the expense to retrieve.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link ExpenseDetailResponseDto} interface, containing
         * the details of the expense.
         * @example
         * getDetailAsync(1);
         *
         * @throws {NotFoundError} Throws when the expense with the specified id doesn't
         * exist or has already been deleted.
         */
        async getDetailAsync(id: number): Promise<ExpenseDetailResponseDto> {
            return apiClient.getAsync<ExpenseDetailResponseDto>(`/expense/${id}`);
        },

        /**
         * Creates a new expense with the specified data.
         *
         * @param requestDto An object implementing the {@link ExpenseUpsertRequestDto}
         * interface, containing the data for the new expense.
         * @returns A {@link number} representing the asynchronous operation, which result is
         * a {@link number} representing the id of the created expense.
         * @example
         * createAsync(expenseUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the provided data in the argument for the
         * `requestDto` parameter is invalid.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {AuthorizationError} Throws when the value for the `paidDateTime` property
         * has been provided in the `requestDto`, but the requesting user doesn't have enough
         * permissions to do so.
         * @throws {OperationError} Throws when a requesting-user-related conflict or a
         * payee-related conflict occurs during the operation.
         */
        async createAsync(requestDto: ExpenseUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("/expense", requestDto);
        },

        /**
         * Updates an existing expense with the specified data.
         *
         * @param id The id of the expense to update.
         * @param requestDto An object implementing the {@link ExpenseUpsertRequestDto}
         * interface, containing the data for the expense to be updated.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example
         * updateAsync(1, expenseUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the provided data in the argument for the
         * `requestDto` parameter is invalid.
         * @throws {NotFoundError} Throws when the expense with the specified id doesn't exist
         * or has already been deleted.
         * @throws {AuthorizationError} Throws when the value for the `paidDateTime` property
         * has been provided in the `requestDto`, but the requesting user doesn't have enough
         * permissions to do so.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws when a requesting-user-related conflict or a
         * payee-related conflict occurs during the operation.
         */
        async updateAsync(id: number, requestDto: ExpenseUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`/expense/${id}`, requestDto);
        },

        /**
         * Deletes an existing expense with the specified data.
         *
         * @param id The id of the expense to delete.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example
         * deleteAsync(1);
         *
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to perform the operation.
         * @throws {NotFoundError} Throws when the expense with the specified id doesn't exist
         * or has already been deleted.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws when the expense's deletion is restricted due to
         * the existence of some related data.
         */
        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`/expense/${id}`);
        }
    };
}