import { useApiClient } from "./apiClient";
import type {
    ProductCategoryListResponseDto, 
    ProductCategoryResponseDto } from "./dtos/responseDtos";
import type { ProductCategoryUpsertRequestDto,
    ProductCategoryListRequestDto } from "./dtos/requestDtos";

/**
 * A service to send requests and handle responses which are related to product categories.
 *
 * @returns An object containing the methods to perform the operations.
 */
export function useProductCategoryService() {
    const apiClient = useApiClient();

    return {
        /**
         * Retrieves a list of product categories, based on the paginating conditions.
         *
         * @param requestDto (Optional) An object which is a {@link Partial} implementation of
         * the {@link ProductCategoryListRequestDto} interface, containing the paginating
         * conditions for the results.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link ProductCategoryListResponseDto} interface,
         * containing the results.
         * @example getListAsync();
         */
        async getListAsync(requestDto?: Partial<ProductCategoryListRequestDto>)
                : Promise<ProductCategoryListResponseDto> {
            if (!requestDto) {
                return await apiClient
                    .getAsync<ProductCategoryListResponseDto>("/productCategory");
            }
            return await apiClient
                .getAsync<ProductCategoryListResponseDto>("/productCategory", requestDto);
        },

        /**
         * Retrieves a list of all product categories, without pagination.
         *
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link ProductCategoryListResponseDto} interface,
         * containing the results.
         * @example getListAsync();
         */
        async getAllAsync(): Promise<ProductCategoryResponseDto[]> {
            return await apiClient
                .getAsync<ProductCategoryResponseDto[]>("/productCategory/all");
        },

        /**
         * Retrieves the details of a specific product category, based on its id.
         *
         * @param id A {@link number} representing the id of the product category to retrieve.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link ProductCategoryResponseDto} interface, containing
         * the details of the product category.
         * @example getDetailAsync(1);
         *
         * @throws {NotFoundError} Throws when the product category with the specified id
         * doesn't exist or has already been deleted.
         */
        async getDetailAsync(id: number): Promise<ProductCategoryResponseDto> {
            return await apiClient
                .getAsync<ProductCategoryResponseDto>(`/productCategory/${id}`);
        },

        /**
         * Creates a new product category, based on the specified data.
         *
         * @param requestDto An object implementing the {@link ProductCategoryUpsertRequestDto}
         * interface, containing the data for the creating operation.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * a {@link number} representing the id of the new product category.
         * @example createAsync(productCategoryUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified in the `requestDto`
         * argument is invalid.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws when the unique value for the `name` property in the
         * `requestDto` argument already exists.
         */
        async createAsync(requestDto: ProductCategoryUpsertRequestDto): Promise<number> {
            return await apiClient
                .postAsync<number>("/productCategory/create", requestDto);
        },

        /**
         * Updates an existing product category, based on its id and the specified data.
         *
         * @param id A {@link number} representing the id of the product category to update.
         * @param requestDto An object implementing the {@link ProductCategoryUpsertRequestDto}
         * interface, containing the data for the updating operation.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example updateAsync(1, productCategoryUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified in the `requestDto`
         * argument is invalid.
         * @throws {NotFoundError} Throws when the product category with the specified id
         * doesn't exist or has already been deleted.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws when the unique value for the `name` property in the
         * `requestDto` argument already exists.
         */
        async updateAsync(
                id: number,
                requestDto: ProductCategoryUpsertRequestDto): Promise<void> {
            return await apiClient
                .putAndIgnoreAsync(`/productCategory/${id}`, requestDto);
        },

        /**
         * Deletes an existing product category, based on its id.
         *
         * @param id A {@link number} representing the id of the product category to delete.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example deleteAsync(1);
         *
         * @throws {NotFoundError} Throws when the product category with the specified id
         * doesn't exist or has already been deleted.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         * @throws {OperationError} Throws when the product category's deletion is restricted
         * due to the existence of some related data.
         */
        async deleteAsync(id: number): Promise<void> {
            return await apiClient
                .deleteAndIgnoreAsync(`/productCategory/${id}`);
        },
    };
}