import { useApiClient } from "./apiClient";

/**
 * A service to send requests and handle responses which are related to treatment operations.
 *
 * @returns An object containing the methods which perform the operations.
 */
export function useTreatmentService() {
    const apiClient = useApiClient();

    return {
        /**
         * Retrieves a list of treatments based on the specified filtering and paginating
         * conditions.
         *
         * @param requestDto (Optional) An object which is a {@link Partial} implementation
         * of the {@link TreatmentListRequestDto} interface, containing the filtering and
         * paginating conditions for the results.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link TreatmentListResponseDto} interface, containing
         * the results and some of the additional information for pagination.
         * @example
         * getListAsync();
         * @example
         * getListAsync(treatmentListRequestDto);
         *
         * @throws {ValidationError} Throws when the specified data is invalid.
         */
        async getListAsync(requestDto?: Partial<TreatmentListRequestDto>):
                Promise<TreatmentListResponseDto>
        {
            if (!requestDto) {
                return apiClient.getAsync<TreatmentListResponseDto>("/treatment");
            }

            return apiClient.getAsync<TreatmentListResponseDto>("/treatment", requestDto);
        },

        /**
         * Retrieves the details of the treatment with the specified id.
         *
         * @param id A {@link number} representing the id of the treatment to be retrieved.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link TreatmentDetailResponseDto} interface, containing
         * the details of the treatment.
         * @example
         * getDetailAsync(1);
         *
         * @throws {NotFoundError} Throws when the treatment which has the specified id
         * doesn't exist or has already been deleted.
         */
        async getDetailAsync(id: number): Promise<TreatmentDetailResponseDto> {
            return apiClient.getAsync<TreatmentDetailResponseDto>(`/treatment/${id}`);
        },

        /**
         * Creates a new treatment with the specified data.
         *
         * @param requestDto An object implementing the {@link TreatmentUpsertRequestDto}
         * interface, containing the data for a new treatment.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * a {@link number} representing the id of the new treatment.
         *
         * @throws {ValidationError} Throws when the specified data violates validation
         * errors.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to perform the operation.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws when the customer with the id specified by the
         * value of the property `customerId` or the user with the id specified by the value
         * of the property `TherapistId` in the argument for the `requestDto` parameter
         * doesn't exist or has already been deleted.
         */
        async createAsync(requestDto: TreatmentUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("/treatment", requestDto);
        },

        /**
         * Updates the treatment which has the specified id.
         *
         * @param id A {@link number} representing the id of the treatment to be updated.
         * @param requestDto An object implementing the {@link TreatmentUpsertRequestDto}
         * interface and containing the data to be updated.
         * @returns A {@link Promise} representing the asynchronous operation.
         *
         * @throws {ValidationError} Throws when the specified data violates validation rules.
         * @throws {NotFoundError} Throws when the treatment with the specified id doesn't
         * exist or has already been deleted.
         * @throws {AuthorizationError} Throws when the user doesn't have enough permission to
         * set the value for one or some of the treatment properties.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws when the customer with the id specified by the
         * value of the property `customerId` or the user with the id specified by the value
         * of the property `TherapistId` in the argument for the `requestDto` parameter
         * doesn't exist or has already been deleted.
         */
        async updateAsync(
                id: number,
                requestDto: TreatmentUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`/treatment/${id}`, requestDto);
        },

        /**
         * Delete an existing treatment with the specified id.
         *
         * @param id A {@link number} representing the id of the treatment to be deleted.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @remarks Of the treatment cannot be deleted entirely due to the existence of some
         * related data, it will be soft-deleted instead.
         *
         * @throws {NotFoundError} Throws when the treatment with the specified id doesn't
         * exist or has already been deleted.
         * @throws {AuthorizationError} Throws when the user doesn't have enough permissions
         * to set the value for on or some of the treatment properties.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         */
        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`/treatment/${id}`);
        },
    };
}