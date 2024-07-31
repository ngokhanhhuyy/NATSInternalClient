import type {
    TreatmentListRequestDto,
    TreatmentUpsertRequestDto } from "@/services/dtos/requestDtos";
import type {
    TreatmentBasicResponseDto,
    TreatmentListResponseDto,
    TreatmentDetailResponseDto,
    TreatmentAuthorizationResponseDto,
    TreatmentListAuthorizationResponseDto,
    TreatmentUpdateHistoryResponseDto,
    TreatmentItemUpdateHistoryDataDto } from "@/services/dtos/responseDtos";
import { TreatmentItemModel } from "./treatmentItemModels";
import { TreatmentPhotoModel } from "./treatmentPhotoModels";
import type { TreatmentUpdateHistoryModel } from "./treatmentUpdateHistoryModels";;
import { CustomerBasicModel } from "./customerModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";
import type { UserBasicModel } from "./userModels";

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

export class TreatmnetDetailModel {
    public id: number;
    public paidDateTime: string;
    public createdDateTime: string;
    public lastUpdatedDateTime: string | null;
    public serviceAmount: number;
    public serviceVatFactor: number;
    public productAmount: number;
    public note: string | null;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public createdUser: UserBasicModel;
    public therapist: UserBasicModel;
    public items: TreatmentItemModel[];
    public photos: TreatmentPhotoModel[];
    public authorization: TreatmentAuthorizationModel;
    public updateHistories: TreatmentUpdateHistoryModel[];
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