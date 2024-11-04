import { DebtPaymentUpdateHistoryModel } from "./debtPaymentUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { DateTimeDisplayModel, StatsDateTimeInputModel } from "./dateTimeModels";
import { UserBasicModel } from "./userModels";
import { ListMonthYearModel } from "./listMonthYearModels";

export class DebtPaymentBasicModel implements IDebtBasicModel {
    public readonly id: number;
    public readonly amount: number;
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly authorization: DebtPaymentAuthorizationModel;

    constructor(responseDto: DebtPaymentBasicResponseDto) {
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.isLocked = responseDto.isLocked;
        this.authorization = new DebtPaymentAuthorizationModel(responseDto.authorization!);
    }
}

export class DebtPaymentListModel implements IDebtListModel {
    public sortingByAscending: boolean = false;
    public sortingByField: string = "CreatedDateTime";
    public monthYear: ListMonthYearModel;
    public ignoreMonthYear: boolean = false;
    public customerId: number | null = null;
    public createdUserId: number | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: DebtPaymentBasicModel[] = [];
    public monthYearOptions: ListMonthYearModel[] = [];
    public authorization: DebtPaymentListAuthorizationResponseDto | null = null;

    constructor(
            responseDto: DebtPaymentListResponseDto,
            requestDto?: Partial<DebtPaymentListRequestDto>) {
        if (requestDto) {
            Object.assign(requestDto, this);
        }

        this.mapFromResponseDto(responseDto);
        this.monthYear = this.monthYearOptions[0];
    }

    public mapFromResponseDto(responseDto: DebtPaymentListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(dp => new DebtPaymentBasicModel(dp)) ?? [];
        this.monthYearOptions = responseDto.monthYearOptions
            .map(myo => new ListMonthYearModel(myo));
        this.authorization = new DebtPaymentListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): DebtPaymentListRequestDto {
        return {
            orderByAscending: this.sortingByAscending,
            orderByField: this.sortingByField,
            month: this.monthYear.month,
            year: this.monthYear.year,
            ignoreMonthYear: this.ignoreMonthYear,
            customerId: this.customerId,
            createdUserId: this.createdUserId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class DebtPaymentDetailModel implements IDebtDetailModel {
    public readonly id: number;
    public readonly amount: number;
    public readonly note: string | null;
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly createdDateTime: DateTimeDisplayModel;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly createdUser: UserBasicModel;
    public readonly authorization: DebtPaymentAuthorizationModel;
    public readonly updateHistories: DebtPaymentUpdateHistoryModel[];

    constructor(responseDto: DebtPaymentDetailResponseDto) {
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.createdDateTime = new DateTimeDisplayModel(responseDto.createdDateTime);
        this.note = responseDto.note;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.isLocked = responseDto.isLocked;
        this.authorization = new DebtPaymentAuthorizationModel(responseDto.authorization!);
        this.updateHistories = responseDto.updateHistories
            ?.map(uh => new DebtPaymentUpdateHistoryModel(uh))
            ?? [];
    }
}

export class DebtPaymentUpsertModel implements IDebtUpsertModel {
    public id: number = 0;
    public amount: number = 0;
    public note: string = "";
    public customer: CustomerBasicModel | null = null;
    public statsDateTime: IStatsDateTimeInputModel;
    public updatedReason: string = "";
    public readonly authorization: DebtPaymentAuthorizationModel;

    constructor(canSetStatsDateTime: boolean);
    constructor(responseDto: DebtPaymentDetailResponseDto);
    constructor(arg: boolean | DebtPaymentDetailResponseDto) {
        if (typeof arg === "boolean") {
            this.statsDateTime = new StatsDateTimeInputModel(true);
            this.authorization = new DebtPaymentAuthorizationModel(arg);
        } else {
            this.id = arg.id;
            this.amount = arg.amount;
            this.note = arg.note ?? "";
            this.statsDateTime = new StatsDateTimeInputModel(false, arg.statsDateTime);
            this.customer = new CustomerBasicModel(arg.customer);
            this.authorization = new DebtPaymentAuthorizationModel(arg.authorization);
        }
    }
    
    public toRequestDto(): DebtPaymentUpsertRequestDto {
        return {
            amount: this.amount,
            note: this.note || null,
            statsDateTime: this.statsDateTime.toRequestDto(),
            customerId: this.customer?.id ?? 0,
            updatedReason: this.updatedReason || null
        };
    }
}

export class DebtPaymentListAuthorizationModel implements IUpsertableListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: DebtPaymentListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class DebtPaymentAuthorizationModel implements IFinancialEngageableExistingAuthorizationModel{
    public canEdit: boolean = true;
    public canDelete: boolean = false;
    public canSetStatsDateTime: boolean;

    constructor(canSetStatsDateTime: boolean);
    constructor(responseDto: DebtPaymentExistingAuthorizationResponseDto)
    constructor(arg: boolean | DebtPaymentExistingAuthorizationResponseDto) {
        if (typeof arg === "boolean") {
            this.canSetStatsDateTime = arg;
        } else {
            this.canEdit = arg.canEdit;
            this.canDelete = arg.canDelete;
            this.canSetStatsDateTime = arg.canSetStatsDateTime;
        }
    }
}