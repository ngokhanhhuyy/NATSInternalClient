import type { RouteLocationRaw } from "vue-router";
import { Gender } from "@/services/dtos/enums";
import { RoleMinimalModel } from "./roleModels";
import { DateDisplayModel, DateTimeDisplayModel, DateInputModel } from "./dateTimeModels";
import { useAvatarUtility } from "@/utilities/avatarUtility";
import { ListSortingOptionsModel } from "./listSortingModels";

type ListSortingOptionsResponseDto = ResponseDtos.List.SortingOptions;

export class UserBasicModel implements IUpsertableBasicModel<UserBasicAuthorizationModel> {
    public readonly id: number;
    public readonly userName: string;
    public readonly firstName: string;
    public readonly middleName: string | null;
    public readonly lastName: string;
    public readonly fullName: string;
    public readonly gender: Gender = Gender.Male;
    public readonly birthday: IDateDisplayModel | null;
    public readonly joiningDate: IDateDisplayModel | null;
    public readonly avatarUrl: string;
    public readonly role: RoleMinimalModel;
    public readonly authorization: UserBasicAuthorizationModel | null;

    constructor(responseDto: ResponseDtos.User.Basic) {
        const avatarUtility = useAvatarUtility();

        this.id = responseDto.id;
        this.userName = responseDto.userName;
        this.firstName = responseDto.firstName;
        this.middleName = responseDto.middleName;
        this.lastName = responseDto.lastName;
        this.fullName = responseDto.fullName;
        this.gender = responseDto.gender;
        this.birthday = responseDto.birthday
            ? new DateDisplayModel(responseDto.birthday)
            : null;
        this.joiningDate = responseDto.joiningDate
            ? new DateDisplayModel(responseDto.joiningDate)
            : null;
        this.avatarUrl = responseDto.avatarUrl ??
            avatarUtility.getDefaultAvatarUrlByFullName(responseDto.fullName);
        this.role = new RoleMinimalModel(responseDto.role);
        this.authorization = responseDto.authorization &&
            new UserBasicAuthorizationModel(responseDto.authorization);
    }

    public get detailRoute(): RouteLocationRaw {
        return { name: "userProfile", params: { userId: this.id } };
    }

    public get updateRoute(): RouteLocationRaw {
        return { name: "userUpdate", params: { userId: this.id } };
    }
}

export class UserBasicAuthorizationModel implements IUpsertableExistingAuthorizationModel {
    public readonly canEdit: boolean;
    public readonly canChangePassword: boolean;
    public readonly canResetPassword: boolean;
    public readonly canDelete: boolean;

    constructor(responseDto: ResponseDtos.User.BasicAuthorization) {
        this.canEdit = responseDto.canEdit;
        this.canChangePassword = responseDto.canChangePassword;
        this.canResetPassword = responseDto.canResetPassword;
        this.canDelete = responseDto.canDelete;
    }
}

export class UserListModel implements
        IUpsertableListModel<UserBasicModel, UserBasicAuthorizationModel>,
        ISortableListModel<UserBasicModel> {
    public sortingByAscending: boolean | undefined;
    public sortingByField: string | undefined;
    public roleId: number | undefined;
    public joinedRecentlyOnly: boolean | undefined;
    public upcomingBirthdayOnly: boolean | undefined;
    public resultsPerPage: number = 12;
    public content: string = "";
    public page: number = 1;
    public items: UserBasicModel[] = [];
    public pageCount: number = 0;
    public sortingOptions: ListSortingOptionsModel | undefined;
    public roleOptions: RoleMinimalModel[] | undefined;
    public canCreate: boolean | undefined;

    constructor(
            listResponseDto: ResponseDtos.User.List,
            initialResponseDto?: ResponseDtos.User.Initial,
            roleOptionsResponseDto?: ResponseDtos.Role.Minimal[],
            requestDto?: RequestDtos.User.List) {
        this.mapFromListResponseDto(listResponseDto);
        
        if (initialResponseDto) {
            const sortingOptions = initialResponseDto.listSortingOptions;
            this.sortingOptions = new ListSortingOptionsModel(sortingOptions);
            this.sortingByField = this.sortingOptions.defaultFieldName;
            this.sortingByAscending = this.sortingOptions.defaultAscending;
            this.canCreate = initialResponseDto.creatingPermission;
        }

        if (roleOptionsResponseDto) {
            this.roleOptions = roleOptionsResponseDto.map(dto => new RoleMinimalModel(dto));
        }

        if (requestDto) {
            Object.assign(this, requestDto);
        }
    }

    public get createRoute(): RouteLocationRaw {
        return { name: "userCreate" };
    }

    public mapFromListResponseDto(responseDto: ResponseDtos.User.List): void {
        this.items = responseDto.items?.map(dto => new UserBasicModel(dto)) || [];
        this.pageCount = responseDto.pageCount;
    }

    public toRequestDto(): RequestDtos.User.List {
        return {
            sortingByAscending: this.sortingByAscending,
            sortingByField: this.sortingByField,
            page: this.page,
            resultsPerPage: this.resultsPerPage,
            content: this.content || undefined,
            roleId: this.roleId,
            joinedRecentlyOnly: this.joinedRecentlyOnly,
            upcomingBirthdayOnly: this.upcomingBirthdayOnly
        };
    }
}

