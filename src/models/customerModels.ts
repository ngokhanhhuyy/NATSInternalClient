import { Gender, DebtOperationType } from "@/services/dtos/enums";
import type {
    CustomerListRequestDto,
    CustomerUpsertRequestDto } from "@/services/dtos/requestDtos";
import type {
    CustomerBasicResponseDto,
    CustomerListResponseDto,
    CustomerDetailResponseDto,
    CustomerListAuthorizationResponseDto,
    CustomerAuthorizationResponseDto,
    CustomerDebtOperationResponseDto,
    CustomerDebtOperationAuthorizationResponseDto} from "@/services/dtos/responseDtos";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";
import { useAvatarUtility } from "@/utilities/avatarUtility";

export class CustomerBasicModel {
    public id: number;
    public fullName: string;
    public nickName: string | null;
    public gender: Gender = Gender.Male;
    public phoneNumber: string | null;
    public debtRemainingAmount: number;
    public avatarUrl: string;
    public authorization: CustomerAuthorizationResponseDto | null;

    constructor(responseDto: CustomerBasicResponseDto) {
        const avatarUtility = useAvatarUtility();

        this.id = responseDto.id;
        this.fullName = responseDto.fullName;
        this.nickName = responseDto.nickName ;
        this.gender = responseDto.gender;
        this.phoneNumber = responseDto.phoneNumber;
        this.debtRemainingAmount = responseDto.debtRemainingAmount;
        this.authorization = responseDto.authorization &&
            new CustomerAuthorizationModel(responseDto.authorization);
        this.avatarUrl = avatarUtility.getDefaultAvatarUrlByFullName(responseDto.fullName);
    }
}

export class CustomerListModel {
    public orderByAscending: boolean = true;
    public orderByField: string = "LastName";
    public searchByContent: string = "";
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public results: CustomerBasicModel[] = [];
    public authorization: CustomerListAuthorizationResponseDto | null = null;
    public hasRemainingDebtAmountOnly: boolean = false;

    constructor(responseDto: CustomerListResponseDto);
    constructor(hasRemainingDebtAmountOnly: boolean);
    constructor(resultsPerPage: number);
    constructor(arg: CustomerListResponseDto | boolean | number) {
        if (typeof arg === "boolean") {
            this.hasRemainingDebtAmountOnly = arg;
        } else if (typeof arg === "number") {
            this.resultsPerPage = arg;
        } else {
            this.mapFromResponseDto(arg);
        }
    }

    public mapFromResponseDto(responseDto: CustomerListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.results = (responseDto.results ?? [])?.map(dto => new CustomerBasicModel(dto));
        this.authorization = responseDto.authorization &&
            new CustomerListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): CustomerListRequestDto {
        return {
            orderByField: this.orderByField,
            orderByAscending: this.orderByAscending,
            searchByContent: this.searchByContent,
            page: this.page,
            resultsPerPage: this.resultsPerPage,
            hasRemainingDebtAmountOnly: this.hasRemainingDebtAmountOnly
        };
    }
}

export class CustomerDetailModel {
    public id: number;
    public firstName: string;
    public middleName: string | null;
    public lastName: string;
    public fullName: string;
    public nickName: string | null;
    public gender: Gender;
    public birthday: string | null;
    public phoneNumber: string | null;
    public zaloNumber: string | null;
    public facebookUrl: string | null;
    public email: string | null;
    public address: string | null;
    public note: string | null;
    public createdDateTime: string;
    public updatedDateTime: string | null;
    public introducer: CustomerBasicModel | null;
    public debtAmount: number;
    public debtOperations: CustomerDebtOperationModel[];
    public avatarUrl: string;
    public authorization: CustomerAuthorizationResponseDto | null;

    constructor(responseDto: CustomerDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        const avatarUtility = useAvatarUtility();

        this.id = responseDto.id;
        this.firstName = responseDto.firstName;
        this.middleName = responseDto.middleName;
        this.lastName = responseDto.lastName;
        this.fullName = responseDto.fullName;
        this.nickName = responseDto.nickName;
        this.gender = responseDto.gender;
        this.birthday = responseDto.birthday;
        this.phoneNumber = responseDto.phoneNumber;
        this.zaloNumber = responseDto.zaloNumber;
        this.facebookUrl = responseDto.facebookUrl;
        this.email = responseDto.email;
        this.address = responseDto.address;
        this.note = responseDto.note;
        this.createdDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.createdDateTime);
        this.updatedDateTime = responseDto.updatedDateTime &&
            dateTimeUtility.getDisplayDateTimeString(responseDto.updatedDateTime);
        this.introducer = responseDto.introducer && new CustomerBasicModel(responseDto.introducer);
        this.debtAmount = responseDto.debtAmount;
        this.debtOperations = (responseDto.debtOperations ?? [])
            .map(dh => new CustomerDebtOperationModel(dh));
        this.authorization = responseDto.authorization &&
            new CustomerAuthorizationModel(responseDto.authorization);
        this.avatarUrl = avatarUtility.getDefaultAvatarUrlByFullName(responseDto.fullName);
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
            this.birthday = responseDto.birthday || "";
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
            birthday: (this.birthday || null) && dateTimeUtility
                .getDateISOString(this.birthday),
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

export class CustomerListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: CustomerListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class CustomerAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: CustomerAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}

export class CustomerDebtOperationModel {
    public operation: DebtOperationType;
    public amount: number;
    public operatedDate: string;
    public operatedTime: string;
    public operatedDateTime: string;
    public isLocked: boolean;
    public authorization: CustomerDebtOperationAuthorizationResponseDto;

    constructor(responseDto: CustomerDebtOperationResponseDto) {
        const dateTimeUltility = useDateTimeUtility();

        this.operation = responseDto.operation;
        this.amount = responseDto.amount;
        this.operatedDate = dateTimeUltility
            .getDisplayDateString(responseDto.operatedDateTime);
        this.operatedTime = dateTimeUltility
            .getDisplayTimeString(responseDto.operatedDateTime);
        this.operatedDateTime = dateTimeUltility
            .getDisplayDateTimeString(responseDto.operatedDateTime);
        this.isLocked = responseDto.isLocked;
        this.authorization = new CustomerDebtOperationAuthorizationModel(responseDto.authorization);
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