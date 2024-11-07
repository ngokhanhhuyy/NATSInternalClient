import { useApiClient } from "./apiClient";

/**
 * A service to send requests and handle responses which represent the product-related
 * operations.
 *
 * @returns An object containing the methods which perform the operations.
 */
export function useProductService() {
    const apiClient = useApiClient();

    return {
        /**
         * Retrieves a list of products with the basic information, based on the specified
         * filtering, sorting and paginating conditions.
         *
         * @param requestDto (Optional) An object which is a {@link Partial} implementation of
         * the {@link RequestDtos.Product.List} interface, containing the conditions for the
         * results.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link ResponseDtos.Product.List} interface, containing the
         * results and the additional information for pagination.
         * @example getListAsync();
         * @example getListAsync(productListRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified in the `requestDto`
         * argument is invalid.
         */
        async getListAsync(requestDto?: Partial<RequestDtos.Product.List>):
                Promise<ResponseDtos.Product.List> {
            if (!requestDto) {
                return await apiClient.getAsync("/product");
            }
            
            return await apiClient.getAsync("/product", requestDto);
        },

        /**
         * Retrieves the details of a specific product, based on its id.
         *
         * @param id A {@link number} representing the id of the product to retrieve.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link ResponseDtos.Product.Detail} interface, containing
         * the details of the product.
         * @example getDetailAsync(1);
         *
         * @throws {NotFoundError} Throws when the product with the specified id doesn't exist
         * or has already been deleted.
         */
        async getDetailAsync(id: number): Promise<ResponseDtos.Product.Detail> {
            return await apiClient.getAsync(`/product/${id}`);
        },

        /**
         * Creates a new product, based on the specified data.
         *
         * @param requestDto An object implementing the {@link RequestDtos.Product.Upsert}
         * interface, containing the data for the creating operation.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * a {@link number} representing the id of the new product.
         * @example createAsync(productUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified in the `requestDto`
         * argument is invalid.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws under the following circumstances:
         * - When the brand with the id specified by the value of the property `brandId` in the
         * `requestDto` argument doesn't exist or has already been deleted.
         * - When the category with the id specified by the value of the property `categoryId`
         * in the `requestDto` argument doesn't exist or has already been deleted.
         * - When the specified value for the property `name` in the `requestDto` argument
         * already exists.
         */
        async createAsync(requestDto: RequestDtos.Product.Upsert): Promise<number> {
            return await apiClient
                .postAsync<number>("/product", requestDto);
        },

        /**
         * Updates an existing product, based on its id and the specified data.
         *
         * @param id A {@link number} representing the id of the product to update.
         * @param requestDto An object implementing the {@link RequestDtos.Product.Upsert}
         * interface, containing the data for the updating operation.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example updateAsync(1, productUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified in the `requestDto`
         * argument is invalid.
         * @throws {NotFoundError} Throws when the product with the specified id doesn't exist
         * or has already been deleted.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws under the following circumstances:
         * - When the brand with the id specified by the value of the property `brandId` in the
         * `requestDto` argument doesn't exist or has already been deleted.
         * - When the category with the id specified by the value of the property `categoryId`
         * in the `requestDto` argument doesn't exist or has already been deleted.
         * - When the specified value for the property `name` in the `requestDto` argument
         * already exists.
         */
        async updateAsync(id: number, requestDto: RequestDtos.Product.Upsert): Promise<void> {
            return await apiClient
                .putAndIgnoreAsync(`/product/${id}`, requestDto);
        },

        /**
         * Deletes an existing product based on its id.
         *
         * @param id A {@link number} representing the id of the product to delete.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example deleteAsync(1);
         *
         * @throws {NotFoundError} Throws when the product with the specified id doesn't exist
         * or has already been deleted.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws when the product's deletion is restricted due to the
         * existence of some related data.
         */
        async deleteAsync(id: number): Promise<void> {
            return await apiClient
                .deleteAndIgnoreAsync(`/product/${id}`);
        }
    };
}