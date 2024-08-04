import { Gender } from "@/services/dtos/enums";
import type {
    UserCreateRequestDto,
    UserListRequestDto,
    UserPasswordChangeRequestDto,
    UserPasswordResetRequestDto,
    UserPersonalInformationRequestDto, 
    UserUpdateRequestDto,
    UserUserInformationRequestDto} from "@/services/dtos/requestDtos/userRequestDtos";
import type {
    UserAuthorizationResponseDto,
    UserBasicAuthorizationResponseDto,
    UserBasicResponseDto,
    UserDetailAuthorizationResponseDto,
    UserDetailResponseDto,
    UserListResponseDto, 
    UserPersonalInformationResponseDto,
    UserUserInformationResponseDto } from "@/services/dtos/responseDtos/userResponseDtos";
import { Model } from "./baseModels";
import {
    RoleBasicModel,
    RoleDetailModel } from "./roleModels";

export class UserBasicModel extends Model {
    public id: number;
    public userName: string;
    public firstName: string;
    public middleName: string | null;
    public lastName: string;
    public fullName: string;
    public gender: Gender = Gender.Male;
    public birthday: string | null;
    public joiningDate: string | null;
    public avatarUrl: string;
    public role: RoleBasicModel;
    public authorization: UserBasicAuthorizationModel | null;

    constructor(responseDto: UserBasicResponseDto) {
        super();
        this.id = responseDto.id;
        this.userName = responseDto.userName;
        this.firstName = responseDto.firstName;
        this.middleName = responseDto.middleName;
        this.lastName = responseDto.lastName;
        this.fullName = responseDto.fullName;
        this.gender = responseDto.gender;
        this.birthday = responseDto.birthday &&
            this.convertToDisplayDateString(responseDto.birthday);
        this.joiningDate = responseDto.joiningDate &&
            this.convertToDisplayDateString(responseDto.joiningDate);
        this.avatarUrl = responseDto.avatarUrl ??
            this.getDefaultAvatarUrlByFullName(responseDto.fullName);
        this.role = new RoleBasicModel(responseDto.role);
        this.authorization = responseDto.authorization &&
            new UserBasicAuthorizationModel(responseDto.authorization);
    }
}

export class UserBasicAuthorizationModel extends Model {
    public canEdit: boolean;
    public canChangePassword: boolean;
    public canResetPassword: boolean;
    public canDelete: boolean;

    constructor(responseDto: UserBasicAuthorizationResponseDto) {
        super();
        this.canEdit = responseDto.canEdit;
        this.canChangePassword = responseDto.canChangePassword;
        this.canResetPassword = responseDto.canResetPassword;
        this.canDelete = responseDto.canDelete;
    }
}

export class UserListModel extends Model {
    public page: number = 1;
    public orderByAscending: boolean = true;
    public orderByField: string = "lastName";
    public roleId: number | null = null;
    public resultsPerPage: number = 12;
    public content: string = "";
    public results: UserBasicModel[] = [];
    public pageCount: number = 0;
    public authorization: UserAuthorizationModel | null = null;

    constructor(responseDto?: UserListResponseDto) {
        super();
        if (responseDto) {
            this.mapFromResponseDto(responseDto);
        }
    }

    public mapFromResponseDto(responseDto: UserListResponseDto): void {
        this.results = responseDto.results?.map(dto => new UserBasicModel(dto)) || [];
        this.pageCount = responseDto.pageCount;
        this.authorization = responseDto.authorization &&
            new UserAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): UserListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            page: this.page,
            resultsPerPage: this.resultsPerPage,
            content: this.content,
            roleId: this.roleId
        };
    }
}

export class UserAuthorizationModel extends Model {
    public canCreate: boolean;

    constructor(responseDto: UserAuthorizationResponseDto) {
        super();
        this.canCreate = responseDto.canCreate;
    }
}

export class JoinedRecentlyUserModel extends UserBasicModel { }

export class JoinedRecentlyUserListModel extends Model {
    public results: JoinedRecentlyUserModel[] = [];

    constructor(responseDto?: UserListResponseDto) {
        super();
        if (responseDto) {
            this.mapFromResponseDto(responseDto);
        }
    }

    public mapFromResponseDto(responseDto: UserListResponseDto) {
        this.results = responseDto.results?.map(dto => new JoinedRecentlyUserModel(dto)) || [];
    }
}

export class UpcomingBirthdayUserModel extends UserBasicModel {
    public daysLeftToBirthday: string = "";

