import { DebtIncurrenceUpdateHistoryModel } from "./debtIncurrenceUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
import { DateTimeDisplayModel, DateTimeInputModel } from "./dateTimeModels";

export class DebtIncurrenceBasicModel implements IDebtBasicModel {
    public readonly id: number;
    public readonly amount: number;
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly authorization: DebtIncurrenceAuthorizationModel | null;

    constructor(responseDto: DebtIncurrenceBasicResponseDto) {
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new DebtIncurrenceAuthorizationModel(responseDto.authorization);
    }
}

export class DebtIncurrenceListModel implements IDebtListModel  {
    public orderByAscending: boolean = false;
    public orderByField: string = "IncurredDateTime";
    public monthYear: MonthYearModel;
    public ignoreMonthYear: boolean = false;
    public customerId: number | null = null;
    public createdUserId: number | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: DebtIncurrenceBasicModel[] = [];
    public monthYearOptions: MonthYearModel[] = [];
    public authorization: DebtIncurrenceListAuthorizationResponseDto | null = null;

    constructor(responseDto: DebtIncurrenceListResponseDto) {
        this.mapFromResponseDto(responseDto);
        this.monthYear = this.monthYearOptions[0];
    }

    public mapFromResponseDto(responseDto: DebtIncurrenceListResponseDto): void {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new DebtIncurrenceBasicModel(i)) ?? [];
        this.monthYearOptions = responseDto.monthYearOptions
            .map(myo => new MonthYearModel(myo));
        this.authorization = responseDto.authorization &&
            new DebtIncurrenceListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): DebtIncurrenceListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            month: this.monthYear.month ?? 0,
            year: this.monthYear.year ?? 0,
            ignoreMonthYear: this.ignoreMonthYear,
            customerId: this.customerId,
            createdUserId: this.createdUserId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class DebtIncurrenceDetailModel implements IDebtDetailModel {
    public id: number;
    public amount: number;
    public note: string | null;
    public statsDateTime: DateTimeDisplayModel;
    public createdDateTime: DateTimeDisplayModel;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public createdUser: UserBasicModel;
    public authorization: DebtIncurrenceAuthorizationModel;
    public updateHistories: DebtIncurrenceUpdateHistoryModel[] | null;

    constructor(responseDto: DebtIncurrenceDetailResponseDto) {
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.note = responseDto.note;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.createdDateTime = new DateTimeDisplayModel(responseDto.createdDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.authorization = new DebtIncurrenceAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new DebtIncurrenceUpdateHistoryModel(uh));
    }
}

export class DebtIncurrenceUpsertModel implements IDebtUpsertModel {
    public id: number = 0;
    public amount: number = 0;
    public note: string = "";
    public statsDateTime: IDateTimeInputModel = new DateTimeInputModel();
    public customer: CustomerBasicModel | null = null;
    public updatedReason: string = "";

    constructor(responseDto?: DebtIncurrenceDetailResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.amount = responseDto.amount;
            this.note = responseDto.note ?? "";
            this.statsDateTime.inputDateTime = responseDto.statsDateTime;
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }
    
    public toRequestDto(): DebtIncurrenceUpsertRequestDto {
        return {
            amount: this.amount,
            note: this.note,
            statsDateTime: this.statsDateTime.toRequestDto(),
            customerId: this.customer?.id ?? null,
            updatedReason: this.updatedReason || null
        };
    }
}

export class DebtIncurrenceListAuthorizationModel
        implements IUpsertableListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: DebtIncurrenceListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class DebtIncurrenceAuthorizationModel
        implements IFinancialEngageableAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;
    public canSetStatsDateTime: boolean;

    constructor(responseDto: DebtIncurrenceAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetStatsDateTime = responseDto.canSetStatsDateTime;
    }
}