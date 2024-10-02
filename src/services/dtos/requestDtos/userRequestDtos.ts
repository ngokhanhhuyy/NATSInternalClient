import { Gender } from "@/services/dtos/enums";
import type { RoleRequestDto } from "./roleRequestDtos";

export type SignInRequestDto = {
    userName: string;
    password: string;
}

export type UserListRequestDto = {
    page: number;
    orderByAscending: boolean;
    orderByField: string;
    roleId: number | null;
    joinedRecentlyOnly: boolean;
    upcomingBirthdayOnly: boolean;
    resultsPerPage: number;
    content: string;
}

export interface UserPersonalInformationRequestDto {
    firstName: string;
    middleName: string | null;
    lastName: string;
    gender: Gender;
    birthday: string | null;
    phoneNumber: string | null;
    email: string | null;
    avatarFile : string | null;
    avatarChanged: boolean;
}

export interface UserUserInformationRequestDto {
    joiningDate: string | null;
    role: RoleRequestDto | null;
    note: string | null;
}

export interface UserCreateRequestDto {
    userName: string;
    password: string;
    confirmationPassword: string;
    personalInformation: UserPersonalInformationRequestDto;
    userInformation: UserUserInformationRequestDto;
}

export interface UserUpdateRequestDto {
    personalInformation: UserPersonalInformationRequestDto;
    userInformation: UserUserInformationRequestDto;
}

export interface UserPasswordChangeRequestDto {
    currentPassword: string;
    newPassword: string;
    confirmationPassword: string;
}

export interface UserPasswordResetRequestDto {
    newPassword: string;
    confirmationPassword: string;
}