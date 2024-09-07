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
    type UserCreateResponseDto, 
    type RoleDetailResponseDto } from "@/services/dtos/responseDtos";
import { useApiClient } from "./apiClient";

export function useUserService() {
    const apiClient = useApiClient();

    return {
        async getUserListAsync(
                requestDto?: UserListRequestDto): Promise<UserListResponseDto> {
            return await apiClient
                .getAsync<UserListResponseDto>("/user", requestDto);
        },
    
        async getJoinedRecentlyUsersAsync(): Promise<UserListResponseDto> {
            return await apiClient.getAsync("/user/joinedRecently");
        },
        
        async getUpcomingBirthdayUsersAsync(): Promise<UserListResponseDto> {
            return await apiClient.getAsync("/user/upcomingBirthday");
        },
        
        async getUserRoleAsync(userId: number): Promise<RoleDetailResponseDto> {
            return await apiClient.getAsync<RoleDetailResponseDto>(`/user/${userId}/role`);
        },
        
        async getUserDetailAsync(id: number): Promise<UserDetailResponseDto> {
            return await apiClient.getAsync<UserDetailResponseDto>(`/user/${id}`);
        },

        async getCallerDetailAsync(): Promise<UserDetailResponseDto> {
            return await apiClient.getAsync<UserDetailResponseDto>(`/user/caller`);
        },
        
        async getRoleListAsync(): Promise<RoleListResponseDto> {
            return await apiClient.getAsync<RoleListResponseDto>("/role");
        },
    
        async createUserAsync(
                requestDto: UserCreateRequestDto): Promise<UserCreateResponseDto> {
            return await apiClient.postAsync<UserCreateResponseDto>("/user", requestDto);
        },
    
        async updateUserAsync(id: number, requestDto: UserUpdateRequestDto): Promise<void> {
            await apiClient.putAndIgnoreAsync(`/user/${id}`, requestDto);
        },
    
        async changeUserPasswordAsync(
                id: number,
                requestDto: UserPasswordChangeRequestDto): Promise<void> {
            await apiClient.putAndIgnoreAsync(`/user/${id}/changePassword`, requestDto);
        },
    
        async resetUserPasswordAsync(
                id: number,
                requestDto: UserPasswordResetRequestDto): Promise<void> {
            await apiClient.putAndIgnoreAsync(`/user/${id}/resetPassword`, requestDto);
        },
    
        async deleteUserAsync(id: number): Promise<void> {
            await apiClient.deleteAndIgnoreAsync(`/user/${id}`);
        },
    };
}