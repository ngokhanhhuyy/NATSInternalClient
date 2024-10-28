import {TreatmentDetailItemModel, TreatmentUpsertItemModel} from "./treatmentItemModels";
import { TreatmentDetailPhotoModel, TreatmentUpsertPhotoModel } from "./treatmentPhotoModels";
import { TreatmentUpdateHistoryModel } from "./treatmentUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
import { DateTimeDisplayModel, DateTimeInputModel } from "./dateTimeModels";

export class TreatmentBasicModel implements IFinancialEngageableBasicModel {
    public readonly id: number;
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly amountAfterVat: number;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly authorization: TreatmentAuthorizationModel | null;

    constructor(responseDto: TreatmentBasicResponseDto) {
        this.id = responseDto.id;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.amountAfterVat = responseDto.amountAfterVat;
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new TreatmentAuthorizationModel(responseDto.authorization);
    }
}

export class TreatmentListModel implements IProductExportableListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "StatsDateTime";
    public monthYear: MonthYearModel | null = null;
    public ignoreMonthYear: boolean = false;
    public createdUserId: number | null = null;
    public customerId: number | null = null;
    public productId: number | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: TreatmentBasicModel[] = [];
    public monthYearOptions: MonthYearModel[] = [];
    public authorization: TreatmentListAuthorizationModel | null = null;

    constructor(
            responseDto: TreatmentListResponseDto,
            requestDto?: Partial<TreatmentListRequestDto>) {
        if (requestDto) {
            Object.keys(requestDto).forEach(key => {
                const value: any = requestDto[key as keyof typeof requestDto];
                this[key as keyof typeof this] = value;
            });
        }
        
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
            month: this.monthYear?.month ?? null,
            year: this.monthYear?.year ?? null,
            ignoreMonthYear: this.ignoreMonthYear,
            createdUserId: this.createdUserId,
            customerId: this.customerId,
            productId: this.productId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class TreatmentDetailModel implements IProductExportableDetailModel {
    public readonly id: number;
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly createdDateTime: DateTimeDisplayModel;
    public readonly serviceAmountBeforeVat: number;
    public readonly serviceVatAmount: number;
    public readonly note: string | null;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly createdUser: UserBasicModel;
    public readonly therapist: UserBasicModel;
    public readonly items: TreatmentDetailItemModel[];
    public readonly photos: TreatmentDetailPhotoModel[];
    public readonly authorization: TreatmentAuthorizationModel;
    public readonly updateHistories: TreatmentUpdateHistoryModel[];

    constructor(responseDto: TreatmentDetailResponseDto) {
        this.id = responseDto.id;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.createdDateTime = new DateTimeDisplayModel(responseDto.createdDateTime);
        this.serviceAmountBeforeVat = responseDto.serviceAmountBeforeVat;
        this.serviceVatAmount = responseDto.serviceVatAmount;
        this.note = responseDto.note;
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.therapist = new UserBasicModel(responseDto.therapist);
        this.items = responseDto.items?.map(i => new TreatmentDetailItemModel(i)) ?? [];
        this.photos = responseDto.photos?.map(p => new TreatmentDetailPhotoModel(p)) ?? [];
        this.authorization = new TreatmentAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories
            ?.map(uh => new TreatmentUpdateHistoryModel(uh)) ?? [];
    }

    public get productAmountBeforeVat(): number {
        let amount: number = 0;
        for (const item of this.items) {
            amount += item.productAmountPerUnit * item.quantity;
        }

        return amount;
    }

    public get productVatAmount(): number {
        let amount: number = 0;
        for (const item of this.items) {
            amount+= item.vatAmountPerUnit * item.quantity;
        }

        return amount;
    }

    public get amountBeforeVat(): number {
        return this.productAmountBeforeVat + this.serviceAmountBeforeVat;
    }

    public get vatAmount(): number {
        return this.serviceVatAmount + this.productVatAmount;
    }

    public get amountAfterVat(): number {
        return this.productAmountBeforeVat + this.productVatAmount;
    }
}

export class TreatmentUpsertModel implements IProductExportableUpsertModel {
    public id: number = 0;
    public statsDateTime: IDateTimeInputModel = new DateTimeInputModel();
    public serviceAmountBeforeVat: number = 0;
    public serviceVatPercentage: number = 0;
    public note: string = "";
    public customer: CustomerBasicModel | null = null;
    public therapist: UserBasicModel | null = null;
    public updatedReason: string = "";
    public items: TreatmentUpsertItemModel[] = [];
    public photos: TreatmentUpsertPhotoModel[] = [];

    constructor(responseDto?: TreatmentDetailResponseDto) {
        if (responseDto) {
            this.statsDateTime.inputDateTime = responseDto.statsDateTime;
            this.serviceAmountBeforeVat = responseDto.serviceAmountBeforeVat;
            this.serviceVatPercentage = responseDto.serviceVatAmount /
                responseDto.serviceAmountBeforeVat;
            this.note = responseDto.note ?? "";
            this.customer = new CustomerBasicModel(responseDto.customer);
            this.therapist = new UserBasicModel(responseDto.therapist);
            this.items = responseDto.items?.map(i => new TreatmentUpsertItemModel(i));
            this.photos = responseDto.photos
                ?.map(p => new TreatmentUpsertPhotoModel(p));
        }
    }
    
    public toRequestDto(): TreatmentUpsertRequestDto {
        return {
            statsDateTime: this.statsDateTime.toRequestDto(),
            serviceAmountBeforeVat: this.serviceAmountBeforeVat,
            serviceVatFactor: this.serviceVatPercentage / 100,
            note: this.note || null,
            customerId: this.customer?.id ?? null,
            therapistId: this.therapist?.id ?? null,
            updatedReason: this.updatedReason || null,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto())
        };
    }
}

export class TreatmentListAuthorizationModel implements IUpsertableListAuthorizationModel {
    public readonly canCreate: boolean;

    constructor(responseDto: TreatmentListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class TreatmentAuthorizationModel implements IFinancialEngageableAuthorizationModel {
    public readonly canEdit: boolean;
    public readonly canDelete: boolean;
    public readonly canSetStatsDateTime: boolean;

    constructor(responseDto: TreatmentAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetStatsDateTime = responseDto.canSetStatsDateTime;
    }
}