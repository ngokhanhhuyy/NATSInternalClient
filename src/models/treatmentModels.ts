import type {
    TreatmentListRequestDto,
    TreatmentUpsertRequestDto } from "@/services/dtos/requestDtos";
import type {
    TreatmentBasicResponseDto,
    TreatmentListResponseDto,
    TreatmentDetailResponseDto,
    TreatmentAuthorizationResponseDto,
    TreatmentListAuthorizationResponseDto } from "@/services/dtos/responseDtos";
import { Model } from "./baseModels";
import { TreatmentItemModel } from "./treatmentItemModels";
import { TreatmentPhotoModel } from "./treatmentPhotoModels";
import { TreatmentUpdateHistoryModel } from "./treatmentUpdateHistoryModels";;
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";

export class TreatmentBasicModel extends Model {
    public id: number;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public amount: number;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: TreatmentAuthorizationModel | null;

    constructor(responseDto: TreatmentBasicResponseDto) {
        super();
        this.id = responseDto.id;
        this.paidDate = this.convertToDisplayDateString(responseDto.paidDateTime);
        this.paidTime = this.convertToDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
        this.amount = responseDto.amount;
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new TreatmentAuthorizationModel(responseDto.authorization);
    }
}

export class TreatmentListModel extends Model {
    public orderByAscending: boolean = false;
    public orderByField: string = "PaidDateTime";
    public rangeFrom: string = "";
    public rangeTo: string = "";
    public page: number = 0;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: TreatmentBasicModel[] = [];
    public authorization: TreatmentListAuthorizationModel | null = null;

    public TreatmentListModel(responseDto?: TreatmentListResponseDto) {
        if (responseDto) {
            this.mapFromResponseDto(responseDto);
        }
    }

    public mapFromResponseDto(responseDto: TreatmentListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items &&
            responseDto.items?.map(i => new TreatmentBasicModel(i)) || [];
        this.authorization = responseDto.authorization &&
            new TreatmentListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): TreatmentListRequestDto {
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

export class TreatmentDetailModel extends Model {
    public id: number;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public createdDate: string;
    public createdTime: string;
    public createdDateTime: string;
    public lastUpdatedDate: string | null;
    public lastUpdatedTime: string | null;
    public lastUpdatedDateTime: string | null;
    public serviceAmount: number;
    public serviceVatAmount: number;
    public productAmount: number;
    public totalAmountAfterVAT: number;
    public note: string | null;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public createdUser: UserBasicModel;
    public therapist: UserBasicModel;
    public items: TreatmentItemModel[];
    public photos: TreatmentPhotoModel[];
    public authorization: TreatmentAuthorizationModel;
    public updateHistories: TreatmentUpdateHistoryModel[] | null;

    constructor(responseDto: TreatmentDetailResponseDto) {
        super();
        this.id = responseDto.id;
        this.paidDate = this.convertToDisplayDateString(responseDto.paidDateTime);
        this.paidTime = this.convertToDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
        this.createdDate = this.convertToDisplayDateString(responseDto.createdDateTime);
        this.createdTime = this.convertToDisplayTimeString(responseDto.createdDateTime);
        this.createdDateTime = this.convertToDisplayDateTimeString(responseDto.createdDateTime);
        this.lastUpdatedDate = responseDto.lastUpdatedDateTime && this
            .convertToDisplayDateString(responseDto.lastUpdatedDateTime);
        this.lastUpdatedTime = responseDto.lastUpdatedDateTime && this
            .convertToDisplayTimeString(responseDto.lastUpdatedDateTime);
        this.lastUpdatedDateTime = responseDto.lastUpdatedDateTime && this
            .convertToDisplayDateTimeString(responseDto.lastUpdatedDateTime);
        this.serviceAmount = responseDto.serviceAmount;
        this.serviceVatAmount = responseDto.serviceVatAmount;
        this.productAmount = responseDto.productAmount;
        this.totalAmountAfterVAT = responseDto.totalAmountAfterVAT;
        this.note = responseDto.note;
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.therapist = new UserBasicModel(responseDto.therapist);
        this.items = responseDto.items?.map(i => new TreatmentItemModel(i)) ?? [];
        this.photos = responseDto.photos?.map(p => new TreatmentPhotoModel(p)) ?? [];
        this.authorization = new TreatmentAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories && responseDto
            .updateHistories?.map(uh => new TreatmentUpdateHistoryModel(uh));
    }
}

export class TreatmentUpsertModel extends Model {
    public paidDateTime: string = "";
    public serviceAmount: number = 0;
    public serviceVatPercentage: number = 0;
    public note: string = "";
    public customer: CustomerBasicModel | null = null;
    public therapist: UserBasicModel | null = null;
    public updateReason: string = "";
    public items: TreatmentItemModel[] = [];
    public photos: TreatmentPhotoModel[] = [];

    constructor(responseDto?: TreatmentDetailResponseDto) {
        super();
        if (responseDto) {
            this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
            this.serviceAmount = responseDto.serviceAmount;
            this.serviceVatPercentage = Math.round(responseDto.serviceVatFactor * 100);
            this.note = responseDto.note ?? "";
            this.customer = new CustomerBasicModel(responseDto.customer);
            this.therapist = new UserBasicModel(responseDto.therapist);
            this.items = responseDto.items?.map(i => new TreatmentItemModel(i));
            this.photos = responseDto.photos?.map(p => new TreatmentPhotoModel(p));
        }
    }
    
    public toRequestDto(): TreatmentUpsertRequestDto {
        return {
            paidDateTime: (this.paidDateTime || null) && this
                .convertToDateTimeISOString(this.paidDateTime),
            serviceAmount: this.serviceAmount,
            serviceVatFactor: this.serviceVatPercentage / 100,
            note: this.note || null,
            customerId: this.customer?.id ?? null,
            therapistId: this.therapist?.id ?? null,
            updateReason: this.updateReason || null,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto())
        };
    }
}

export class TreatmentListAuthorizationModel extends Model {
    public canCreate: boolean;

    constructor(responseDto: TreatmentListAuthorizationResponseDto) {
        super();
        this.canCreate = responseDto.canCreate;
    }
}

export class TreatmentAuthorizationModel extends Model {
    public canEdit: boolean;
    public canDelete: boolean;
    public canSetPaidDateTime: boolean;

    constructor(responseDto: TreatmentAuthorizationResponseDto) {
        super();
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetPaidDateTime = responseDto.canSetPaidDateTime;
    }
}