export class UserPersonalInformationDetailModel {
    public readonly firstName: string;
    public readonly middleName: string | null;
    public readonly lastName: string;
    public readonly fullName: string;
    public readonly gender: Gender = Gender.Male;
    public readonly birthday: IDateDisplayModel | null;
    public readonly phoneNumber: string | null;
    public readonly email: string | null;
    public readonly avatarUrl: string | null;

    constructor(responseDto: ResponseDtos.User.PersonalInformation) {
        const avatarUtility = useAvatarUtility();

        this.firstName = responseDto.firstName;
        this.middleName = responseDto.middleName;
        this.lastName = responseDto.lastName;
        this.fullName = responseDto.fullName;
        this.gender = responseDto.gender;
        this.birthday = responseDto.birthday
            ? new DateDisplayModel(responseDto.birthday)
            : null;
        this.phoneNumber = responseDto.phoneNumber;
        this.email = responseDto.email;
        this.avatarUrl = responseDto.avatarUrl ??
            avatarUtility.getDefaultAvatarUrlByFullName(responseDto.fullName);
    }
}

export class UserPersonalInformationUpsertModel {
    public firstName: string = "";
    public middleName: string = "";
    public lastName: string = "";
    public fullName: string = "";
    public gender: Gender = Gender.Male;
    public birthday: IDateInputModel = new DateInputModel();
    public phoneNumber: string = "";
    public email: string = "";
    public avatarUrl: string | null = null;
    public avatarFile : string | null = null;
    public avatarChanged: boolean = false;

    constructor(responseDto?: ResponseDtos.User.PersonalInformation) {
        if (responseDto) {
            this.firstName = responseDto.firstName;
            this.middleName = responseDto.middleName || "";
            this.lastName = responseDto.lastName;
            this.fullName = responseDto.fullName;
            this.gender = responseDto.gender;
            this.birthday = new DateInputModel(responseDto.birthday ?? undefined);
            this.phoneNumber = responseDto.phoneNumber || "";
            this.email = responseDto.email || "";
            this.avatarUrl = responseDto.avatarUrl;
        }
    }

    public toRequestDto(): RequestDtos.User.UpsertPersonalInformation {
        return {
            firstName: this.firstName,
            middleName: this.middleName || null,
            lastName: this.lastName,
            gender: this.gender,
            birthday: this.birthday.toRequestDto(),
            phoneNumber: this.phoneNumber || null,
            email: this.email || null,
            avatarFile: this.avatarFile || null,
            avatarChanged: true
        };
    }
}

export class UserUserInformationDetailModel {
    public readonly createdDateTime: IDateTimeDisplayModel;
    public readonly updatedDateTime: IDateTimeDisplayModel | null;
    public readonly joiningDate: IDateDisplayModel | null;
    public readonly role: RoleMinimalModel;
    public readonly note: string | null;

    constructor(responseDto: ResponseDtos.User.UserInformation) {
        this.createdDateTime = new DateTimeDisplayModel(responseDto.createdDateTime);
        this.updatedDateTime = responseDto.updatedDateTime
            ? new DateTimeDisplayModel(responseDto.updatedDateTime)
            : null;
        this.joiningDate = responseDto.joiningDate
            ? new DateDisplayModel(responseDto.joiningDate)
            : null;
        this.role = new RoleMinimalModel(responseDto.role);
        this.note = responseDto.note;
    }
}

export class UserUserInformationUpsertModel {
    public joiningDate: IDateInputModel;
    public roleName: string | undefined;
    public note: string = "";
    public roleOptions: RoleMinimalModel[];

    constructor(roleOptionsResponseDtos: ResponseDtos.Role.Minimal[]);
    constructor(
        roleOptionsResponseDtos: ResponseDtos.Role.Minimal[],
        detailResponseDto: ResponseDtos.User.UserInformation);
    constructor(
            roleOptionsResponseDtos: ResponseDtos.Role.Minimal[],
            arg?: ResponseDtos.User.UserInformation) {
        if (!arg) {
            this.roleOptions = roleOptionsResponseDtos.map(dto => new RoleMinimalModel(dto));
            this.roleName = this.roleOptions[0].name;
            this.joiningDate = new DateInputModel();
        } else {
            this.joiningDate = new DateInputModel(arg.joiningDate ?? undefined);
            this.roleName = arg.role.name;
            this.note = arg.note || "";
        }
        this.roleOptions = roleOptionsResponseDtos.map(dto => new RoleMinimalModel(dto));
    }

