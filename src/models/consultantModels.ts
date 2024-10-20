import type {
    ConsultantListRequestDto,
    ConsultantUpsertRequestDto } from "@/services/dtos/requestDtos";
import type {
    ConsultantBasicResponseDto,
    ConsultantListResponseDto,
    ConsultantDetailResponseDto,
    ConsultantListAuthorizationResponseDto,
    ConsultantAuthorizationResponseDto } from "@/services/dtos/responseDtos";
import { ConsultantUpdateHistoryModel } from "./consultantUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
import { DateTimeDisplayModel, DateTimeInputModel } from "@/models/dateTimeModels";
import type {
    IUpsertableListAuthorizationModel,
    IFinancialEngageableAuthorizationModel,
    ICustomerEngageableBasicModel,
    ICustomerEngageableListModel,
    ICustomerEngageableDetailModel,
    ICustomerEngageableUpsertModel } from "./interfaces";

export class ConsultantBasicModel
        implements ICustomerEngageableBasicModel<ConsultantAuthorizationModel> {
    public id: number;
    public amount: number;
    public statsDateTime: DateTimeDisplayModel;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: ConsultantAuthorizationModel | null;

    constructor(responseDto: ConsultantBasicResponseDto) {
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = new ConsultantAuthorizationModel(responseDto.authorization!);
    }
}

export class ConsultantListModel implements ICustomerEngageableListModel<
        ConsultantBasicModel,
        ConsultantListAuthorizationModel,
        ConsultantAuthorizationModel,
        ConsultantListRequestDto,
        ConsultantListResponseDto> {
    public orderByAscending: boolean = false;
    public orderByField: string = "PaidDateTime";
    public monthYear: MonthYearModel | null;
    public ignoreMonthYear: boolean = false;
    public customerId: number | null = null;
    public createdUserId: number | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: ConsultantBasicModel[] = [];
    public monthYearOptions: MonthYearModel[] = [];
    public authorization: ConsultantListAuthorizationModel | null = null;

    constructor(responseDto: ConsultantListResponseDto) {
        this.mapFromResponseDto(responseDto);
        this.monthYear = this.monthYearOptions[0];
    }

    public mapFromResponseDto(responseDto: ConsultantListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new ConsultantBasicModel(i)) ?? [];
        this.monthYearOptions = responseDto.monthYearOptions
            .map(myo => new MonthYearModel(myo));
    }

    public toRequestDto(): ConsultantListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            month: this.monthYear?.month ?? 0,
            year: this.monthYear?.year ?? 0,
            ignoreMonthYear: this.ignoreMonthYear,
            customerId: this.customerId,
            createdUserId: this.createdUserId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class ConsultantDetailModel implements ICustomerEngageableDetailModel<
        ConsultantUpdateHistoryModel,
        ConsultantAuthorizationModel> {
    public id: number;
    public amountBeforeVat: number;
    public vatAmount: number;
    public note: string | null;
    public statsDateTime: DateTimeDisplayModel;
    public createdDateTime: DateTimeDisplayModel;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public createdUser: UserBasicModel;
    public authorization: ConsultantAuthorizationModel;
    public updateHistories: ConsultantUpdateHistoryModel[] | null;

    constructor(responseDto: ConsultantDetailResponseDto) {
        this.id = responseDto.id;
        this.amountBeforeVat = responseDto.amountBeforeVat;
        this.vatAmount = responseDto.vatAmount;
        this.note = responseDto.note;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.createdDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.authorization = new ConsultantAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new ConsultantUpdateHistoryModel(uh));
    }

    public get lastUpdatedDateTime(): DateTimeDisplayModel | null {
        if (this.updateHistories?.length) {
            return this.updateHistories[this.updateHistories.length - 1].updatedDateTime;
        }

        return null;
    }

    public get lastUpdatedUser(): UserBasicModel | null {
        if (this.updateHistories?.length) {
            return this.updateHistories[this.updateHistories.length - 1].updatedUser;
        }

        return null;
    }
}

export class ConsultantUpsertModel
        implements ICustomerEngageableUpsertModel<ConsultantUpsertRequestDto> {
    public id: number = 0;
    public amountBeforeVat: number = 0;
    public vatPercentage: number = 0;
    public note: string = "";
    public statsDateTime: IDateTimeInputModel = new DateTimeInputModel();
    public statsDateTimeSpecified: boolean = false;
    public updatedReason: string = "";
    public customer: CustomerBasicModel | null = null;

    constructor(responseDto?: ConsultantDetailResponseDto) {
        if(responseDto) {
            this.amountBeforeVat = responseDto.amountBeforeVat;
            this.vatPercentage = responseDto.vatAmount / responseDto.amountBeforeVat;
            this.note = responseDto.note ?? "";
            this.statsDateTime.inputDateTime = responseDto.statsDateTime;
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }

    public toRequestDto(): ConsultantUpsertRequestDto {
        let statsDateTime = this.statsDateTime.toRequestDto();
        if (!this.statsDateTimeSpecified) {
            statsDateTime = null;
        }

        return {
            amountBeforeVat: this.amountBeforeVat,
            vatAmount: this.amountBeforeVat * this.vatPercentage,
            note: this.note || null,
            statsDateTime: statsDateTime,
            updatedReason: this.updatedReason || null,
            customerId: this.customer?.id ?? 0
        };
    }
}

export class ConsultantAuthorizationModel implements IFinancialEngageableAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;
    public canSetStatsDateTime: boolean;

    constructor(responseDto: ConsultantAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetStatsDateTime = responseDto.canSetStatsDateTime;
    }
}

export class ConsultantListAuthorizationModel
        implements IUpsertableListAuthorizationModel {
    canCreate: boolean;

    constructor(responseDto: ConsultantListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}