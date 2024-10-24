import { Gender } from "../enums";

declare global {
    type UserListRequestDto = {
        page: number;
        orderByAscending: boolean;
        orderByField: string;
        roleId: number | null;
        joinedRecentlyOnly: boolean;
        upcomingBirthdayOnly: boolean;
        resultsPerPage: number;
        content: string;
    }
    
    interface UserPersonalInformationRequestDto {
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
    
    interface UserUserInformationRequestDto {
        joiningDate: string | null;
        role: RoleRequestDto | null;
        note: string | null;
    }
    
    interface UserCreateRequestDto {
        userName: string;
        password: string;
        confirmationPassword: string;
        personalInformation: UserPersonalInformationRequestDto;
        userInformation: UserUserInformationRequestDto;
    }
    
    interface UserUpdateRequestDto {
        personalInformation: UserPersonalInformationRequestDto;
        userInformation: UserUserInformationRequestDto;
    }
    
    interface UserPasswordChangeRequestDto {
        currentPassword: string;
        newPassword: string;
        confirmationPassword: string;
    }
    
    interface UserPasswordResetRequestDto {
        newPassword: string;
        confirmationPassword: string;
    }
}

export { };