    public toRequestDto(): RequestDtos.User.UpsertUserInformation {
        return {
            joiningDate: this.joiningDate.toRequestDto(),
            roleName: this.roleName ?? "",
            note: this.note || null
        };
    }
}

export class UserDetailModel {
    public readonly id: number;
    public readonly userName: string;
    public readonly personalInformation: UserPersonalInformationDetailModel | null;
    public readonly userInformation: UserUserInformationDetailModel | null;
    public readonly authorization: UserDetailAuthorizationModel;

    constructor(responseDto: ResponseDtos.User.Detail) {
        this.id = responseDto.id;
        this.userName = responseDto.userName;
        this.personalInformation = responseDto.personalInformation &&
            new UserPersonalInformationDetailModel(responseDto.personalInformation);
        this.userInformation = responseDto.userInformation &&
            new UserUserInformationDetailModel(responseDto.userInformation);
        this.authorization = new UserDetailAuthorizationModel(responseDto.authorization);
    }

    public get updateRoute(): RouteLocationRaw {
        return { name: "userUpdate", params: { userId: this.id } };
    }

    public get passwordChangeRoute(): RouteLocationRaw {
        return { name: "userPasswordChange" };
    }

    public get passwordResetRoute(): RouteLocationRaw {
        return { name: "userPasswordReset", params: { userId: this.id } };
    }
}

export class UserDetailAuthorizationModel {
    public readonly canGetNote: boolean;
    public readonly canEdit: boolean;
    public readonly canEditUserPersonalInformation: boolean;
    public readonly canEditUserUserInformation: boolean;
    public readonly canAssignRole: boolean;
    public readonly canChangePassword: boolean;
    public readonly canResetPassword: boolean;
    public readonly canDelete: boolean;

    constructor(responseDto: ResponseDtos.User.DetailAuthorization) {
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

export class UserCreateModel {
    public id: number = 0;
    public userName: string = "";
    public password: string = ""; 
    public confirmationPassword: string = "";
    public personalInformation: UserPersonalInformationUpsertModel;
    public userInformation: UserUserInformationUpsertModel;

    constructor(roleOptionsResponseDto: ResponseDtos.Role.Minimal[]) {
        this.personalInformation = new UserPersonalInformationUpsertModel();
        this.userInformation = new UserUserInformationUpsertModel(roleOptionsResponseDto);
    }

    public toRequestDto(): RequestDtos.User.Create {

        return {
            userName: this.userName,
            password: this.password,
            confirmationPassword: this.confirmationPassword,
            personalInformation: this.personalInformation.toRequestDto(),
            userInformation: this.userInformation.toRequestDto()
        };
    }
}

export class UserUpdateModel {
    public id: number = 0;
    public personalInformation: UserPersonalInformationUpsertModel;
    public userInformation: UserUserInformationUpsertModel;
    public authorization: UserDetailAuthorizationModel;

    constructor(
            detailResponseDto: ResponseDtos.User.Detail,
            roleOptionsResponseDtos: ResponseDtos.Role.Minimal[]) {
        this.id = detailResponseDto.id;
        this.personalInformation =
            new UserPersonalInformationUpsertModel(detailResponseDto.personalInformation);
        this.userInformation = new UserUserInformationUpsertModel(
            roleOptionsResponseDtos,
            detailResponseDto.userInformation);
        this.authorization = new UserDetailAuthorizationModel(detailResponseDto.authorization);
    }

    public toRequestDto(): RequestDtos.User.Update {
        return {
            personalInformation: this.personalInformation.toRequestDto(),
            userInformation: this.userInformation.toRequestDto()
        };
    }
}

export class UserPasswordChangeModel {
    public currentPassword: string = "";
    public newPassword: string = "";
    public confirmationPassword: string = "";

    public toRequestDto(): RequestDtos.User.PasswordChange {
        return {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
            confirmationPassword: this.confirmationPassword
        };
    }
}

export class UserPasswordResetModel {
    public id: number;
    public newPassword: string = "";
    public confirmationPassword: string = "";

    constructor(id: number) {
        this.id = id;
    }

    public toRequestDto(): RequestDtos.User.PasswordReset {
        return {
            newPassword: "",
            confirmationPassword: ""
        };
    }
}