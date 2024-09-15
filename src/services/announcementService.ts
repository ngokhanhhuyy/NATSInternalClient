import { useApiClient } from "@/services/apiClient";
import {
    AnnouncementListRequestDto,
    AnnouncementUpsertRequestDto } from "@/services/dtos/requestDtos";
import {
    AnnouncementListResponseDto,
    AnnouncementResponseDto } from "@/services/dtos/responseDtos";

/**
 * A service to send requests and handle responses which represent the announcement-related
 * operations.
 *
 * @returns An object containing the methods to perform the operations.
 */
export function useAnnouncementService() {
    const apiClient = useApiClient();

    return {
        /**
         * Retrieves a list of announcements, based on the specified filtering, sorting and
         * paginating conditions.
         *
         * @param requestDto An object which is a {@link Partial} implementation of the
         * {@link AnnouncementListRequestDto} interface, containing the conditions for the
         * results.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link AnnouncementListResponseDto} interface, containing
         * the results.
         * @example getListAsync();
         * @example getListAsync(announcementListRequestDto);
         *
         * @throws {ValidationError} Throws when the values for the conditions specified in
         * the `requestDto` argument is invalid.
         */
        async getListAsync(requestDto?: Partial<AnnouncementListRequestDto>):
                Promise<AnnouncementListResponseDto> {
            if (!requestDto) {
                return apiClient.getAsync<AnnouncementListResponseDto>("/announcement");
            }

            return apiClient
                .getAsync<AnnouncementListResponseDto>("/announcement", requestDto);
        },

        /**
         * Retrieves the details of a specific announcement, specified by its id.
         *
         * @param id A {@link number} representing the id of the announcement to retrieve.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link AnnouncementResponseDto} interface, containing
         * the details of the announcement.
         * @example getDetailAsync(1);
         *
         * @throws {NotFoundError} Throws when the announcement with the specified id doesn't
         * exist or has already been deleted.
         */
        async getDetailAsync(id: number): Promise<AnnouncementResponseDto> {
            return apiClient.getAsync<AnnouncementResponseDto>(`/announcement/${id}`);
        },

        /**
         * Creates a new announcement based on the specified data.
         *
         * @param requestDto An object implementing the {@link AnnouncementUpsertRequestDto}
         * interface, containing the data for the creating operation.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * a {@link number} representing the id of the new announcement.
         * @example createAsync(announcementUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified in the `requestDto`
         * argument is invalid.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         */
        async createAsync(requestDto: AnnouncementUpsertRequestDto): Promise<number> {
            return apiClient.postAsync<number>("/announcement", requestDto);
        },

        /**
         * Updates an existing announcement, based on its id and the specified data.
         *
         * @param id A {@link number} representing the id of the announcement to update.
         * @param requestDto An object implementing the {@link AnnouncementUpsertRequestDto}
         * interface, containing the data for the updating operation.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example updateAsync(1, announcementUpsertRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified in the `requestDto`
         * argument is invalid.
         * @throws {NotFoundError} Throws when the announcement with the specified id doesn't
         * exist or has already been deleted.
         * @throws {ConcurrencyError} Throws when a concurrency-related conflict occurs during
         * the operation.
         */
        async updateAsync(
                id: number,
                requestDto: AnnouncementUpsertRequestDto): Promise<void> {
            return apiClient.putAndIgnoreAsync(`/announcement/${id}`, requestDto);
        },

        /**
         * Delete an existing announcement, based on its id.
         *
         * @param id A {@link number} representing the id of the announcement to delete.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example deleteAsync(1);
         *
         * @throws {NotFoundError} Throws when the announcement with the specified id doesn't
         * exist or has already been deleted.
         */
        async deleteAsync(id: number): Promise<void> {
            return apiClient.deleteAndIgnoreAsync(`/announcement/${id}`);
        }
    }
}