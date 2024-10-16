import type {
    DebtIncurrenceListRequestDto,
    DebtIncurrenceUpsertRequestDto } from "@/services/dtos/requestDtos";
import type {
    DebtIncurrenceBasicResponseDto,
    DebtIncurrenceListResponseDto,
    DebtIncurrenceDetailResponseDto,
    DebtIncurrenceListAuthorizationResponseDto,
    DebtIncurrenceAuthorizationResponseDto } from "@/services/dtos/responseDtos";
import { DebtIncurrenceUpdateHistoryModel } from "./debtIncurrenceUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class DebtIncurrenceBasicModel {
    public readonly id: number;
    public readonly amount: number;
    public readonly incurredDate: string;
    public readonly incurredTime: string;
    public readonly incurredDateTime: string;
    public readonly incurredDeltaText: string;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly authorization: DebtIncurrenceAuthorizationModel | null;

    constructor(responseDto: DebtIncurrenceBasicResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.incurredDate = dateTimeUtility.getDisplayDateString(responseDto.statsDateTime);
        this.incurredTime = dateTimeUtility.getDisplayTimeString(responseDto.statsDateTime);
        this.incurredDateTime = dateTimeUtility
            .getDisplayDateTimeString(responseDto.statsDateTime);
        this.incurredDeltaText = dateTimeUtility
            .getDeltaTextRelativeToNow(responseDto.statsDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new DebtIncurrenceAuthorizationModel(responseDto.authorization);
    }
}

export class DebtIncurrenceListModel {
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

export class DebtIncurrenceDetailModel {
    public id: number;
    public amount: number;
    public note: string | null;
    public incurredDate: string;
    public incurredTime: string;
    public incurredDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public user: UserBasicModel;
    public authorization: DebtIncurrenceAuthorizationModel;
    public updateHistories: DebtIncurrenceUpdateHistoryModel[] | null;

    constructor(responseDto: DebtIncurrenceDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.note = responseDto.note;
        this.incurredDate = dateTimeUtility
            .getDisplayDateString(responseDto.statsDateTime);
        this.incurredTime = dateTimeUtility
            .getDisplayTimeString(responseDto.statsDateTime);
        this.incurredDateTime = dateTimeUtility
            .getDisplayDateTimeString(responseDto.statsDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.createdUser);
        this.authorization = new DebtIncurrenceAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories
                .map(uh => new DebtIncurrenceUpdateHistoryModel(uh));
    }
}

export class DebtIncurrenceUpsertModel {
    public id: number = 0;
    public amount: number = 0;
    public note: string = "";
    public incurredDateTime: string = "";
    public customer: CustomerBasicModel | null = null;
    public updatingReason: string = "";

    constructor(responseDto?: DebtIncurrenceDetailResponseDto) {
        if (responseDto) {
            const dateTimeUtility = useDateTimeUtility();

            this.id = responseDto.id;
            this.amount = responseDto.amount;
            this.note = responseDto.note ?? "";
            this.incurredDateTime = dateTimeUtility
                .getHTMLDateTimeInputString(responseDto.statsDateTime);
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }
    
    public toRequestDto(): DebtIncurrenceUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();

        return {
            amount: this.amount,
            note: this.note,
            statsDateTime: (this.incurredDateTime || null) && dateTimeUtility
                .getDateTimeISOString(this.incurredDateTime),
            customerId: this.customer?.id ?? null,
            updatedReason: this.updatingReason || null
        };
    }
}

export class DebtIncurrenceListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: DebtIncurrenceListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class DebtIncurrenceAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: DebtIncurrenceAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}