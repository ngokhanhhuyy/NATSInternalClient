declare global {
    namespace ResponseDtos.User {
        type Basic = {
            id: number;
            userName: string;
            firstName: string;
            middleName: string | null;
            lastName: string;
            fullName: string;
            gender: import("@enums").Gender;
            birthday: string | null;
            joiningDate: string | null;
            avatarUrl: string | null;
            role: ResponseDtos.Role.Basic;
            authorization: BasicAuthorization | null;
        }
        
        type BasicAuthorization = {
            canEdit: boolean;
            canChangePassword: boolean;
            canResetPassword: boolean;
            canDelete: boolean;
        }
        
        type PersonalInformation = {
            firstName: string;
            middleName: string | null;
            lastName: string;
            fullName: string;
            gender: import("@enums").Gender;
            birthday: string | null;
            phoneNumber: string | null;
            email: string | null;
            avatarUrl: string | null;  
        }
        
        type UserInformation = {
            createdDateTime: string;
            updatedDateTime: string | null;
            joiningDate: string | null;
            note: string | null;
            role: ResponseDtos.Role.Detail;
        }
        
        type DetailAuthorization = {
            canGetNote: boolean;
            canEdit: boolean;
            canEditUserPersonalInformation: boolean;
            canEditUserUserInformation: boolean;
            canAssignRole: boolean;
            canChangePassword: boolean;
            canResetPassword: boolean;
            canDelete: boolean;
        }
        
        type Detail = {
            id: number;
            userName: string;
            personalInformation: PersonalInformation;
            userInformation: UserInformation;
            authorization: DetailAuthorization;
        }
        
        type List = {
            items: Basic[] | null;
            pageCount: number;
        }
    }
}

export { };