import { TreatmentDetailItemModel, TreatmentUpsertItemModel } from "./treatmentItemModels";
import { TreatmentDetailPhotoModel, TreatmentUpsertPhotoModel } from "./treatmentPhotoModels";
import { TreatmentUpdateHistoryModel } from "./treatmentUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { ListMonthYearModel } from "./listMonthYearModels";
import { DateTimeDisplayModel, StatsDateTimeInputModel } from "./dateTimeModels";

export class TreatmentBasicModel implements
        IHasStatsBasicModel {
    public readonly id: number;
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly amountAfterVat: number;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly authorization: TreatmentAuthorizationModel | null;

    constructor(responseDto: ResponseDtos.Treatment.Basic) {
        this.id = responseDto.id;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.amountAfterVat = responseDto.amount;
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new TreatmentAuthorizationModel(responseDto.authorization);
    }
}

export class TreatmentListModel implements IExportProductListModel {
    public sortingByAscending: boolean = false;
    public sortingByField: string = "StatsDateTime";
    public monthYear: ListMonthYearModel | null = null;
    public ignoreMonthYear: boolean = false;
    public createdUserId: number | null = null;
    public customerId: number | null = null;
    public productId: number | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: TreatmentBasicModel[] = [];
    public monthYearOptions: ListMonthYearModel[] = [];
    public authorization: TreatmentListAuthorizationModel | null = null;

    constructor(
            responseDto: ResponseDtos.Treatment.List,
            requestDto?: Partial<RequestDtos.Treatment.List>) {
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

    public mapFromResponseDto(responseDto: ResponseDtos.Treatment.List) {
        this.pageCount = responseDto.pageCount;
        this.items = (responseDto.items ?? []).map(i => new TreatmentBasicModel(i));
        this.monthYearOptions = (responseDto.monthYearOptions ?? [])
            ?.map(myo => new ListMonthYearModel(myo));
        this.authorization = responseDto.authorization &&
            new TreatmentListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): RequestDtos.Treatment.List {
        return {
            sortByAscending: this.sortingByAscending,
            sortByField: this.sortingByField,
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

export class TreatmentDetailModel implements IExportProductDetailModel {
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

    constructor(responseDto: ResponseDtos.Treatment.Detail) {
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
        return this.productAmountBeforeVat + this.productVatAmount +
            this.serviceAmountBeforeVat + this.serviceVatAmount;
    }
}

export class TreatmentUpsertModel implements IExportProductUpsertModel {
    public id: number = 0;
    public statsDateTime: IStatsDateTimeInputModel;
    public serviceAmountBeforeVat: number = 0;
    public serviceVatPercentage: number = 0;
    public note: string = "";
    public customer: CustomerBasicModel | null = null;
    public therapist: UserBasicModel | null = null;
    public items: TreatmentUpsertItemModel[] = [];
    public photos: TreatmentUpsertPhotoModel[] = [];
    public updatedReason: string = "";
    public readonly authorization: TreatmentAuthorizationModel;

    constructor(canSetStatsDateTime: boolean);
    constructor(responseDto: ResponseDtos.Treatment.Detail);
    constructor(arg: boolean | ResponseDtos.Treatment.Detail) {
        if (typeof arg === "boolean") {
            this.statsDateTime = new StatsDateTimeInputModel(true);
            this.authorization = new TreatmentAuthorizationModel(arg);
        } else {
            this.id = arg.id;
            this.statsDateTime = new StatsDateTimeInputModel(false, arg.statsDateTime);
            this.serviceAmountBeforeVat = arg.serviceAmountBeforeVat;
            this.serviceVatPercentage = arg.serviceVatAmount /
                arg.serviceAmountBeforeVat * 100;
            this.note = arg.note ?? "";
            this.customer = new CustomerBasicModel(arg.customer);
            this.therapist = new UserBasicModel(arg.therapist);
            this.items = arg.items?.map(i => new TreatmentUpsertItemModel(i));
            this.photos = arg.photos
                ?.map(p => new TreatmentUpsertPhotoModel(p));
            this.authorization = new TreatmentAuthorizationModel(arg.authorization);
        }
    }

    public get productAmountBeforeVat(): number {
        return this.items.reduce(
            (amount, item) => amount + (item.productAmountPerUnit * item.quantity), 0);
    }

    public get productVatAmount(): number {
        return this.items.reduce(
            (amount, item) => amount + (item.vatAmountPerUnit * item.quantity), 0);
    }

    public get productAmountAfterVat(): number  {
        return this.productAmountBeforeVat + this.productVatAmount;
    }

    public get serviceVatAmount(): number {
        return this.serviceAmountBeforeVat * (this.serviceVatPercentage / 100);
    }

    public get serviceAmountAfterVat(): number {
        return this.serviceAmountBeforeVat + this.serviceVatAmount;
    }

    public get amountBeforeVat(): number {
        return this.productAmountBeforeVat + this.serviceAmountBeforeVat;
    }

    public get vatAmount(): number {
        return this.serviceVatAmount + this.productVatAmount;
    }

    public get amountAfterVat(): number {
        return this.productAmountBeforeVat + this.serviceAmountBeforeVat + this.vatAmount;
    }
    
    public toRequestDto(): RequestDtos.Treatment.Upsert {
        return {
            statsDateTime: this.statsDateTime.toString(),
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

export class TreatmentCreatingAuthorizationModel
        implements IHasStatsExistingAuthorizationModel {
    public readonly canSetStatsDateTime: boolean;

    constructor(responseDto: ResponseDtos.Treatment.ListAuthorization) {
        this.canSetStatsDateTime = responseDto.canCreate;
    }
    canEdit: boolean;
    canDelete: boolean;
}

export class TreatmentAuthorizationModel implements IHasStatsExistingAuthorizationModel {
    public readonly canEdit: boolean = true;
    public readonly canDelete: boolean = false;
    public readonly canSetStatsDateTime: boolean;

    constructor(canSetStatsDateTime: boolean);
    constructor(responseDto: ResponseDtos.Treatment.ExistingAuthorization)
    constructor(arg: boolean | ResponseDtos.Treatment.ExistingAuthorization) {
        if (typeof arg === "boolean") {
            this.canSetStatsDateTime = arg;
        } else {
            this.canEdit = arg.canEdit;
            this.canDelete = arg.canDelete;
            this.canSetStatsDateTime = arg.canSetStatsDateTime;
        }
    }
}