    constructor(responseDto: UserBasicResponseDto) {
        super(responseDto);

        const birthdate = new Date(responseDto.birthday!);
        this.daysLeftToBirthday =`${birthdate.getDate()}/${birthdate.getMonth}`;
        if (birthdate.getDate() === new Date().getDate()) {
            this.daysLeftToBirthday = "Hôm nay";
        }

        return this;
    }
}

export class UpcomingBirthdayUserListModel extends Model {
    public results: UpcomingBirthdayUserModel[] = [];

    constructor(responseDto?: UserListResponseDto) {
        super();
        if (responseDto) {
            this.mapFromResponseDto(responseDto);
        }
    }

    public mapFromResponseDto(responseDto: UserListResponseDto) {
        this.results = responseDto.results?.map(dto => new UpcomingBirthdayUserModel(dto)) || [];
    }
}

export class UserPersonalInformationDetailModel extends Model {
    public firstName: string;
    public middleName: string | null;
    public lastName: string;
    public fullName: string;
    public gender: Gender = Gender.Male;
    public birthday: string | null;
    public phoneNumber: string | null;
    public email: string | null;
    public avatarUrl: string | null;

    constructor(responseDto: UserPersonalInformationResponseDto) {
        super();
        this.firstName = responseDto.firstName;
        this.middleName = responseDto.middleName;
        this.lastName = responseDto.lastName;
        this.fullName = responseDto.fullName;
        this.gender = responseDto.gender;
        this.birthday = responseDto.birthday &&
            this.convertToDisplayDateString(responseDto.birthday);
        this.phoneNumber = responseDto.phoneNumber;
        this.email = responseDto.email;
        this.avatarUrl = responseDto.avatarUrl ??
            this.getDefaultAvatarUrlByFullName(responseDto.fullName);
    }
}

export class UserPersonalInformationUpsertModel extends Model {
    public firstName: string = "";
    public middleName: string = "";
    public lastName: string = "";
    public fullName: string = "";
    public gender: Gender = Gender.Male;
    public birthday: string = "";
    public phoneNumber: string = "";
    public email: string = "";
    public avatarUrl: string | null = null;
    public avatarFile : string | null = null;
    public avatarChanged: boolean = false;

    constructor(responseDto?: UserPersonalInformationResponseDto) {
        super();
        if (responseDto) {
            this.firstName = responseDto.firstName;
            this.middleName = responseDto.middleName || "";
            this.lastName = responseDto.lastName;
            this.fullName = responseDto.fullName;
            this.gender = responseDto.gender;
            this.birthday = this.convertToHTMLDateInputString(responseDto.birthday);
            this.phoneNumber = responseDto.phoneNumber || "";
            this.email = responseDto.email || "";
            this.avatarUrl = responseDto.avatarUrl;
        }
    }

    public toRequestDto(): UserPersonalInformationRequestDto {
        return {
            firstName: this.firstName,
            middleName: this.middleName || null,
            lastName: this.lastName,
            gender: this.gender,
            birthday: (this.birthday || null) && this.convertToDateISOString(this.birthday),
            phoneNumber: this.phoneNumber || null,
            email: this.email || null,
            avatarFile: this.avatarFile || null,
            avatarChanged: true
        };
    }
}

export class UserUserInformationDetailModel extends Model {
    public createdDateTime: string;
    public updatedDateTime: string | null;
    public joiningDate: string | null;
    public role: RoleDetailModel;
    public note: string | null;

    constructor(responseDto: UserUserInformationResponseDto) {
        super();
        this.createdDateTime = this.convertToDisplayDateTimeString(responseDto.createdDateTime);
        this.updatedDateTime = responseDto.updatedDateTime && this
            .convertToDisplayDateTimeString(responseDto.updatedDateTime);
        this.joiningDate = responseDto.joiningDate && this
            .convertToDisplayDateString(responseDto.joiningDate);
        this.role = new RoleDetailModel(responseDto.role);
        this.note = responseDto.note;
    }
}

export class UserUserInformationUpsertModel extends Model {
    public joiningDate: string = "";
    public role: RoleBasicModel;
    public note: string = "";

    constructor(arg: RoleBasicModel | UserUserInformationResponseDto) {
        super();
        if (arg instanceof RoleBasicModel) {
            this.role = arg;
        } else {
            this.joiningDate = this.convertToHTMLDateInputString(arg.joiningDate);
            this.role = new RoleBasicModel(arg.role);
            this.note = arg.note || "";
        }
    }

    public toRequestDto(): UserUserInformationRequestDto {
        return {
            joiningDate: this.joiningDate || null,
            role: this.role && { name: this.role.name },
            note: this.note || null
        };
    }
}

