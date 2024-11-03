import { ExpenseCategory } from "@enums";
import { ExpenseDetailPhotoModel, ExpenseUpsertPhotoModel } from "./expensePhotoModels";
import { ExpenseUpdateHistoryModel } from "./expenseUpdateHistoryModels";
import { UserBasicModel } from "./userModels";
import { ListMonthYearModel } from "./listMonthYearModels";
import { DateTimeDisplayModel, DateTimeInputModel } from "./dateTimeModels";
import { usePhotoUtility } from "@/utilities/photoUtility";

const photoUtility = usePhotoUtility();

export class ExpenseBasicModel implements IFinancialEngageableBasicModel, IHasPhotoBasicModel {
    public id: number;
    public amountAfterVat: number;
    public statsDateTime: DateTimeDisplayModel;
    public category: ExpenseCategory;
    public isLocked: boolean;
    public thumbnailUrl: string;
    public authorization: ExpenseAuthorizationModel | null;

    constructor(responseDto: ExpenseBasicResponseDto) {
        this.id = responseDto.id;
        this.amountAfterVat = responseDto.amountAfterVat;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.category = responseDto.category;
        this.isLocked = responseDto.isLocked;
        this.thumbnailUrl = responseDto.thumbnailUrl ?? photoUtility.getDefaultPhotoUrl();
        this.authorization = new ExpenseAuthorizationModel(responseDto.authorization);
    }
}

export class ExpenseListModel implements IFinancialEngageableListModel  {
    public sortingByAscending: boolean = false;
    public sortingByField: string = "PaidDateTime";
    public monthYear: ListMonthYearModel | null;
    public ignoreMonthYear: boolean = false;
    public category: ExpenseCategory | null = null;
    public createdUser: UserBasicModel | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: ExpenseBasicModel[] = [];
    public monthYearOptions: ListMonthYearModel[] = [];
    public authorization: ExpenseListAuthorizationModel | null = null;

    constructor(responseDto: ExpenseListResponseDto) {
        this.mapFromResponseDto(responseDto);
        this.monthYear = this.monthYearOptions[0];
    }

    public mapFromResponseDto(responseDto: ExpenseListResponseDto): void {
        this.items = responseDto.items?.map(i => new ExpenseBasicModel(i)) || [];
        this.pageCount = responseDto.pageCount;
        this.monthYearOptions = responseDto.monthYearOptions
            .map(myo => new ListMonthYearModel(myo));
        this.authorization = responseDto.authorization &&
            new ExpenseListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): ExpenseListRequestDto {
        return {
            orderByAscending: this.sortingByAscending,
            orderByField: this.sortingByField,
            month: this.monthYear?.month ?? 0,
            year: this.monthYear?.year ?? 0,
            ignoreMonthYear: this.ignoreMonthYear,
            category: this.category,
            createdUserId: this.createdUser && this.createdUser.id,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class ExpenseDetailModel
        implements IFinancialEngageableDetailModel, IHasMultiplePhotoDetailModel {
    public id: number;
    public amountAfterVat: number;
    public statsDateTime: DateTimeDisplayModel;
    public createdDateTime: DateTimeDisplayModel;
    public category: ExpenseCategory;
    public note: string;
    public isLocked: boolean;
    public createdUser: UserBasicModel;
    public payeeName: string;
    public photos: ExpenseDetailPhotoModel[];
    public authorization: ExpenseAuthorizationModel;
    public updateHistories: ExpenseUpdateHistoryModel[] | null;

    constructor(responseDto: ExpenseDetailResponseDto) {
        this.id = responseDto.id;
        this.amountAfterVat = responseDto.amountAfterVat;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.createdDateTime = new DateTimeDisplayModel(responseDto.createdDateTime);
        this.category = responseDto.category;
        this.note = responseDto.note ?? "";
        this.isLocked = responseDto.isLocked;
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.payeeName = responseDto.payee.name;
        this.photos = responseDto.photos?.map(p => new ExpenseDetailPhotoModel(p)) ?? [];
        this.authorization = new ExpenseAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new ExpenseUpdateHistoryModel(uh));
    }
}

export class ExpenseUpsertModel
        implements IFinancialEngageableUpsertModel, IHasMultiplePhotoUpsertModel {
    public id: number = 0;
    public amount: number = 0;
    public statsDateTime: IDateTimeInputModel = new DateTimeInputModel();
    public statsDateTimeSpecified: boolean = false;
    public category: ExpenseCategory = ExpenseCategory.Equipment;
    public note: string = "";
    public payeeName: string = "";
    public photos: ExpenseUpsertPhotoModel[] = [];
    public updatedReason: string = "";
    public readonly authorization: ExpenseAuthorizationModel;

    constructor(canSetStatsDateTime: boolean);
    constructor(responseDto: ExpenseDetailResponseDto);
    constructor(arg: boolean | ExpenseDetailResponseDto) {
        if (typeof arg === "boolean") {
            this.authorization = new ExpenseAuthorizationModel(arg);
        } else {
            this.amount = arg.amountAfterVat;
            this.statsDateTime.inputDateTime = arg.statsDateTime;
            this.category = arg.category;
            this.note = arg.note ?? "";
            this.payeeName = arg.payee.name;
            this.photos = arg.photos?.map(p => new ExpenseUpsertPhotoModel(p)) ?? [];
            this.authorization = arg.authorization &&
                new ExpenseAuthorizationModel(arg.authorization);
        }
    }

    public toRequestDto(): ExpenseUpsertRequestDto {
        let statsDateTime = this.statsDateTime.toRequestDto();
        if (!this.statsDateTimeSpecified) {
            statsDateTime = null;
        }

        return {
            amount: this.amount,
            statsDateTime: statsDateTime,
            category: this.category,
            note: this.note || null,
            payeeName: this.payeeName,
            photos: this.photos.length ? this.photos.map(p => p.toRequestDto()) : null,
            updatedReason: this.updatedReason || null
        };
    }
}

export class ExpenseAuthorizationModel implements IFinancialEngageableExistingAuthorizationModel {
    public canEdit: boolean = true;
    public canDelete: boolean = false;
    public canSetStatsDateTime: boolean;

    constructor(canSetStatsDateTime: boolean);
    constructor(responseDto: ExpenseAuthorizationResponseDto)
    constructor(arg: boolean | ExpenseAuthorizationResponseDto) {
        if (typeof arg === "boolean") {
            this.canSetStatsDateTime = arg;
        } else {
            this.canEdit = arg.canEdit;
            this.canDelete = arg.canDelete;
            this.canSetStatsDateTime = arg.canSetStatsDateTime;
        }
    }
}

export class ExpenseListAuthorizationModel implements IUpsertableListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: ExpenseListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}