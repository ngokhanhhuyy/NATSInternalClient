import {
    type UserCreateRequestDto,
    type UserListRequestDto, 
    type UserUpdateRequestDto,
    type UserPasswordChangeRequestDto,
    type UserPasswordResetRequestDto } from "@/services/dtos/requestDtos";
import {
    type RoleListResponseDto,
    type UserDetailResponseDto,
    type UserListResponseDto,
    type RoleDetailResponseDto } from "@/services/dtos/responseDtos";
import { useApiClient } from "./apiClient";

/**
 * A service to send requests and handle responses which represent the user-related operations.
 *
 * @returns An object containing the methods those perform the operations.
 */
export function useUserService() {
    const apiClient = useApiClient();

    return {
        /**
         * Retrieves a list of users with the basic information, based on the specified
         * filtering,  sorting and paginating conditions.
         *
         * @param requestDto An object which is a {@link Partial} implementation of the
         * {@link UserListRequestDto} interface, containing the conditions for the results.
         * @returns An object implementing the {@link UserListResponseDto} interface,
         * containing the results and the additional information for pagination.
         * @example getUserListAsync();
         * @example getUserListAsync(userListRequestDto);
         *
         * @throws {ValidationError} Throws when the conditions specified in the argument for
         * the {@link UserListRequestDto} parameter is invalid.
         */
        async getUserListAsync(requestDto?: Partial<UserListRequestDto>)
                : Promise<UserListResponseDto> {
            return await apiClient
                .getAsync<UserListResponseDto>("/user", requestDto);
        },

        /**
         * Retrieves a list of users who have just joined recently (within 1 month from now),
         * with the basic information.
         *
         * @retuns An object implementing the {@link UserListResponseDto} interface,
         * containing the results.
         * @remarks The results of this operation aren't based on any filtering, sorting or
         * paginating conditions.
         * @example getJoinedRecentlyUsersAsync();
         */
        async getJoinedRecentlyUsersAsync(): Promise<UserListResponseDto> {
            return await apiClient.getAsync("/user/joinedRecently");
        },

        /**
         * Retrieves a list of users who have the incoming birthdays (within 1 month from now),
         * with the basic information.
         *
         * @retuns An object implementing the {@link UserListResponseDto} interface,
         * containing the results.
         * @remarks The results of this operation aren't based on any filtering, sorting or
         * paginating conditions.
         * @example getJoinedRecentlyUsersAsync();
         */
        async getUpcomingBirthdayUsersAsync(): Promise<UserListResponseDto> {
            return await apiClient.getAsync("/user/upcomingBirthday");
        },

        /**
         * Retrieves the role's details of a specific user, specified by the id of the user.
         *
         * @param userId A {@link number} representing the id of the target user.
         * @returns A {@link Promise} representing the asynchronous operation, which result
         * is an object implementing the {@link RoleDetailResponseDto} interface, containing
         * the details of the target user.
         * @example getUserRoleAsync(1);
         *
         * @throws {NotFoundError} Throws when the user with the specified id doesn't exist or
         * has already been deleted.
         */
        async getUserRoleAsync(userId: number): Promise<RoleDetailResponseDto> {
            return await apiClient.getAsync<RoleDetailResponseDto>(`/user/${userId}/role`);
        },

        /**
         * Retrieves the details of a specific user, specified by the id of the user.
         *
         * @param id A {@link number} representing the id of the target user.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link UserDetailResponseDto} interface, containing the
         * details of the target user.
         *
         * @throws {NotFoundError} Throws when the user with the specified id doesn't exist or
         * has already been deleted.
         */
        async getUserDetailAsync(id: number): Promise<UserDetailResponseDto> {
            return await apiClient.getAsync<UserDetailResponseDto>(`/user/${id}`);
        },

        /**
         * Retrieves the details of the requesting user.
         *
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link UserDetailResponseDto} interface, containing the
         * details of the requesting user.
         */
        async getCallerDetailAsync(): Promise<UserDetailResponseDto> {
            return await apiClient.getAsync<UserDetailResponseDto>(`/user/caller`);
        },

        /**
         * Retrieves a list of all roles available in the application.
         *
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * an object implementing the {@link RoleListResponseDto} interface, containing the
         * results.
         */
        async getRoleListAsync(): Promise<RoleListResponseDto> {
            return await apiClient.getAsync<RoleListResponseDto>("/role");
        },

        /**
         * Creates a new user, based on the specified data.
         *
         * @param requestDto An object implementing the {@link UserCreateRequestDto} interface,
         * containing the data for the new user.
         * @returns A {@link Promise} representing the asynchronous operation, which result is
         * a {@link number} representing the id of the new user.
         * @example createUserAsync(userCreateRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified in the argument for the
         * `requestDto` parameter is invalid.
         * @throws {DuplicatedError} Throws when the value of the property `userName`,
         * specified in the argument for the `requestDto` parameter already exists.
         * @throws {NotFoundError} Throws when the role which has the name specified by the
         * value of the property `userInformation.role.name` in the argument for the
         * `requestDto` parameter doesn't exist.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to create a new user.
         * @throws {OperationError} Throws when a business logic validation occurs during the
         * assignment of the new user to the specified role.
         */
        async createUserAsync(requestDto: UserCreateRequestDto): Promise<number> {
            return await apiClient.postAsync<number>("/user", requestDto);
        },

        /**
         * Updates an existing user, specified by the id of the user.
         *
         * @param id A {@link number} representing the id of the target user.
         * @param requestDto An object representing the {@link UserUpdateRequestDto} interface,
         * containing the data for the updating operation.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example updateUserAsync(1, userUpdateRequestDto);
         *
         * @throws {ValidationError} Throws when the data specified in the argument for the
         * `requestDto` parameter is invalid.
         * @throws {NotFoundError} Throws when the user with the specified id doesn't exist or
         * has already been deleted.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to update the target user.
         */
        async updateUserAsync(id: number, requestDto: UserUpdateRequestDto): Promise<void> {
            await apiClient.putAndIgnoreAsync(`/user/${id}`, requestDto);
        },

        /**
         * Changes a specific user's password.
         *
         * @param id A {@link number} representing the id of the target user.
         * @param requestDto An object implementing the {@link UserPasswordChangeRequestDto}
         * interface, containing the current password, the new password and the confirmation
         * password for the operation.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @remarks The requesting user and the user whose id specified by the value of the
         * `id` argument must be the same one, since a user can only change his/her password
         * by himself/herself.
         *
         * @throws {ValidationError} Throws when the data specified in the argument for the
         * `requestDto` parameter is invalid.
         * @throws {NotFoundError} Throws when the user with the specified id doesn't exist or
         * has already been deleted.
         * @throws {AuthorizationError} Throws when the requesting user isn't the target user.
         * @throws {OperationError} Throws when the current password, provided in the
         * `requestDto` argument is incorrect.
         */
        async changeUserPasswordAsync(
                id: number,
                requestDto: UserPasswordChangeRequestDto): Promise<void> {
            await apiClient.putAndIgnoreAsync(`/user/${id}/changePassword`, requestDto);
        },

        /**
         * Resets a specific user's password.
         *
         * @param id A {@link number} representing the id of the target user.
         * @param requestDto An object implementing the {@link UserPasswordResetRequestDto}
         * interface, containing the new password and the confirmation password for the
         * operation.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @remarks The requesting user and the target user whose id specified by the value of
         * the `id` argument must be the different one, since a user cannot reset his/her
         * password by himself/herself.
         * @example
         * resetUserPasswordAsync(1, {
         *     newPassword: "newPassword",
         *     confirmationPassword: "newPassword"
         * });
         *
         * @throws {ValidationError} Throws when the data specified in the argument for the
         * `requestDto` parameter is invalid.
         * @throws {NotFoundError} Throws when the user with the specified id doesn't exist or
         * has already been deleted.
         * @throws {AuthorizationError} Throws when the requesting user is actually the target
         * user, or doesn"t have enough permissions to reset the target user"s password.
         * @throws {OperationError} Throws when the specified new password's complexity
         * doesn't meet the requirement.
         */
        async resetUserPasswordAsync(
                id: number,
                requestDto: UserPasswordResetRequestDto): Promise<void> {
            await apiClient.putAndIgnoreAsync(`/user/${id}/resetPassword`, requestDto);
        },

        /**
         * Deletes a specific user, specified by the id of the user.
         *
         * @param id A {@link number} representing the id of the target user.
         * @returns A {@link Promise} representing the asynchronous operation.
         * @example deleteUserAsync(1);
         *
         * @throws {NotFoundError} Throws when the user with the specified id doesn't exist or
         * has already been deleted.
         * @throws {AuthorizationError} Throws when the requesting user doesn't have enough
         * permissions to delete the target user.
         */
        async deleteUserAsync(id: number): Promise<void> {
            await apiClient.deleteAndIgnoreAsync(`/user/${id}`);
        },
    };
}