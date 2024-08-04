import type {
    DebtListRequestDto,
    DebtUpsertRequestDto } from "@/services/dtos/requestDtos/debtRequestDtos";
import type {
    DebtBasicResponseDto,
    DebtListResponseDto,
    DebtDetailResponseDto,
    DebtListAuthorizationResponseDto,
    DebtAuthorizationResponseDto } from "@/services/dtos/responseDtos/debtResponseDtos";
import { Model } from "./baseModels";
import { DebtUpdateHistoryModel } from "./debtUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";

export class DebtBasicModel extends Model {
    public id: number;
    public amount: number;
    public incurredDate: string;
    public incurredTime: string;
    public incurredDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: DebtAuthorizationModel | null;

    constructor(responseDto: DebtBasicResponseDto) {
        super();
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.incurredDate = this.convertToDisplayDateString(responseDto.incurredDateTime);
        this.incurredTime = this.convertToDisplayTimeString(responseDto.incurredDateTime);
        this.incurredDateTime = this.convertToDisplayDateTimeString(responseDto.incurredDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new DebtAuthorizationModel(responseDto.authorization);
    }
}

export class DebtListModel extends Model {
    public orderByAscending: boolean = false;
    public orderByField: string = "IncurredDateTime";
    public rangeFrom: string | null = null;
    public rangeTo: string | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: DebtBasicModel[] = [];
    public authorization: DebtListAuthorizationResponseDto | null = null;

    constructor(responseDto?: DebtListResponseDto) {
        super();
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
        let rangeFrom = null;
        if (this.rangeFrom) {
            rangeFrom = this.convertToDateISOString(this.rangeFrom);
        }

        let rangeTo = null;
        if (this.rangeTo) {
            rangeTo = this.convertToDateISOString(this.rangeTo);
        }

        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            rangeFrom: rangeFrom,
            rangeTo: rangeTo,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class DebtDetailModel extends Model {
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
    public updateHistories: DebtUpdateHistoryModel[] | null;

    constructor(responseDto: DebtDetailResponseDto) {
        super();
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.note = responseDto.note;
        this.incurredDate = this.convertToDisplayDateString(responseDto.incurredDateTime);
        this.incurredTime = this.convertToDisplayTimeString(responseDto.incurredDateTime);
        this.incurredDateTime = this.convertToDisplayDateTimeString(responseDto.incurredDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.user);
        this.authorization = new DebtAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new DebtUpdateHistoryModel(uh));
    }
}

export class DebtUpsertModel extends Model {
    public id: number = 0;
    public amount: number = 0;
    public note: string = "";
    public incurredDateTime: string = "";
    public customer: CustomerBasicModel | null = null;
    public updatingReason: string = "";

    constructor(responseDto?: DebtDetailResponseDto) {
        super();
        if (responseDto) {
            this.id = responseDto.id;
            this.amount = responseDto.amount;
            this.note = responseDto.note ?? "";
            this.incurredDateTime = this.convertToHTMLDateTimeInputString(responseDto.incurredDateTime);
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }
    
    public toRequestDto(): DebtUpsertRequestDto {
        return {
            amount: this.amount,
            note: this.note,
            incurredDateTime: (this.incurredDateTime || null) && this
                .convertToDateTimeISOString(this.incurredDateTime),
            customerId: this.customer?.id ?? null,
            updatingReason: this.updatingReason || null
        };
    }
}

export class DebtListAuthorizationModel extends Model {
    public canCreate: boolean;

    constructor(responseDto: DebtListAuthorizationResponseDto) {
        super();
        this.canCreate = responseDto.canCreate;
    }
}

export class DebtAuthorizationModel extends Model {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: DebtAuthorizationResponseDto) {
        super();
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}