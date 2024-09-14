import { useApiClient } from "./apiClient";
import type {
    BrandListResponseDto,
    BrandDetailResponseDto } from "./dtos/responseDtos";
import type { BrandUpsertRequestDto } from "./dtos/requestDtos";

/**
 * A service to send requests and handle responses which representing the order-related
 * operations.
 */
export function useBrandService() {
    const apiClient = useApiClient();

    /**
     * Retrieves a list of brands based on the specified filtering and sorting conditions.
     *
     * @returns A {@link Promise} representing the asynchronous operation, which result is an
     * object implementing the {@link BrandListResponseDto} interface, containing the results.
     * @example
     * getListAsync();
     */
    async function getListAsync(): Promise<BrandListResponseDto> {
        return apiClient.getAsync<BrandListResponseDto>("/brand");
    }

    /**
     * Retrieves the details of the brand with the specified id.
     * @param id A {@link number} representing the id of the brand to retrieve.
     * @returns A {@link Promise} representing the asynchronous operation, which result is an
     * object implementing the {@link BrandDetailResponseDto}, containing the details of the
     * brand.
     * @example
     * getDetailAsync(1);
     *
     * @throws {NotFoundError} Throws when the brand with the specified id doesn't exist or
     * has already been deleted.
     */
    async function getDetailAsync(id: number): Promise<BrandDetailResponseDto> {
        return await apiClient
            .getAsync<BrandDetailResponseDto>(`/brand/${id}`);
    }

    /**
     * Creates a new brand with the specified data.
     *
     * @param requestDto An object implementing the {@link BrandUpsertRequestDto} interface,
     * containing the data for the new brand.
     * @returns A {@link Promise} representing the asynchronous operation, which result is a
     * {@link number} representing the id of the new brand.
     * @example
     * createAsync(brandUpsertRequestDto);
     *
     * @throws {ValidationError} Throws when the provided data is invalid.
     * @throws {OperationError} Throws when the country with the id specified by the value of
     * the property `country.id` in the argument for the `requestDto` parameter doesn't exist
     * or when the name specified by the value of the property `name` in the argument for the
     * `requestDto` parameter already exists.
     */
    async function createAsync(requestDto: BrandUpsertRequestDto): Promise<number> {
        return await apiClient
            .postAsync<number>("/brand", requestDto);
    }

    /**
     * Updates an existing brand with the specified id.
     *
     * @param id A {@link number} representing the id of the brand to update.
     * @param requestDto An object implementing the {@link BrandUpsertRequestDto} interface,
     * containing the data for the brand to be updated.
     * @returns A {@link Promise} representing the asynchronous operation.
     * @example
     * updateAsync(1, brandUpsertRequestDto);
     *
     * @throws {ValidationError} Throws when the provided data is invalid.
     * @throws {NotFoundError} Throws when the brand with the specified id doesn't exist or
     * has already been deleted.
     * @throws {OperationError} Throws when the country with the id specified by the value of
     * the property `country.id` in the argument for the `requestDto` parameter doesn't exist
     * or when the name specified by the value of the property `name` in the argument for the
     * `requestDto` parameter already exists.
     */
    async function updateAsync(id: number, requestDto: BrandUpsertRequestDto): Promise<void> {
        return await apiClient
            .putAndIgnoreAsync(`/brand/${id}`, requestDto);
    }

    /**
     * Deletes an existing brand with the specified id.
     *
     * @param id A {@link number} representing the id of the brand to be deleted.
     * @returns A {@link Promise} representing the asynchronous operation.
     * @example
     * deleteAsync(1);
     *
     * @throws {NotFoundError} Throws when the brand with the specified id doesn't exist or
     * has already been deleted.
     */
    async function deleteAsync(id: number): Promise<void> {
        return await apiClient
            .deleteAndIgnoreAsync(`/brand/${id}`);
    }

    return { getListAsync, getDetailAsync, createAsync, updateAsync, deleteAsync };
}