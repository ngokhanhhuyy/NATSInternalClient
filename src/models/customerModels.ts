import { Gender, DebtOperationType } from "@enums";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";
import { useAvatarUtility } from "@/utilities/avatarUtility";
import { DateDisplayModel, DateTimeDisplayModel } from "./dateTimeModels";
import type { ListSortingOptionsModel } from "./listSortingModels";
import { UserBasicModel } from "./userModels";

const dateTimeUtility = useDateTimeUtility();
const avatarUtility = useAvatarUtility();

export class CustomerBasicModel implements IUpsertableBasicModel {
    public id: number;
    public fullName: string;
    public nickName: string | null;
    public gender: Gender = Gender.Male;
    public phoneNumber: string | null;
    public debtAmount: number;
    public avatarUrl: string;
    public authorization: CustomerExistingAuthorizationResponseDto | null;

    constructor(responseDto: ResponseDtos.Customer.Basic) {
        this.id = responseDto.id;
        this.fullName = responseDto.fullName;
        this.nickName = responseDto.nickName;
        this.gender = responseDto.gender;
        this.phoneNumber = responseDto.phoneNumber;
        this.debtAmount = responseDto.debtAmount;
        this.authorization = responseDto.authorization &&
            new CustomerExistingAuthorizationModel(responseDto.authorization);
        this.avatarUrl = avatarUtility.getDefaultAvatarUrlByFullName(responseDto.fullName);
    }
}

export class CustomerListModel implements ICreatorTrackableListModel {
    public sortByAscending?: boolean;
    public sortByField?: string;
    public searchByContent: string = "";
    public createdUserId?: number;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: CustomerBasicModel[] = [];
    public sortingOptionsModel?: ListSortingOptionsModel;
    public hasRemainingDebtAmountOnly: boolean = false;

    constructor(responseDto: CustomerListResponseDto) {
        this.mapFromResponseDto(responseDto);
    }

    public mapFromResponseDto(responseDto: CustomerListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items
            ?.map(dto => new CustomerBasicModel(dto)) ?? [];
    }

    public toRequestDto(): CustomerListRequestDto {
        return {
            sortByField: this.sortByField,
            sortByAscending: this.sortByAscending,
            searchByContent: this.searchByContent || undefined,
            createdUserId: this.createdUserId,
            page: this.page,
            resultsPerPage: this.resultsPerPage,
            hasRemainingDebtAmountOnly: this.hasRemainingDebtAmountOnly
        };
    }
}

export class CustomerDetailModel implements ICreateorTrackableDetailModel {
    public id: number;
    public firstName: string;
    public middleName: string | null;
    public lastName: string;
    public fullName: string;
    public nickName: string | null;
    public gender: Gender;
    public birthday: DateDisplayModel | null;
    public phoneNumber: string | null;
    public zaloNumber: string | null;
    public facebookUrl: string | null;
    public email: string | null;
    public address: string | null;
    public note: string | null;
    public createdUser: UserBasicModel;
    public createdDateTime: DateTimeDisplayModel;
    public updatedDateTime: DateTimeDisplayModel | null;
    public introducer: CustomerBasicModel | null;
    public debtAmount: number;
    public debtOperations: CustomerDebtOperationModel[];
    public avatarUrl: string;
    public authorization: CustomerExistingAuthorizationModel;

    constructor(responseDto: CustomerDetailResponseDto) {
        this.id = responseDto.id;
        this.firstName = responseDto.firstName;
        this.middleName = responseDto.middleName;
        this.lastName = responseDto.lastName;
        this.fullName = responseDto.fullName;
        this.nickName = responseDto.nickName;
        this.gender = responseDto.gender;
        this.birthday = responseDto.birthday
            ? new DateDisplayModel(responseDto.birthday)
            : null;
        this.phoneNumber = responseDto.phoneNumber;
        this.zaloNumber = responseDto.zaloNumber;
        this.facebookUrl = responseDto.facebookUrl;
        this.email = responseDto.email;
        this.address = responseDto.address;
        this.note = responseDto.note;
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.createdDateTime = new DateTimeDisplayModel(responseDto.createdDateTime);
        this.updatedDateTime = responseDto.updatedDateTime
            ? new DateTimeDisplayModel(responseDto.updatedDateTime)
            : null;
        this.introducer = responseDto.introducer &&
            new CustomerBasicModel(responseDto.introducer);
        this.debtAmount = responseDto.debtAmount;
        this.debtOperations = (responseDto.debtOperations ?? [])
            .map(dh => new CustomerDebtOperationModel(dh));
        this.authorization = new CustomerExistingAuthorizationModel(responseDto.authorization);
        this.avatarUrl = avatarUtility
            .getDefaultAvatarUrlByFullName(responseDto.fullName);
    }
}

export class CustomerUpsertModel {
    public id: number = 0;
    public firstName: string = "";
    public middleName: string = "";
    public lastName: string = "";
    public nickName: string = "";
    public gender: Gender = Gender.Male;
    public birthday: string = "";
    public phoneNumber: string = "";
    public zaloNumber: string = "";
    public facebookUrl: string = "";
    public email: string = "";
    public address: string = "";
    public note: string = "";
    public introducerId: number | null = null;

    constructor(responseDto?: CustomerDetailResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.firstName = responseDto.firstName;
            this.middleName = responseDto.middleName || "";
            this.lastName = responseDto.lastName;
            this.nickName = responseDto.nickName || "";
            this.gender = responseDto.gender;
            this.birthday = responseDto.birthday
                ? dateTimeUtility.getHTMLDateInputString(responseDto.birthday)
                : "";
            this.phoneNumber = responseDto.phoneNumber || "";
            this.zaloNumber = responseDto.zaloNumber || "";
            this.facebookUrl = responseDto.facebookUrl || "";
            this.email = responseDto.email || "";
            this.address = responseDto.address || "";
            this.note = responseDto.note || "";
        }
    }

    public toRequestDto(): CustomerUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();

        return {
            firstName: this.firstName || null,
            middleName: this.middleName || null,
            lastName: this.lastName || null,
            nickName: this.nickName || null,
            gender: this.gender,
            birthday: this.birthday &&
                dateTimeUtility.getDateISOString(this.birthday),
            phoneNumber: this.phoneNumber || null,
            zaloNumber: this.zaloNumber || null,
            facebookUrl: this.facebookUrl || null,
            email: this.email || null,
            address: this.address || null,
            note: this.note || null,
            introducerId: this.introducerId
        };
    }
}

export class CustomerExistingAuthorizationModel
        implements IUpsertableExistingAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: CustomerExistingAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}

export class CustomerDebtOperationModel {
    public operation: DebtOperationType;
    public amount: number;
    public operatedDateTime: DateTimeDisplayModel;
    public isLocked: boolean;
    public authorization: CustomerDebtOperationAuthorizationResponseDto;

    constructor(responseDto: CustomerDebtOperationResponseDto) {
        this.operation = responseDto.operation;
        this.amount = responseDto.amount;
        this.operatedDateTime = new DateTimeDisplayModel(responseDto.operatedDateTime);
        this.isLocked = responseDto.isLocked;
        this.authorization = new CustomerDebtOperationAuthorizationModel(
            responseDto.authorization);
    }
}

export class CustomerDebtOperationAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: CustomerDebtOperationAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}