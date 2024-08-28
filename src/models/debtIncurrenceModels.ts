import type {
    DebtIncurrenceListRequestDto,
    DebtIncurrenceUpsertRequestDto } from "@/services/dtos/requestDtos/debtIncurrenceRequestDtos";
import type {
    DebtIncurrenceBasicResponseDto,
    DebtIncurrenceListResponseDto,
    DebtIncurrenceDetailResponseDto,
    DebtIncurrenceListAuthorizationResponseDto,
    DebtIncurrenceAuthorizationResponseDto } from "@/services/dtos/responseDtos/debtIncurrenceResponseDtos";
import { DebtIncurrenceUpdateHistoryModel } from "./debtIncurrenceUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class DebtBasicModel {
    public id: number;
    public amount: number;
    public incurredDate: string;
    public incurredTime: string;
    public incurredDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: DebtAuthorizationModel | null;

    constructor(responseDto: DebtIncurrenceBasicResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.incurredDate = dateTimeUtility.getDisplayDateString(responseDto.incurredDateTime);
        this.incurredTime = dateTimeUtility.getDisplayTimeString(responseDto.incurredDateTime);
        this.incurredDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.incurredDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new DebtAuthorizationModel(responseDto.authorization);
    }
}

export class DebtListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "IncurredDateTime";
    public monthYear: MonthYearModel;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: DebtBasicModel[] = [];
    public monthYearOptions: MonthYearModel[] = [];
    public authorization: DebtIncurrenceListAuthorizationResponseDto | null = null;

    constructor(responseDto: DebtIncurrenceListResponseDto) {
        this.mapFromResponseDto(responseDto);
        this.monthYear = this.monthYearOptions[0];
    }

    public mapFromResponseDto(responseDto: DebtIncurrenceListResponseDto): void {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new DebtBasicModel(i)) ?? [];
        this.monthYearOptions = responseDto.monthYearOptions
            .map(myo => new MonthYearModel(myo));
        this.authorization = responseDto.authorization &&
            new DebtListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): DebtIncurrenceListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            month: this.monthYear.month,
            year: this.monthYear.year,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class DebtDetailModel {
    public id: number;
    public amount: number;
    public note: string | null;
    public incurredDate: string;
    public incurredTime: string;
    public incurredDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public user: UserBasicModel;
    public authorization: DebtAuthorizationModel;
    public updateHistories: DebtIncurrenceUpdateHistoryModel[] | null;

    constructor(responseDto: DebtIncurrenceDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.note = responseDto.note;
        this.incurredDate = dateTimeUtility
            .getDisplayDateString(responseDto.incurredDateTime);
        this.incurredTime = dateTimeUtility
            .getDisplayTimeString(responseDto.incurredDateTime);
        this.incurredDateTime = dateTimeUtility
            .getDisplayDateTimeString(responseDto.incurredDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.user);
        this.authorization = new DebtAuthorizationModel(responseDto.authorization);
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
                .getHTMLDateTimeInputString(responseDto.incurredDateTime);
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }
    
    public toRequestDto(): DebtIncurrenceUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();

        return {
            amount: this.amount,
            note: this.note,
            incurredDateTime: (this.incurredDateTime || null) && dateTimeUtility
                .getDateTimeISOString(this.incurredDateTime),
            customerId: this.customer?.id ?? null,
            updatingReason: this.updatingReason || null
        };
    }
}

export class DebtListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: DebtIncurrenceListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class DebtAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: DebtIncurrenceAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}