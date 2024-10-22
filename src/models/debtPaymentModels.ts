import type {
    DebtPaymentBasicResponseDto,
    DebtPaymentDetailResponseDto,
    DebtPaymentAuthorizationResponseDto, 
    DebtPaymentListResponseDto,
    DebtPaymentListAuthorizationResponseDto} from "@/services/dtos/responseDtos";
import type {
    DebtPaymentListRequestDto,
    DebtPaymentUpsertRequestDto } from "@/services/dtos/requestDtos/debtPaymentRequestDtos";
import { DebtPaymentUpdateHistoryModel } from "./debtPaymentUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { DateTimeDisplayModel, DateTimeInputModel } from "@/models/dateTimeModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
import type {
    IUpsertableListAuthorizationModel,
    IFinancialEngageableAuthorizationModel,
    IDebtListModel,
    IDebtBasicModel,
    IDebtDetailModel,
    IDebtUpsertModel } from "./interfaces";

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
    public orderByAscending: boolean = false;
    public orderByField: string = "CreatedDateTime";
    public monthYear: MonthYearModel;
    public ignoreMonthYear: boolean = false;
    public customerId: number | null = null;
    public createdUserId: number | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: DebtPaymentBasicModel[] = [];
    public monthYearOptions: MonthYearModel[] = [];
    public authorization: DebtPaymentListAuthorizationResponseDto | null = null;

    constructor(responseDto: DebtPaymentListResponseDto) {
        this.mapFromResponseDto(responseDto);
        this.monthYear = this.monthYearOptions[0];
    }

    public mapFromResponseDto(responseDto: DebtPaymentListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(dp => new DebtPaymentBasicModel(dp)) ?? [];
        this.monthYearOptions = responseDto.monthYearOptions
            .map(myo => new MonthYearModel(myo));
        this.authorization = new DebtPaymentListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): DebtPaymentListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
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
    public readonly updateHistories: DebtPaymentUpdateHistoryModel[] | null;

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
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new DebtPaymentUpdateHistoryModel(uh));
    }
}

export class DebtPaymentUpsertModel implements IDebtUpsertModel {
    public id: number = 0;
    public amount: number = 0;
    public note: string = "";
    public customer: CustomerBasicModel | null = null;
    public statsDateTime: IDateTimeInputModel = new DateTimeInputModel();
    public updatedReason: string = "";

    constructor(responseDto?: DebtPaymentDetailResponseDto) {
        if (responseDto) {
            this.amount = responseDto.amount;
            this.note = responseDto.note ?? "";
            this.statsDateTime.inputDateTime = responseDto.statsDateTime;
            this.customer = new CustomerBasicModel(responseDto.customer);
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

export class DebtPaymentAuthorizationModel implements IFinancialEngageableAuthorizationModel{
    public canEdit: boolean;
    public canDelete: boolean;
    public canSetStatsDateTime: boolean;

    constructor(responseDto: DebtPaymentAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetStatsDateTime = responseDto.canSetStatsDateTime;
    }
}