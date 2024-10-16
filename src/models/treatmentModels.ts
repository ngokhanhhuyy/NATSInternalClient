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
import { MonthYearModel } from "./monthYearModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class TreatmentBasicModel {
    public readonly id: number;
    public readonly paidDate: string;
    public readonly paidTime: string;
    public readonly paidDateTime: string;
    public readonly amount: number;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly authorization: TreatmentAuthorizationModel | null;

    constructor(responseDto: TreatmentBasicResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.statsDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.statsDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.statsDateTime);
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
    public monthYear: MonthYearModel | null = null;
    public ignoreMonthYear: boolean = false;
    public userId: number | null = null;
    public customerId: number | null = null;
    public productId: number | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: TreatmentBasicModel[] = [];
    public monthYearOptions: MonthYearModel[] = [];
    public authorization: TreatmentListAuthorizationModel | null = null;

    constructor(responseDto: TreatmentListResponseDto) {
        this.mapFromResponseDto(responseDto);
        if (this.monthYearOptions.length) {
            this.monthYear = this.monthYearOptions[0];
        }
    }

    public mapFromResponseDto(responseDto: TreatmentListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = (responseDto.items ?? []).map(i => new TreatmentBasicModel(i));
        this.monthYearOptions = (responseDto.monthYearOptions ?? [])
            ?.map(myo => new MonthYearModel(myo));
        this.authorization = responseDto.authorization &&
            new TreatmentListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): TreatmentListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            month: this.monthYear?.month ?? 0,
            year: this.monthYear?.year ?? 0,
            ignoreMonthYear: this.ignoreMonthYear,
            userId: this.userId,
            customerId: this.customerId,
            productId: this.productId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class TreatmentDetailModel {
    public readonly id: number;
    public readonly paidDate: string;
    public readonly paidTime: string;
    public readonly paidDateTime: string;
    public readonly createdDate: string;
    public readonly createdTime: string;
    public readonly createdDateTime: string;
    public readonly lastUpdatedDate: string | null;
    public readonly lastUpdatedTime: string | null;
    public readonly lastUpdatedDateTime: string | null;
    public readonly serviceAmount: number;
    public readonly serviceVatAmount: number;
    public readonly productAmount: number;
    public readonly totalAmountAfterVAT: number;
    public readonly note: string | null;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly createdUser: UserBasicModel;
    public readonly therapist: UserBasicModel;
    public readonly items: TreatmentItemModel[];
    public readonly photos: TreatmentPhotoModel[];
    public readonly authorization: TreatmentAuthorizationModel;
    public readonly updateHistories: TreatmentUpdateHistoryModel[] | null;

    constructor(responseDto: TreatmentDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.statsDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.statsDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.statsDateTime);
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

            this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.statsDateTime);
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
    public readonly canCreate: boolean;

    constructor(responseDto: TreatmentListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class TreatmentAuthorizationModel {
    public readonly canEdit: boolean;
    public readonly canDelete: boolean;
    public readonly canSetPaidDateTime: boolean;

    constructor(responseDto: TreatmentAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetPaidDateTime = responseDto.canSetStatsDateTime;
    }
}