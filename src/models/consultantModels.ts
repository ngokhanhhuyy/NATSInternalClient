import type { RouteLocationRaw } from "vue-router";
import { ConsultantUpdateHistoryModel } from "./consultantUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { ListMonthYearModel, ListMonthYearOptionsModel } from "./listMonthYearModels";
import { DateTimeDisplayModel, StatsDateTimeInputModel } from "./dateTimeModels";
import { ListSortingOptionsModel } from "@models/listSortingModels";

export class ConsultantBasicModel
        implements IHasCustomerBasicModel<ConsultantExistingAuthorizationModel> {
    public id: number;
    public amount: number;
    public statsDateTime: DateTimeDisplayModel;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: ConsultantExistingAuthorizationModel | null;
    public detailRoute: RouteLocationRaw;
    public updateRoute: RouteLocationRaw;

    constructor(responseDto: ResponseDtos.Consultant.Basic) {
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new ConsultantExistingAuthorizationModel( responseDto.authorization);
        this.detailRoute = { name: "consultantDetail", params: { consultantId: this.id } };
        this.updateRoute = { name: "consultantUpdate", params: { consultantId: this.id } };
    }
}

export class ConsultantListModel implements IHasCustomerListModel<
        ConsultantBasicModel,
        ConsultantExistingAuthorizationModel> {
    public sortingByAscending: boolean | undefined;
    public sortingByField: string | undefined;
    public monthYear: ListMonthYearModel | undefined;
    public customerId: number | undefined;
    public createdUserId: number | undefined;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public items: ConsultantBasicModel[] = [];
    public pageCount: number = 0;
    public readonly sortingOptions: ListSortingOptionsModel | undefined;
    public readonly monthYearOptions: ListMonthYearOptionsModel | undefined;
    public readonly canCreate: boolean | undefined;
    public readonly createRoute: RouteLocationRaw = { name: "consultantCreate" };

    constructor(
            listResponseDto: ResponseDtos.Consultant.List,
            sortingOptionsResponseDto?: ResponseDtos.List.SortingOptions,
            monthYearOptionsResponseDto?: ResponseDtos.List.MonthYearOptions,
            canCreate?: boolean,
            requestDto?: RequestDtos.Consultant.List) {
        this.mapFromResponseDto(listResponseDto);
        this.canCreate = canCreate;

        if (sortingOptionsResponseDto) {
            this.sortingOptions = new ListSortingOptionsModel(sortingOptionsResponseDto);
            this.sortingByField = this.sortingOptions.defaultFieldName;
            this.sortingByAscending = this.sortingOptions.defaultAscending;
        }

        if (monthYearOptionsResponseDto) {
            this.monthYearOptions = new ListMonthYearOptionsModel(monthYearOptionsResponseDto);
            this.monthYear = this.monthYearOptions.default;
        }

        if (requestDto) {
            Object.assign(this, requestDto);
        }
    }

    public mapFromResponseDto(responseDto: ResponseDtos.Consultant.List) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new ConsultantBasicModel(i)) ?? [];
    }

    public toRequestDto(): RequestDtos.Consultant.List {
        return {
            sortingByAscending: this.sortingByAscending,
            sortingByField: this.sortingByField,
            monthYear: this.monthYear?.toRequestDto(),
            createdUserId: this.createdUserId,
            customerId: this.customerId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class ConsultantDetailModel implements IHasCustomerDetailModel<
        ConsultantUpdateHistoryModel,
        ConsultantExistingAuthorizationModel> {
    public id: number;
    public amountBeforeVat: number;
    public vatAmount: number;
    public note: string | null;
    public statsDateTime: DateTimeDisplayModel;
    public createdDateTime: DateTimeDisplayModel;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public createdUser: UserBasicModel;
    public authorization: ConsultantExistingAuthorizationModel;
    public updateHistories: ConsultantUpdateHistoryModel[] | null;
    public detailRoute: RouteLocationRaw;
    public updateRoute: RouteLocationRaw;

    constructor(responseDto: ResponseDtos.Consultant.Detail) {
        this.id = responseDto.id;
        this.amountBeforeVat = responseDto.amountBeforeVat;
        this.vatAmount = responseDto.vatAmount;
        this.note = responseDto.note;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.createdDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.authorization = new ConsultantExistingAuthorizationModel(
            responseDto.authorization);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new ConsultantUpdateHistoryModel(uh));
        this.detailRoute = { name: "consultantDetail", params: { consultantId: this.id } };
        this.updateRoute = { name: "consultantUpdate", params: { consultantId: this.id } };
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

export class ConsultantUpsertModel implements IHasCustomerUpsertModel {
    public id: number = 0;
    public amountBeforeVat: number = 0;
    public vatPercentage: number = 0;
    public note: string = "";
    public statsDateTime: IStatsDateTimeInputModel;
    public customer: CustomerBasicModel | null = null;
    public updatedReason: string = "";

    constructor(responseDto?: ResponseDtos.Consultant.Detail) {
        if (!responseDto) {
            this.statsDateTime = new StatsDateTimeInputModel(true);
        } else {
            this.amountBeforeVat = responseDto.amountBeforeVat;
            this.vatPercentage = responseDto.vatAmount / responseDto.amountBeforeVat;
            this.note = responseDto.note ?? "";
            this.statsDateTime = new StatsDateTimeInputModel(false, responseDto.statsDateTime);
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }

    public toRequestDto(): RequestDtos.Consultant.Upsert {
        return {
            amountBeforeVat: this.amountBeforeVat,
            vatAmount: this.amountBeforeVat * this.vatPercentage,
            note: this.note || null,
            statsDateTime: this.statsDateTime.toRequestDto(),
            updatedReason: this.updatedReason || null,
            customerId: this.customer?.id ?? 0
        };
    }
}

export class ConsultantCreatingAuthorizationModel
    implements IHasStatsCreatingAuthorizationModel {
    readonly canSetStatsDateTime: boolean;

    constructor(responseDto: ResponseDtos.Consultant.CreatingAuthorization) {
        this.canSetStatsDateTime = responseDto.canSetStatsDateTime;
    }
}

export class ConsultantExistingAuthorizationModel
        implements IHasStatsExistingAuthorizationModel {
    public canEdit: boolean = true;
    public canDelete: boolean = false;
    public canSetStatsDateTime: boolean;

    constructor(responseDto: ResponseDtos.Consultant.ExistingAuthorization) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetStatsDateTime = responseDto.canSetStatsDateTime;
    }
}