import { ExpenseCategory } from "@/services/dtos/enums";
import type {
    ExpenseListRequestDto,
    ExpenseUpsertRequestDto } from "@/services/dtos/requestDtos";
import type {
    ExpenseBasicResponseDto, ExpenseListResponseDto,
    ExpenseAuthorizationResponseDto, ExpenseDetailResponseDto,
    ExpenseListAuthorizationResponseDto } from "@/services/dtos/responseDtos";
import { ExpenseDetailPhotoModel, ExpenseUpsertPhotoModel } from "./expensePhotoModels";
import { ExpenseUpdateHistoryModel } from "./expenseUpdateHistoryModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
import { DateTimeDisplayModel, DateTimeInputModel } from "@/models/dateTimeModels";
import type { 
    IUpsertableListAuthorizationModel,
    IFinancialEngageableAuthorizationModel,
    IFinancialEngageableBasicModel,
    IFinancialEngageableListModel,
    IFinancialEngageableUpsertModel,
    IFinancialEngageableDetailModel,
    IHasMultiplePhotoDetailModel,
    IHasMultiplePhotoUpsertModel,
    IHasPhotoBasicModel
} from "./interfaces";
import { usePhotoUtility } from "@/utilities/photoUtility";

const photoUtility = usePhotoUtility();

export class ExpenseBasicModel implements IFinancialEngageableBasicModel, IHasPhotoBasicModel {
    public id: number;
    public amountBeforeVat: number;
    public statsDateTime: DateTimeDisplayModel;
    public category: ExpenseCategory;
    public isLocked: boolean;
    public thumbnailUrl: string;
    public authorization: ExpenseAuthorizationModel | null;

    constructor(responseDto: ExpenseBasicResponseDto) {
        this.id = responseDto.id;
        this.amountBeforeVat = responseDto.amount;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.category = responseDto.category;
        this.isLocked = responseDto.isLocked;
        this.thumbnailUrl = responseDto.thumbnailUrl ?? photoUtility.getDefaultPhotoUrl();
        this.authorization = new ExpenseAuthorizationModel(responseDto.authorization);
    }
}

export class ExpenseListModel implements IFinancialEngageableListModel  {
    public orderByAscending: boolean = false;
    public orderByField: string = "PaidDateTime";
    public monthYear: MonthYearModel | null;
    public ignoreMonthYear: boolean = false;
    public category: ExpenseCategory | null = null;
    public createdUser: UserBasicModel | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: ExpenseBasicModel[] = [];
    public monthYearOptions: MonthYearModel[] = [];
    public authorization: ExpenseListAuthorizationModel | null = null;

    constructor(responseDto: ExpenseListResponseDto) {
        this.mapFromResponseDto(responseDto);
        this.monthYear = this.monthYearOptions[0];
    }

    public mapFromResponseDto(responseDto: ExpenseListResponseDto): void {
        this.items = responseDto.items?.map(i => new ExpenseBasicModel(i)) || [];
        this.pageCount = responseDto.pageCount;
        this.monthYearOptions = responseDto.monthYearOptions
            .map(myo => new MonthYearModel(myo));
        this.authorization = responseDto.authorization &&
            new ExpenseListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): ExpenseListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
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
    public amount: number;
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
        this.amount = responseDto.amount;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.createdDateTime = new DateTimeDisplayModel(responseDto.createdDateTime);
        this.category = responseDto.category;
        this.note = responseDto.note ?? "";
        this.isLocked = responseDto.isLocked;
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.payeeName = responseDto.payee.name;
        this.photos = responseDto.photos?.map(p => new ExpenseDetailPhotoModel(p)) ?? [];
        this.authorization = new ExpenseAuthorizationModel(responseDto.authorization!);
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

    constructor(responseDto?: ExpenseDetailResponseDto) {
        if (responseDto) {
            this.amount = responseDto.amount;
            this.statsDateTime.inputDateTime = responseDto.statsDateTime;
            this.category = responseDto.category;
            this.note = responseDto.note ?? "";
            this.payeeName = responseDto.payee.name;
            this.photos = responseDto.photos?.map(p => new ExpenseUpsertPhotoModel(p)) ?? [];
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

export class ExpenseAuthorizationModel implements IFinancialEngageableAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;
    public canSetStatsDateTime: boolean;

    constructor(responseDto: ExpenseAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetStatsDateTime = responseDto.canSetStatsDateTime;
    }
}

export class ExpenseListAuthorizationModel implements IUpsertableListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: ExpenseListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}