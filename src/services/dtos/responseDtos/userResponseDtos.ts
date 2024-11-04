import { Gender } from "@/services/dtos/enums";

declare global {
    class LoginResponseDto {
        jwtToken: string;
        userId: number;
    }
    
    class UserBasicResponseDto {
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
    
    class UserBasicAuthorizationResponseDto {
        canEdit: boolean;
        canChangePassword: boolean;
        canResetPassword: boolean;
        canDelete: boolean;
    }
    
    class UserPersonalInformationResponseDto {
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
    
    class UserUserInformationResponseDto {
        createdDateTime: string;
        updatedDateTime: string | null;
        joiningDate: string | null;
        note: string | null;
        role: RoleDetailResponseDto;
    }
    
    class UserDetailAuthorizationResponseDto {
        canGetNote: boolean;
        canEdit: boolean;
        canEditUserPersonalInformation: boolean;
        canEditUserUserInformation: boolean;
        canAssignRole: boolean;
        canChangePassword: boolean;
        canResetPassword: boolean;
        canDelete: boolean;
    }
    
    class UserDetailResponseDto {
        id: number;
        userName: string;
        personalInformation: UserPersonalInformationResponseDto;
        userInformation: UserUserInformationResponseDto;
        authorization: UserDetailAuthorizationResponseDto;
    }
    
    class UserListResponseDto {
        results: UserBasicResponseDto[] | null;
        pageCount: number;
        authorization: UserAuthorizationResponseDto | null;
    }
    
    class UserAuthorizationResponseDto {
        canCreate: boolean;
    }
}

export { };