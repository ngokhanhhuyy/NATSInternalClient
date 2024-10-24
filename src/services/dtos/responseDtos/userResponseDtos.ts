import { Gender } from "@/services/dtos/enums";

declare global {
    interface LoginResponseDto {
        jwtToken: string;
        userId: number;
    }
    
    interface UserBasicResponseDto {
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
    
    interface UserBasicAuthorizationResponseDto {
        canEdit: boolean;
        canChangePassword: boolean;
        canResetPassword: boolean;
        canDelete: boolean;
    }
    
    interface UserPersonalInformationResponseDto {
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
    
    interface UserUserInformationResponseDto {
        createdDateTime: string;
        updatedDateTime: string | null;
        joiningDate: string | null;
        note: string | null;
        role: RoleDetailResponseDto;
    }
    
    interface UserDetailAuthorizationResponseDto {
        canGetNote: boolean;
        canEdit: boolean;
        canEditUserPersonalInformation: boolean;
        canEditUserUserInformation: boolean;
        canAssignRole: boolean;
        canChangePassword: boolean;
        canResetPassword: boolean;
        canDelete: boolean;
    }
    
    interface UserDetailResponseDto {
        id: number;
        userName: string;
        personalInformation: UserPersonalInformationResponseDto;
        userInformation: UserUserInformationResponseDto;
        authorization: UserDetailAuthorizationResponseDto;
    }
    
    interface UserListResponseDto {
        results: UserBasicResponseDto[] | null;
        pageCount: number;
        authorization: UserAuthorizationResponseDto | null;
    }
    
    interface UserAuthorizationResponseDto {
        canCreate: boolean;
    }
}

export { };