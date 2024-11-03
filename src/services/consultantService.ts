import { useApiClient } from "./apiClient";

let listSortingOptions: ListSortingOptionsResponseDto | null | undefined;
let listMonthYearOptions: ListMonthYearOptionsResponseDto | null | undefined;
let creatingAuthorization: ConsultantCreatingAuthorizationResponseDto | null | undefined;
let creatingPermission: boolean;

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
         * @param requestDto (Optional) An object which is an implementation of the
         * {@link ConsultantListRequestDto} interface, containing the conditions for the
         * results.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link ConsultantListRequestDto} interface, containing
         * the results.
         * @example getListAsync();
         * @example getListAsync(consultantListRequestDto);
         */
        async getListAsync(requestDto?: ConsultantListRequestDto):
                Promise<ConsultantListResponseDto> {
            if (!requestDto) {
                return await apiClient.getAsync<ConsultantListResponseDto>("/consultant");
            }

            return await apiClient.getAsync<ConsultantListResponseDto>(
                "/consultant",
                requestDto);
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
            return await apiClient.getAsync<ConsultantDetailResponseDto>(`/consultant/${id}`);
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
            return await apiClient.postAsync<number>("/consultant", requestDto);
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
            return await apiClient.putAndIgnoreAsync(`/consultant/${id}`, requestDto);
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
            return await apiClient.deleteAndIgnoreAsync(`/consultant/${id}`);
        },

        /**
         * Get all fields those are used as options to order the results in list retrieving
         * operation.
         *
         * @returns An instance of the {@link ListSortingOptionsResponseDto} DTO, containing
         * the options with name and display names of the fields and the default field.
         * @example getListSortingOptionAsync();
         */
        async getListSortingOptionAsync(): Promise<ListSortingOptionsResponseDto> {
            if (!listSortingOptions) {
                listSortingOptions = await apiClient
                    .getAsync<ListSortingOptionsResponseDto>("/consultant/listSortingOptions");
            }

            return listSortingOptions;
        },

        /**
         * Retrieve month year options which user can select as the filtering condition and the
         * default option, used in the list retrieving operation.
         *
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link ListMonthYearOptionsResponseDto} interface,
         * containing the options.
         * @example getListMonthYearOptionsAsync();
         */
        async getListMonthYearOptionsAsync(): Promise<ListMonthYearOptionsResponseDto> {
            if (!listMonthYearOptions) {
                listMonthYearOptions = await apiClient
                    .getAsync<ListMonthYearOptionsResponseDto>(
                        "consultant/listMonthYearOptions");
            }

            return listMonthYearOptions;
        },

        /**
         * Check if the requesting user has permission to create a new consultant.
         *
         * @returns `true` if the requesting user has the permission. Otherwise, `false`.
         * @example getCreatingPermissionAsync();
         */
        async getCreatingPermissionAsync(): Promise<boolean> {
            if (creatingPermission != undefined) {
                return creatingPermission;
            }

            if (creatingAuthorization) {
                return true;
            }

            creatingPermission = await apiClient
                .getAsync<boolean>("/consultant/creatingPermission");
            
            return creatingPermission;
        },

        /**
         * 
         * Check if the requesting user has permission to create a new consultant and
         * retrieve the authorization information for creating operation.
         * 
         * @returns An object which is an implementation of the
         * {@link ConsultantCreatingAuthorizationResponseDto} interface, containing the
         * authorization information for the operation when the requesting user has permission
         * to perform the operation. Otherwise, `null`.
         * @example getCreatingAuthorizationAsync();
         */
        async getCreatingAuthorizationAsync()
                : Promise<ConsultantCreatingAuthorizationResponseDto | null> {
            
            if (creatingAuthorization == undefined) {
                creatingAuthorization = await apiClient
                    .getAsync<ConsultantCreatingAuthorizationResponseDto>(
                        "/consultant/creatingAuthorization");
            }

            return creatingAuthorization;
        }
    };
}