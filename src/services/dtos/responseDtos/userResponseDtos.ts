import { Gender } from "@/services/dtos/enums";

declare global {
    type UserBasicResponseDto = InstanceType<typeof ResponseDtos.User.Basic>;
    type UserBasicAuthorizationResponseDto = InstanceType<typeof ResponseDtos.User.BasicAuthorization>;
    type UserPersonalInformationResponseDto = InstanceType<typeof ResponseDtos.User.PersonalInformation>;
    type UserUserInformationResponseDto = InstanceType<typeof ResponseDtos.User.UserInformation>;
    type UserDetailAuthorizationResponseDto = InstanceType<typeof ResponseDtos.User.DetailAuthorization>;
    type UserDetailResponseDto = InstanceType<typeof ResponseDtos.User.Detail>;
    type UserListResponseDto = InstanceType<typeof ResponseDtos.User.List>;

    namespace ResponseDtos {
        namespace User {
            class Basic {
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
                role: ResponseDtos.Role.Basic;
                authorization: BasicAuthorization | null;
            }
            
            class BasicAuthorization {
                canEdit: boolean;
                canChangePassword: boolean;
                canResetPassword: boolean;
                canDelete: boolean;
            }
            
            class PersonalInformation {
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
            
            class UserInformation {
                createdDateTime: string;
                updatedDateTime: string | null;
                joiningDate: string | null;
                note: string | null;
                role: ResponseDtos.Role.Detail;
            }
            
            class DetailAuthorization {
                canGetNote: boolean;
                canEdit: boolean;
                canEditUserPersonalInformation: boolean;
                canEditUserUserInformation: boolean;
                canAssignRole: boolean;
                canChangePassword: boolean;
                canResetPassword: boolean;
                canDelete: boolean;
            }
            
            class Detail {
                id: number;
                userName: string;
                personalInformation: PersonalInformation;
                userInformation: UserInformation;
                authorization: DetailAuthorization;
            }
            
            class List {
                results: Basic[] | null;
                pageCount: number;
            }
        }
    }
}

export { };