export class UserDetailModel extends Model {
    public id: number;
    public userName: string;
    public personalInformation: UserPersonalInformationDetailModel | null;
    public userInformation: UserUserInformationDetailModel | null;
    public authorization: UserDetailAuthorizationModel;

    constructor(responseDto: UserDetailResponseDto) {
        super();
        this.id = responseDto.id;
        this.userName = responseDto.userName;
        this.personalInformation = responseDto.personalInformation &&
            new UserPersonalInformationDetailModel(responseDto.personalInformation);
        this.userInformation = responseDto.userInformation &&
            new UserUserInformationDetailModel(responseDto.userInformation);
        this.authorization = new UserDetailAuthorizationModel(responseDto.authorization);
    }
}

export class UserDetailAuthorizationModel extends Model {
    public canGetNote: boolean;
    public canEdit: boolean;
    public canEditUserPersonalInformation: boolean;
    public canEditUserUserInformation: boolean;
    public canAssignRole: boolean;
    public canChangePassword: boolean;
    public canResetPassword: boolean;
    public canDelete: boolean;

    constructor(responseDto: UserDetailAuthorizationResponseDto) {
        super();
        this.canGetNote = responseDto.canGetNote;
        this.canEdit = responseDto.canEdit;
        this.canEditUserPersonalInformation = responseDto.canEditUserPersonalInformation;
        this.canEditUserUserInformation = responseDto.canEditUserUserInformation;
        this.canAssignRole = responseDto.canAssignRole;
        this.canChangePassword = responseDto.canChangePassword;
        this.canResetPassword = responseDto.canResetPassword;
        this.canDelete = responseDto.canDelete;
    }
}

export class UserCreateModel extends Model {
    public id: number = 0;
    public userName: string | null = null;
    public password: string = "";
    public confirmationPassword: string = "";
    public personalInformation = new UserPersonalInformationUpsertModel();
    public userInformation;

    constructor(role: RoleBasicModel) {
        super();
        this.userInformation = new UserUserInformationUpsertModel(role);
    }

    public toRequestDto(): UserCreateRequestDto {
        return {
            userName: this.userName!,
            password: this.password,
            confirmationPassword: this.confirmationPassword,
            personalInformation: {
                firstName: this.personalInformation.firstName,
                middleName: this.personalInformation.middleName || null,
                lastName: this.personalInformation.lastName,
                gender: this.personalInformation.gender,
                birthday: (this.personalInformation.birthday || null) &&
                    this.convertToDateISOString(this.personalInformation.birthday),
                phoneNumber: this.personalInformation.phoneNumber || null,
                email: this.personalInformation.email || null,
                avatarFile: this.personalInformation.avatarFile || null,
                avatarChanged: true
            },
            userInformation: {
                joiningDate: (this.userInformation.joiningDate || null) &&
                    this.convertToDateISOString(this.userInformation.joiningDate),
                note: this.userInformation.note || null,
                role: { name: this.userInformation.role.name }
            }
        };
    }
}

export class UserUpdateModel extends Model {
    public id: number = 0;
    public personalInformation: UserPersonalInformationUpsertModel;
    public userInformation: UserUserInformationUpsertModel;
    public authorization: UserDetailAuthorizationModel;

    constructor(responseDto: UserDetailResponseDto) {
        super();
        this.id = responseDto.id;
        this.personalInformation =
            new UserPersonalInformationUpsertModel(responseDto.personalInformation);
        this.userInformation =
            new UserUserInformationUpsertModel(responseDto.userInformation);
        this.authorization = new UserDetailAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): UserUpdateRequestDto {
        return {
            personalInformation: this.personalInformation.toRequestDto(),
            userInformation: this.userInformation.toRequestDto()
        };
    }
}

export class UserPasswordChangeModel extends Model {
    public id: number;
    public currentPassword: string = "";
    public newPassword: string = "";
    public confirmationPassword: string = "";

    constructor(id: number) {
        super();
        this.id = id;
    }

    public toRequestDto(): UserPasswordChangeRequestDto {
        return {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            confirmationPassword: this.confirmationPassword
        };
    }
}

export class UserPasswordResetModel extends Model {
    public id: number;
    public newPassword: string = "";
    public confirmationPassword: string = "";

    constructor(id: number) {
        super();
        this.id = id;
    }

    public toRequestDto(): UserPasswordResetRequestDto {
        return {
            newPassword: "",
            confirmationPassword: ""
        };
    }
}