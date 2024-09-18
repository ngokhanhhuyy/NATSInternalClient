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
import { UserBasicModel } from "./userModels";
import { ProductBasicModel } from "./productModels";
import { MonthYearModel } from "./monthYearModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

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
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.paidDateTime);
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
    public monthYear: MonthYearModel;
    public ignoreMonthYear: boolean = false;
    public user: UserBasicModel | null = null;
    public customer: CustomerBasicModel | null = null;
    public product: ProductBasicModel | null = null;
    public page: number = 0;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: TreatmentBasicModel[] = [];
    public monthYearOptions: MonthYearModel[] = [];
    public authorization: TreatmentListAuthorizationModel | null = null;

    constructor(responseDto: TreatmentListResponseDto) {
        this.mapFromResponseDto(responseDto);
        this.monthYear = this.monthYearOptions[0];
    }

    public mapFromResponseDto(responseDto: TreatmentListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items &&
            responseDto.items?.map(i => new TreatmentBasicModel(i)) || [];
        this.monthYearOptions = responseDto.monthYearOptions
            ?.map(myo => new MonthYearModel(myo)) ?? [];
        this.authorization = responseDto.authorization &&
            new TreatmentListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): TreatmentListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            month: this.monthYear.month,
            year: this.monthYear.year,
            ignoreMonthYear: this.ignoreMonthYear,
            userId: this.user?.id ?? null,
            customerId: this.customer?.id ?? null,
            productId: this.product?.id ?? null,
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
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.paidDateTime);
        this.createdDate = dateTimeUtility.getDisplayDateString(responseDto.createdDateTime);
        this.createdTime = dateTimeUtility.getDisplayTimeString(responseDto.createdDateTime);
        this.createdDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.createdDateTime);
        this.lastUpdatedDate = responseDto.lastUpdatedDateTime && dateTimeUtility
            .getDisplayDateString(responseDto.lastUpdatedDateTime);
        this.lastUpdatedTime = responseDto.lastUpdatedDateTime && dateTimeUtility
            .getDisplayTimeString(responseDto.lastUpdatedDateTime);
        this.lastUpdatedDateTime = responseDto.lastUpdatedDateTime && dateTimeUtility
            .getDisplayDateTimeString(responseDto.lastUpdatedDateTime);
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
            const dateTimeUtility = useDateTimeUtility();

            this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.paidDateTime);
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
        const dateTimeUtility = useDateTimeUtility();
        
        return {
            paidDateTime: (this.paidDateTime || null) && dateTimeUtility
                .getDateTimeISOString(this.paidDateTime),
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