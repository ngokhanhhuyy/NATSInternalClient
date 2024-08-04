import type {
    DebtPaymentBasicResponseDto,
    DebtPaymentDetailResponseDto,
    DebtPaymentAuthorizationResponseDto, 
    DebtPaymentListResponseDto,
    DebtPaymentListAuthorizationResponseDto} from "@/services/dtos/responseDtos/debtPaymentResponseDtos";
import type {
    DebtPaymentListRequestDto,
    DebtPaymentUpsertRequestDto } from "@/services/dtos/requestDtos/debtPaymentRequestDtos";
import { Model } from "./baseModels";
import { DebtPaymentUpdateHistoryModel } from "./debtPaymentUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";

export class DebtPaymentBasicModel extends Model {
    public id: number;
    public amount: number;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: DebtPaymentAuthorizationModel;

    constructor(responseDto: DebtPaymentBasicResponseDto) {
        super();
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDate = this.convertToDisplayDateString(responseDto.paidDateTime);
        this.paidTime = this.convertToDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.isLocked = responseDto.isLocked;
        this.authorization = new DebtPaymentAuthorizationModel(responseDto.authorization!);
    }
}

export class DebtPaymentListModel extends Model {
    public orderByAscending: boolean = false;
    public orderByField: string = "CreatedDateTime";
    public rangeFrom: string = "";
    public rangeTo: string = ""; 
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: DebtPaymentBasicModel[] = [];
    public authorization: DebtPaymentListAuthorizationResponseDto | null = null;

    public mapFromResponseDto(responseDto: DebtPaymentListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(dp => new DebtPaymentBasicModel(dp)) ?? [];
        this.authorization = new DebtPaymentListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): DebtPaymentListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            rangeFrom: (this.rangeFrom || null) && this
                .convertToDateISOString(this.rangeFrom),
            rangeTo: (this.rangeTo || null) && this
                .convertToDateISOString(this.rangeTo),
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class DebtPaymentDetailModel extends Model {
    public id: number;
    public amount: number;
    public note: string | null;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public user: UserBasicModel;
    public authorization: DebtPaymentAuthorizationModel;
    public updateHistories: DebtPaymentUpdateHistoryModel[] | null;

    constructor(responseDto: DebtPaymentDetailResponseDto) {
        super();
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDate = this.convertToDisplayDateString(responseDto.paidDateTime);
        this.paidTime = this.convertToDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
        this.note = responseDto.note;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.user);
        this.isLocked = responseDto.isLocked;
        this.authorization = new DebtPaymentAuthorizationModel(responseDto.authorization!);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new DebtPaymentUpdateHistoryModel(uh));
    }
}

export class DebtPaymentUpsertModel extends Model {
    public amount: number = 0;
    public note: string = "";
    public paidDateTime: string = "";
    public customer: CustomerBasicModel | null = null;

    constructor(responseDto?: DebtPaymentDetailResponseDto) {
        super();
        if (responseDto) {
            this.amount = responseDto.amount;
            this.note = responseDto.note ?? "";
            this.paidDateTime = this
                .convertToDisplayDateTimeString(responseDto.paidDateTime);
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }
    
    public toRequestDto(): DebtPaymentUpsertRequestDto {
        return {
            amount: this.amount,
            note: this.note || null,
            paidDateTime: (this.paidDateTime || null) && this
                .convertToDateTimeISOString(this.paidDateTime),
            customerId: this.customer?.id ?? 0
        };
    }
}

export class DebtPaymentListAuthorizationModel extends Model {
    public canCreate: boolean;

    constructor(responseDto: DebtPaymentListAuthorizationResponseDto) {
        super();
        this.canCreate = responseDto.canCreate;
    }
}

export class DebtPaymentAuthorizationModel extends Model {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: DebtPaymentAuthorizationResponseDto) {
        super();
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}