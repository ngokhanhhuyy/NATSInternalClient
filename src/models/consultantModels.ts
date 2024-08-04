import type {
    ConsultantListRequestDto,
    ConsultantUpsertRequestDto } from "@/services/dtos/requestDtos";
import type {
    ConsultantBasicResponseDto,
    ConsultantListResponseDto,
    ConsultantDetailResponseDto,
    ConsultantListAuthorizationResponseDto,
    ConsultantAuthorizationResponseDto } from "@/services/dtos/responseDtos/consultantResponseDtos";
import { Model } from "./baseModels";
import { ConsultantUpdateHistoryModel } from "./consultantUpdateHistoryModels";
import { CustomerBasicModel, CustomerUpsertModel } from "./customerModels";
import { UserBasicModel } from "./userModels";

export class ConsultantBasicModel extends Model {
    public id: number;
    public amount: number;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: ConsultantAuthorizationModel | null;

    constructor(responseDto: ConsultantBasicResponseDto) {
        super();
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDate = this.convertToDisplayDateString(responseDto.paidDateTime);
        this.paidTime = this.convertToDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = new ConsultantAuthorizationModel(responseDto.authorization!);
    }
}

export class ConsultantListModel extends Model {
    public orderByAscending: boolean = false;
    public orderByField: string = "CreatedDateTime";
    public rangeFrom: string | null = null;
    public rangeTo: string | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: ConsultantBasicModel[] = [];
    public authorization: ConsultantListAuthorizationModel | null = null;

    public mapFromResponseDto(responseDto: ConsultantListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new ConsultantBasicModel(i)) ?? [];
    }

    public toRequestDto(): ConsultantListRequestDto {
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

export class ConsultantDetailModel extends Model {
    public id: number;
    public amount: number;
    public note: string | null;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public user: UserBasicModel;
    public authorization: ConsultantAuthorizationModel;
    public updateHistories: ConsultantUpdateHistoryModel[] | null;

    constructor(responseDto: ConsultantDetailResponseDto) {
        super();
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.note = responseDto.note;
        this.paidDate = this.convertToDisplayDateString(responseDto.paidDateTime);
        this.paidTime = this.convertToDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.user);
        this.authorization = new ConsultantAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new ConsultantUpdateHistoryModel(uh));
    }
}

export class ConsultantUpsertModel extends Model {
    public amount: number = 0;
    public note: string = "";
    public paidDateTime: string = "";
    public customerId: number = 0;
    public customer: CustomerUpsertModel | null = null;

    constructor(arg: ConsultantDetailResponseDto | CustomerBasicModel) {
        super();
        if (arg instanceof CustomerBasicModel) {
            this.customerId = arg.id;
        } else {
            this.amount = arg.amount;
            this.note = arg.note ?? "";
            this.paidDateTime = this.convertToDisplayDateTimeString(arg.paidDateTime);
        }
    }

    public toRequestDto(): ConsultantUpsertRequestDto {
        let paidDateTime = null;
        if (this.paidDateTime) {
            paidDateTime = this.convertToDateTimeISOString(this.paidDateTime);
        }
        return {
            amount: this.amount,
            note: this.note || null,
            paidDateTime: paidDateTime,
            customerId: this.customerId,
            customer: this.customer?.toRequestDto() ?? null
        };
    }
}

export class ConsultantAuthorizationModel extends Model {
    public canEdit: boolean;
    public canDelete: boolean;
    public canSetPaidDateTime: boolean;

    constructor(responseDto: ConsultantAuthorizationResponseDto) {
        super();
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetPaidDateTime = responseDto.canSetPaidDateTime;
    }
}

export class ConsultantListAuthorizationModel extends Model {
    canCreate: boolean;

    constructor(responseDto: ConsultantListAuthorizationResponseDto) {
        super();
        this.canCreate = responseDto.canCreate;
    }
}