import type {
    DebtListRequestDto,
    DebtUpsertRequestDto } from "@/services/dtos/requestDtos/debtRequestDtos";
import type {
    DebtBasicResponseDto,
    DebtListResponseDto,
    DebtDetailResponseDto,
    DebtListAuthorizationResponseDto,
    DebtAuthorizationResponseDto } from "@/services/dtos/responseDtos/debtResponseDtos";
import { DebtUpdateHistoryModel } from "./debtUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";

export class DebtBasicModel {
    public id: number;
    public amount: number;
    public incurredDate: DisplayDateString;
    public incurredTime: DisplayTimeString;
    public incurredDateTime: DisplayDateTimeString;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: DebtAuthorizationModel | null;

    constructor(responseDto: DebtBasicResponseDto) {
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.incurredDate = responseDto.incurredDateTime.toDisplayDateString();
        this.incurredTime = responseDto.incurredDateTime.toDisplayTimeString();
        this.incurredDateTime = responseDto.incurredDateTime.toDisplayDateTimeString();
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new DebtAuthorizationModel(responseDto.authorization);
    }
}

export class DebtListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "IncurredDateTime";
    public rangeFrom: HTMLDateInputString | null = null;
    public rangeTo: HTMLDateInputString | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: DebtBasicModel[] = [];
    public authorization: DebtListAuthorizationResponseDto | null = null;

    constructor(responseDto?: DebtListResponseDto) {
        if (responseDto) {
            this.mapFromResponseDto(responseDto);
        }
    }

    public mapFromResponseDto(responseDto: DebtListResponseDto): void {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new DebtBasicModel(i)) ?? [];
        this.authorization = responseDto.authorization &&
            new DebtListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): DebtListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            rangeFrom: !this.rangeFrom ? null : this.rangeFrom.toRequestDtoDateString(),
            rangeTo: !this.rangeTo ? null : this.rangeTo.toRequestDtoDateString(),
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class DebtDetailModel {
    public id: number;
    public amount: number;
    public note: string | null;
    public incurredDate: DisplayDateString;
    public incurredTime: DisplayTimeString;
    public incurredDateTime: DisplayDateTimeString;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public user: UserBasicModel;
    public authorization: DebtAuthorizationModel;
    public updateHistories: DebtUpdateHistoryModel[] | null;

    constructor(responseDto: DebtDetailResponseDto) {
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.note = responseDto.note;
        this.incurredDateTime = responseDto.incurredDateTime.toDisplayDateTimeString();
        this.incurredDate = responseDto.incurredDateTime.toDisplayDateString();
        this.incurredTime = responseDto.incurredDateTime.toDisplayTimeString();
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.user);
        this.authorization = new DebtAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new DebtUpdateHistoryModel(uh));
    }
}

export class DebtUpsertModel {
    public id: number = 0;
    public amount: number = 0;
    public note: string = "";
    public incurredDateTime: HTMLDateTimeInputString = "" as unknown as HTMLDateTimeInputString;
    public customer: CustomerBasicModel | null = null;
    public updatingReason: string = "";

    constructor(responseDto?: DebtDetailResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.amount = responseDto.amount;
            this.note = responseDto.note ?? "";
            this.incurredDateTime = responseDto.incurredDateTime.toHTMLDateTimeInputString();
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }
    
    public toRequestDto(): DebtUpsertRequestDto {
        return {
            amount: this.amount,
            note: this.note,
            incurredDateTime: !this.incurredDateTime
                ? null
                : this.incurredDateTime.toRequestDtoDateTimeString(),
            customerId: this.customer?.id ?? null,
            updatingReason: this.updatingReason || null
        };
    }
}

export class DebtListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: DebtListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class DebtAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: DebtAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}