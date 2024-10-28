import { useApiClient } from "./apiClient";

/**
 * A service to send requests and handle responses which represent the consultant-related
 * operations.
 *
 */
export function useConsultantService() {
    const apiClient = useApiClient();

    return {
        /**
         * Retrieves a list of consultants with the basic information, based on the specified
         * filtering, sorting and paginating conditions.
         *
         * @param requestDto (Optional) An object which is a {@link Partial} implementation of
         * the {@link ConsultantListRequestDto} interface, containing the conditions for the
         * results.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link ConsultantListRequestDto} interface, containing
         * the results.
         * @example getListAsync();
         * @example getListAsync(consultantListRequestDto);
         */
        async getListAsync(requestDto?: Partial<ConsultantListRequestDto>):
                Promise<ConsultantListResponseDto> {
            if (!requestDto) {
                return apiClient.getAsync<ConsultantListResponseDto>("/consultant");
            }

            return apiClient.getAsync<ConsultantListResponseDto>("/consultant", requestDto);
        },

        /**
         * Retrieves the details of a specific consultant, specified by the id of the
         * consultant.
         *
         * @param id A {@link number} representing the id of the consultant to retrieve.
         * @returns A {@link Promise} representing the asynchronous operation, which result
         * is an object implementing the {@link ConsultantDetailResponseDto} interface,
         * containing the details of the consultant.
         */
        async getDetailAsync(id: number): Promise<ConsultantDetailResponseDto> {
            return apiClient.getAsync<ConsultantDetailResponseDto>(`/consultant/${id}`);
        },

        /**
         * Creates a new consultant with the specified data.
         *
         * @param requestDto An object implementing the {@link ConsultantUpsertRequestDto},
         * containing the data for the operation.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * a {@link number} representing the id of the new consultant.
         * @example createAsync(consultantUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified in the `requestDto`
         * argument is invalid.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to create a new consultant or to specify a value for the property
         * `paidDateTime` in the `requestDto` argument.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws when the requesting user has been deleted before
         * the operation.
         * @throws {OperationError} Throws when the customer with the id specified by the
         * value of the property `customerId` in the `requestDto` argument doesn't exist or
         * has already been deleted.
         */
        async createAsync(requestDto: ConsultantUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("/consultant", requestDto);
        },

        /**
         * Updates an existing consultant with the specified data.
         *
         * @param id A {@link number} representing the id of the consultant.
         * @param requestDto An object implementing the {@link ConsultantUpsertRequestDto}
         * interface, containing the data for the updating operation.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example updateAsync(1, consultantUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified in the `requestDto`
         * argument is invalid.
         * @throws {NotFoundError} Throws when the consultant with the specified id doesn't
         * exist or has already been deleted.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to create a new consultant or to specify a value for the property
         * `paidDateTime` in the `requestDto` argument.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws when the value for the `paidDateTime` property in
         * the `requestDto` argument is specified when the consultant has already been locked.
         * @throws {OperationError} Throws when the requesting user has been deleted before
         * the operation.
         * @throws {OperationError} Throws when the customer with the id specified by the
         * value of the property `customerId` in the `requestDto` argument doesn't exist or
         * has already been deleted.
         */
        async updateAsync(id: number, requestDto: ConsultantUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`/consultant/${id}`, requestDto);
        },

        /**
         * Deletes an existing consultant by its id.
         *
         * @param id A {@link number} representing the id of the consultant.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example deleteAsync(1);
         *
         * @throws {NotFoundError} Throws when the consultant with the specified id doesn't
         * exist or has already been deleted.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws when the consultant's deletion is restricted due to
         * the existence of some related data.
         */
        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`/consultant/${id}`);
        }
    };
}