import type {
    TreatmentListRequestDto,
    TreatmentUpsertRequestDto } from "@/services/dtos/requestDtos";
import type {
    TreatmentBasicResponseDto,
    TreatmentListResponseDto,
    TreatmentDetailResponseDto,
    TreatmentAuthorizationResponseDto,
    TreatmentListAuthorizationResponseDto } from "@/services/dtos/responseDtos";
import { TreatmentItemModel } from "./treatmentItemModels";
import { TreatmentPhotoModel } from "./treatmentPhotoModels";
import { TreatmentUpdateHistoryModel } from "./treatmentUpdateHistoryModels";;
import { CustomerBasicModel } from "./customerModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";
import { UserBasicModel } from "./userModels";

export class TreatmentBasicModel {
    public id: number;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public amount: number;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: TreatmentAuthorizationModel | null;

    constructor(responseDto: TreatmentBasicResponseDto) {
        this.id = responseDto.id;
        this.paidDate = responseDto.paidDateTime.toDisplayDateString();
        this.paidTime = responseDto.paidDateTime.toDisplayTimeString();
        this.paidDateTime = responseDto.paidDateTime.toDisplayDateTimeString();
        this.amount = responseDto.amount;
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new TreatmentAuthorizationModel(responseDto.authorization);
    }
}

export class TreatmentListModel {
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
        const dateTimeUtil = useDateTimeUtility();

        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            rangeFrom: (this.rangeFrom && dateTimeUtil
                .getRequestDtoDateString(this.rangeFrom)) || null,
            rangeTo: (this.rangeTo && dateTimeUtil
                .getRequestDtoDateString(this.rangeTo)) || null,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class TreatmentDetailModel {
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
        this.id = responseDto.id;
        this.paidDate = responseDto.paidDateTime.toDisplayDateString();
        this.paidTime = responseDto.paidDateTime.toDisplayTimeString();
        this.paidDateTime = responseDto.paidDateTime.toDisplayDateTimeString();
        this.createdDate = responseDto.createdDateTime.toDisplayDateString();
        this.createdTime = responseDto.createdDateTime.toDisplayTimeString();
        this.createdDateTime = responseDto.createdDateTime.toDisplayDateTimeString();
        this.lastUpdatedDate = responseDto.lastUpdatedDateTime?.toDisplayDateString();
        this.lastUpdatedTime = responseDto.lastUpdatedDateTime?.toDisplayTimeString();
        this.lastUpdatedDateTime = responseDto.lastUpdatedDateTime?.toDisplayDateTimeString();
        this.serviceAmount = responseDto.serviceAmount;
        this.serviceVatAmount = responseDto.serviceVatAmount;
        this.productAmount = responseDto.productAmount;
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

export class TreatmentUpsertModel {
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
        if (responseDto) {
            this.paidDateTime = responseDto.paidDateTime.toHTML
        }
    }
    
}

export class TreatmentListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: TreatmentListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class TreatmentAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;
    public canSetPaidDateTime: boolean;

    constructor(responseDto: TreatmentAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetPaidDateTime = responseDto.canSetPaidDateTime;
    }
}