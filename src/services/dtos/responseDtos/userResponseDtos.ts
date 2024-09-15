import { Gender } from "@/services/dtos/enums";
import type { RoleBasicResponseDto,
    RoleDetailResponseDto } from "./roleResponseDtos";

export type LoginResponseDto = {
    jwtToken: string;
    userId: number;
}

export interface UserBasicResponseDto {
    id: number;
    userName: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    fullName: string;
    gender: Gender;
    birthday: string | null;
    joiningDate: string | null;
    avatarUrl: string | null;
    role: RoleBasicResponseDto;
    authorization: UserBasicAuthorizationResponseDto | null;
}

export interface UserBasicAuthorizationResponseDto {
    canEdit: boolean;
    canChangePassword: boolean;
    canResetPassword: boolean;
    canDelete: boolean;
}

export interface UserPersonalInformationResponseDto {
    firstName: string;
    middleName: string | null;
    lastName: string;
    fullName: string;
    gender: Gender;
    birthday: string | null;
    phoneNumber: string | null;
    email: string | null;
    avatarUrl: string | null;  
}

export interface UserUserInformationResponseDto {
    createdDateTime: string;
    updatedDateTime: string | null;
    joiningDate: string | null;
    note: string | null;
    role: RoleDetailResponseDto;
}

export interface UserDetailAuthorizationResponseDto {
    canGetNote: boolean;
    canEdit: boolean;
    canEditUserPersonalInformation: boolean;
    canEditUserUserInformation: boolean;
    canAssignRole: boolean;
    canChangePassword: boolean;
    canResetPassword: boolean;
    canDelete: boolean;
}

export interface UserDetailResponseDto {
    id: number;
    userName: string;
    personalInformation: UserPersonalInformationResponseDto;
    userInformation: UserUserInformationResponseDto;
    authorization: UserDetailAuthorizationResponseDto;
};

export interface UserListResponseDto {
    results: UserBasicResponseDto[] | null;
    pageCount: number;
    authorization: UserAuthorizationResponseDto | null;
};

export interface UserAuthorizationResponseDto {
    canCreate: boolean;
}