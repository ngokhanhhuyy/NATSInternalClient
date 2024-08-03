import type {
    DebtPaymentBasicResponseDto,
    DebtPaymentDetailResponseDto,
    DebtPaymentAuthorizationResponseDto, 
    DebtPaymentListResponseDto,
    DebtPaymentListAuthorizationResponseDto} from "@/services/dtos/responseDtos/debtPaymentResponseDtos";
import type {
    DebtPaymentListRequestDto,
    DebtPaymentUpsertRequestDto } from "@/services/dtos/requestDtos/debtPaymentRequestDtos";
import { DebtPaymentUpdateHistoryModel } from "./debtPaymentUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";

export class DebtPaymentBasicModel {
    public id: number;
    public amount: number;
    public paidDate: DisplayDateString;
    public paidTime: DisplayTimeString;
    public paidDateTime: DisplayDateTimeString;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: DebtPaymentAuthorizationModel;

    constructor(responseDto: DebtPaymentBasicResponseDto) {
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDate = responseDto.paidDateTime.toDisplayDateString();
        this.paidTime = responseDto.paidDateTime.toDisplayTimeString();
        this.paidDateTime = responseDto.paidDateTime.toDisplayDateTimeString();
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.isLocked = responseDto.isLocked;
        this.authorization = new DebtPaymentAuthorizationModel(responseDto.authorization!);
    }
}

export class DebtPaymentListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "CreatedDateTime";
    public rangeFrom: HTMLDateInputString | null = null;
    public rangeTo: HTMLDateInputString | null = null; 
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
            rangeFrom: !this.rangeFrom ? null : this.rangeFrom.toRequestDtoDateString(),
            rangeTo: !this.rangeTo ? null : this.rangeTo.toRequestDtoDateString(),
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class DebtPaymentDetailModel {
    public id: number;
    public amount: number;
    public note: string | null;
    public paidDate: DisplayDateString;
    public paidTime: DisplayTimeString;
    public paidDateTime: DisplayDateTimeString;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public user: UserBasicModel;
    public authorization: DebtPaymentAuthorizationModel;
    public updateHistories: DebtPaymentUpdateHistoryModel[] | null;

    constructor(responseDto: DebtPaymentDetailResponseDto) {
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDate = responseDto.paidDateTime.toDisplayDateString();
        this.paidTime = responseDto.paidDateTime.toDisplayTimeString();
        this.paidDateTime = responseDto.paidDateTime.toDisplayDateTimeString();
        this.note = responseDto.note;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.user);
        this.isLocked = responseDto.isLocked;
        this.authorization = new DebtPaymentAuthorizationModel(responseDto.authorization!);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new DebtPaymentUpdateHistoryModel(uh));
    }
}

export class DebtPaymentUpsertModel {
    public amount: number = 0;
    public note: string = "";
    public paidDateTime: HTMLDateTimeInputString = "" as unknown as HTMLDateTimeInputString;
    public customer: CustomerBasicModel | null = null;

    constructor(responseDto?: DebtPaymentDetailResponseDto) {
        if (responseDto) {
            this.amount = responseDto.amount;
            this.note = responseDto.note ?? "";
            this.paidDateTime = responseDto.paidDateTime.toHTMLDateTimeInputString();
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }
    
    public toRequestDto(): DebtPaymentUpsertRequestDto {
        return {
            amount: this.amount,
            note: this.note || null,
            paidDateTime: !this.paidDateTime ? null : this.paidDateTime.toRequestDtoDateTimeString(),
            customerId: this.customer?.id ?? 0
        };
    }
}

export class DebtPaymentListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: DebtPaymentListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class DebtPaymentAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: DebtPaymentAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}