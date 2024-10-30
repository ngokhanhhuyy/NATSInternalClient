import { OrderDetailItemModel, OrderUpsertItemModel } from "./orderItemModels";
import { OrderDetailPhotoModel, OrderUpsertPhotoModel } from "./orderPhotoModels";
import { OrderUpdateHistoryModel  } from "./orderUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
import { DateTimeDisplayModel, DateTimeInputModel } from "./dateTimeModels";

export class OrderBasicModel implements IFinancialEngageableBasicModel {
    public readonly id: number; 
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly amountAfterVat: number;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly authorization: OrderAuthorizationModel | null;

    constructor(responseDto: OrderBasicResponseDto) {
        this.id = responseDto.id;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.amountAfterVat = responseDto.amountAfterVat;
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new OrderAuthorizationModel(responseDto.authorization);
    }
}

export class OrderListModel implements IProductExportableListModel {
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
    public items: OrderBasicModel[] = [];
    public monthYearOptions: MonthYearModel[] = [];
    public authorization: OrderListAuthorizationModel | null = null;

    constructor(responseDto: OrderListResponseDto, requestDto?: Partial<OrderListRequestDto>) {
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

    public mapFromResponseDto(responseDto: OrderListResponseDto): void {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new OrderBasicModel(i)) ?? [];
        this.monthYearOptions = (responseDto.monthYearOptions ?? [])
            .map(myo => new MonthYearModel(myo));
    }

    public toRequestDto(): OrderListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            month: this.monthYear?.month ?? 0,
            year: this.monthYear?.year ?? 0,
            ignoreMonthYear: this.ignoreMonthYear,
            createdUserId: this.createdUserId,
            customerId: this.customerId,
            productId: this.productId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class OrderDetailModel implements IProductExportableDetailModel {
    public readonly id: number;
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly createdDateTime: DateTimeDisplayModel;
    public readonly amountBeforeVat: number;
    public readonly vatAmount: number;
    public readonly note: string;
    public readonly isLocked: boolean;
    public readonly items: OrderDetailItemModel[];
    public readonly customer: CustomerBasicModel;
    public readonly createdUser: UserBasicModel;
    public readonly photos: OrderDetailPhotoModel[];
    public readonly updateHistories: OrderUpdateHistoryModel[];
    public readonly authorization: OrderAuthorizationModel;

    constructor(responseDto: OrderDetailResponseDto) {
        this.id = responseDto.id;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.createdDateTime = new DateTimeDisplayModel(responseDto.createdDateTime);
        this.amountBeforeVat = responseDto.amountBeforeVat;
        this.vatAmount = responseDto.vatAmount;
        this.note = responseDto.note;
        this.isLocked = responseDto.isLocked;
        this.items = responseDto.items?.map(i => new OrderDetailItemModel(i)) ?? [];
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.photos = responseDto.photos?.map(p => new OrderDetailPhotoModel(p)) ?? [];
        this.updateHistories = responseDto.updateHistories
            ?.map(uh => new OrderUpdateHistoryModel(uh)) ?? [];
        this.authorization = new OrderAuthorizationModel(responseDto.authorization);
    }

    public get productAmountBeforeVat(): number {
        let amount: number = 0;
        this.items.forEach(i => amount += i.productAmountPerUnit * i.quantity);
        return amount;
    }

    public get productVatAmount(): number {
        let amount: number = 0;
        this.items.forEach(i => amount+= i.vatAmountPerUnit * i.quantity);
        return amount;
    }

    public get amountAfterVat(): number {
        return this.productAmountBeforeVat + this.productVatAmount;
    }
}

export class OrderUpsertModel implements IProductExportableUpsertModel {
    public id: number = 0;
    public statsDateTime: IDateTimeInputModel = new DateTimeInputModel();
    public statsDateTimeSpecified: boolean = false;
    public note: string = "";
    public customer: CustomerBasicModel | null = null;
    public items: OrderUpsertItemModel[] = [];
    public photos: OrderUpsertPhotoModel[] = [];
    public updatedReason: string = "";
    public readonly authorization: OrderAuthorizationModel;

    constructor(canSetStatsDateTime: boolean);
    constructor(responseDto: OrderDetailResponseDto)
    constructor(arg: boolean | OrderDetailResponseDto) {
        if (typeof arg === "boolean") {
            this.authorization = new OrderAuthorizationModel(arg);
        } else {
            this.id = arg.id;
            this.statsDateTime = new DateTimeInputModel(arg.statsDateTime);
            this.note = arg.note ?? "";
            this.customer = new CustomerBasicModel(arg.customer);
            this.items = arg.items?.map(i => new OrderUpsertItemModel(i)) ?? [];
            this.photos = arg.photos?.map(p => new OrderUpsertPhotoModel(p)) ?? [];
            this.authorization = new OrderAuthorizationModel(arg.authorization);
        }
    }

    public get productAmountBeforeVat(): number {
        return this.items.reduce(
            (amount, item) => amount + item.productAmountPerUnit * item.quantity, 0);
    }

    public get productVatAmount(): number {
        return this.items.reduce(
            (amount, item) => amount + item.vatAmountPerUnit * item.quantity, 0);
    }

    public get productAmountAfterVat(): number  {
        return this.amountBeforeVat + this.productVatAmount;
    }

    public get amountBeforeVat(): number {
        return this.productAmountBeforeVat;
    }

    public get vatAmount(): number {
        return this.productVatAmount;
    }

    public get amountAfterVat(): number {
        return this.productAmountAfterVat;
    }

    public toRequestDto(): OrderUpsertRequestDto {
        const statsDateTime = this.statsDateTime.toRequestDto();
        
        return {
            statsDateTime: this.statsDateTimeSpecified ? statsDateTime : null,
            note: this.note || null,
            customerId: (this.customer && this.customer.id) ?? 0,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto()),
            updatedReason: this.updatedReason || null
        };
    }
}

export class OrderAuthorizationModel implements IFinancialEngageableAuthorizationModel {
    public readonly canEdit: boolean = true;
    public readonly canDelete: boolean = false;
    public readonly canSetStatsDateTime: boolean;

    constructor(canSetStatsDateTime: boolean);
    constructor(responseDto: OrderAuthorizationResponseDto)
    constructor(arg: boolean | OrderAuthorizationResponseDto) {
        if (typeof arg === "boolean") {
            this.canSetStatsDateTime = arg;
        } else {
            this.canEdit = arg.canEdit;
            this.canDelete = arg.canDelete;
            this.canSetStatsDateTime = arg.canSetStatsDateTime;
        }
    }
}

export class OrderListAuthorizationModel implements IUpsertableListAuthorizationModel {
    public readonly canCreate: boolean;

    constructor(responseDto: OrderListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}