import { DebtIncurrenceUpdateHistoryModel } from "./debtIncurrenceUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { ListMonthYearModel } from "./listMonthYearModels";
import { DateTimeDisplayModel, DateTimeInputModel } from "./dateTimeModels";

export class DebtIncurrenceBasicModel implements IDebtBasicModel {
    public readonly id: number;
    public readonly amount: number;
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly authorization: DebtIncurrenceAuthorizationModel | null;

    constructor(responseDto: ResponseDtos.DebtIncurrence.Basic) {
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
    public sortingByAscending: boolean = false;
    public sortingByField: string = "IncurredDateTime";
    public monthYear: ListMonthYearModel;
    public ignoreMonthYear: boolean = false;
    public customerId: number | null = null;
    public createdUserId: number | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: DebtIncurrenceBasicModel[] = [];
    public monthYearOptions: ListMonthYearModel[] = [];
    public authorization: ResponseDtos.DebtIncurrence.ListAuthorization | null = null;

    constructor(
            responseDto: ResponseDtos.DebtIncurrence.List,
            requestDto?: Partial<RequestDtos.DebtIncurrence.List>) {
        if (requestDto) {
            Object.assign(requestDto, this);
        }

        this.mapFromResponseDto(responseDto);
        this.monthYear = this.monthYearOptions[0];
    }

    public mapFromResponseDto(responseDto: ResponseDtos.DebtIncurrence.List): void {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new DebtIncurrenceBasicModel(i)) ?? [];
        this.monthYearOptions = responseDto.monthYearOptions
            .map(myo => new ListMonthYearModel(myo));
        this.authorization = responseDto.authorization &&
            new DebtIncurrenceListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): RequestDtos.DebtIncurrence.List {
        return {
            orderByAscending: this.sortingByAscending,
            orderByField: this.sortingByField,
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
    public updateHistories: DebtIncurrenceUpdateHistoryModel[];

    constructor(responseDto: ResponseDtos.DebtIncurrence.Detail) {
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.note = responseDto.note;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.createdDateTime = new DateTimeDisplayModel(responseDto.createdDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.authorization = new DebtIncurrenceAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories
            ?.map(uh => new DebtIncurrenceUpdateHistoryModel(uh))
            ?? [];
    }
}

export class DebtIncurrenceUpsertModel implements IDebtUpsertModel {
    public id: number = 0;
    public amount: number = 0;
    public note: string = "";
    public statsDateTime: IStatsDateTimeInputModel;
    public customer: CustomerBasicModel | null = null;
    public updatedReason: string = "";
    public readonly authorization: DebtIncurrenceAuthorizationModel;

    constructor(canSetStatsDateTime: boolean);
    constructor(responseDto: ResponseDtos.DebtIncurrence.Detail);
    constructor(arg: boolean | ResponseDtos.DebtIncurrence.Detail) {
        if (typeof arg === "boolean") {
            this.statsDateTime = new StatsDateTimeInputModel(true);
            this.authorization = new DebtIncurrenceAuthorizationModel(arg);
        } else {
            this.id = arg.id;
            this.amount = arg.amount;
            this.note = arg.note ?? "";
            this.statsDateTime = new StatsDateTimeInputModel(false, arg.statsDateTime);
            this.customer = new CustomerBasicModel(arg.customer);
            this.authorization = new DebtIncurrenceAuthorizationModel(arg.authorization);
        }
    }
    
    public toRequestDto(): RequestDtos.DebtIncurrence.Upsert {
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

    constructor(responseDto: ResponseDtos.DebtIncurrence.ListAuthorization) {
        this.canCreate = responseDto.canCreate;
    }
}

export class DebtIncurrenceAuthorizationModel
        implements IHasStatsExistingAuthorizationModel {
    public canEdit: boolean = true;
    public canDelete: boolean = false;
    public canSetStatsDateTime: boolean;

    constructor(canSetStatsDateTime: boolean);
    constructor(responseDto: ResponseDtos.DebtIncurrence.ExistingAuthorization)
    constructor(arg: boolean | ResponseDtos.DebtIncurrence.ExistingAuthorization) {
        if (typeof arg === "boolean") {
            this.canSetStatsDateTime = arg;
        } else {
            this.canEdit = arg.canEdit;
            this.canDelete = arg.canDelete;
            this.canSetStatsDateTime = arg.canSetStatsDateTime;
        }
    }
}