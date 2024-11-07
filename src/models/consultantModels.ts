import { ConsultantUpdateHistoryModel } from "./consultantUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { ListMonthYearModel } from "./listMonthYearModels";
import { DateTimeDisplayModel, StatsDateTimeInputModel } from "./dateTimeModels";

export class ConsultantBasicModel
        implements IHasCustomerBasicModel<ConsultantExistingAuthorizationModel> {
    public id: number;
    public amountAfterVat: number;
    public statsDateTime: DateTimeDisplayModel;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: ConsultantExistingAuthorizationModel | null;

    constructor(responseDto: ResponseDtos.Consultant.Basic) {
        this.id = responseDto.id;
        this.amountAfterVat = responseDto.amount;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = new ConsultantExistingAuthorizationModel(
            responseDto.authorization!);
    }
}

export class ConsultantListModel implements IHasCustomerListModel<
        ConsultantBasicModel,
        ConsultantExistingAuthorizationModel> {
    public sortByAscending?: boolean;
    public sortByField?: string;
    public monthYear?: ListMonthYearModel;
    public customerId?: number;
    public createdUserId?: number;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: ConsultantBasicModel[] = [];

    constructor(
            responseDto: ResponseDtos.Consultant.List,
            requestDto?: RequestDtos.Consultant.List) {
        if (requestDto) {
            Object.assign(this, requestDto);
        }
        
        this.mapFromResponseDto(responseDto);
    }

    public mapFromResponseDto(responseDto: ResponseDtos.Consultant.List) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new ConsultantBasicModel(i)) ?? [];
    }

    public toRequestDto(): RequestDtos.Consultant.List {
        return {
            orderByAscending: this.sortByAscending,
            orderByField: this.sortByField,
            monthYear: this.monthYear?.toRequestDto(),
            customerId: this.customerId ?? undefined,
            createdUserId: this.createdUserId ?? undefined,
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

export class ConsultantExistingAuthorizationModel
        implements IHasStatsExistingAuthorizationModel {
    public canEdit: boolean = true;
    public canDelete: boolean = false;
    public canSetStatsDateTime: boolean;

    constructor(responseDto: ResponseDtos.Consultant.ExistingAuthorization) {
        if (typeof responseDto === "boolean") {
            this.canSetStatsDateTime = responseDto;
        } else {
            this.canEdit = responseDto.canEdit;
            this.canDelete = responseDto.canDelete;
            this.canSetStatsDateTime = responseDto.canSetStatsDateTime;
        }
    }
}

export class ConsultantCreatingAuthorizationModel
        implements IHasStatsCreatingAuthorizationModel {
    readonly canSetStatsDateTime: boolean;

    constructor(responseDto: ResponseDtos.ConsultantCreating.Authorization) {
        this.canSetStatsDateTime = responseDto.canSetStatsDateTime;
    }
}