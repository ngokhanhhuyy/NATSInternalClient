import type {
    OrderItemRequestDto,
    OrderListRequestDto, OrderPhotoRequestDto,
    OrderUpsertRequestDto
} from "@/services/dtos/requestDtos";
import type {
    OrderBasicResponseDto, OrderDetailResponseDto,
    OrderListResponseDto, OrderAuthorizationResponseDto,
    OrderListAuthorizationResponseDto } from "@/services/dtos/responseDtos";
import { OrderDetailItemModel, OrderUpsertItemModel } from "./orderItemModels";
import { OrderDetailPhotoModel, OrderUpsertPhotoModel } from "./orderPhotoModels";
import {
    OrderUpdateHistoryModel,
    OrderItemUpdateHistoryModel } from "./orderUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
import { DateTimeDisplayModel } from "./dateTimeModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";
import type {
    IUpsertableListAuthorizationModel,
    IFinancialEngageableBasicModel,
    IFinancialEngageableAuthorizationModel,
    IProductExportableListModel,
    IProductExportableDetailModel,
    IProductExportableUpsertModel } from "./interfaces";

const dateTimeUtility = useDateTimeUtility();

export class OrderBasicModel
        implements IFinancialEngageableBasicModel<OrderAuthorizationModel> {
    public readonly id: number; 
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly amountBeforeVat: number;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly authorization: OrderAuthorizationModel | null;

    constructor(responseDto: OrderBasicResponseDto) {
        this.id = responseDto.id;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.amountBeforeVat = responseDto.amountBeforeVat;
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new OrderAuthorizationModel(responseDto.authorization);
    }
}

export class OrderListModel implements IProductExportableListModel<
        OrderBasicModel,
        OrderListAuthorizationModel,
        OrderAuthorizationModel,
        OrderListRequestDto,
        OrderListResponseDto> {
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
        this.items = (responseDto.items ?? []).map(i => new OrderBasicModel(i));
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

export class OrderDetailModel implements IProductExportableDetailModel<
        OrderDetailItemModel,
        OrderUpdateHistoryModel,
        OrderItemUpdateHistoryModel,
        OrderAuthorizationModel> {
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
    public readonly updateHistories: OrderUpdateHistoryModel[] | null;
    public readonly authorization: OrderAuthorizationModel | null;

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
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new OrderUpdateHistoryModel(uh));
        this.authorization = responseDto.authorization &&
            new OrderAuthorizationModel(responseDto.authorization);
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

export class OrderUpsertModel implements IProductExportableUpsertModel<
        OrderUpsertItemModel,
        OrderUpsertPhotoModel,
        OrderUpsertRequestDto,
        OrderPhotoRequestDto,
        OrderItemRequestDto> {
    public id: number = 0;
    public statsDateTime: string = "";
    public statsDateTimeSpecified: boolean = false;
    public note: string = "";
    public customer: CustomerBasicModel | null = null;
    public items: OrderUpsertItemModel[] = [];
    public photos: OrderUpsertPhotoModel[] = [];
    public updatedReason: string = "";

    constructor(responseDto?: OrderDetailResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.statsDateTime = dateTimeUtility
                .getHTMLDateTimeInputString(responseDto.statsDateTime);
            this.note = responseDto.note ?? "";
            this.customer = new CustomerBasicModel(responseDto.customer);
            this.items = responseDto.items?.map(i => new OrderUpsertItemModel(i)) ?? [];
            this.photos = responseDto.photos?.map(p => new OrderUpsertPhotoModel(p)) ?? [];
        }
    }

    public get productAmountBeforeVat(): number {
        let amount = 0;
        for (const item of this.items) {
            amount += amount + item.productAmountPerUnit * item.quantity;
        }

        return amount;
    }

    public get productVatAmount(): number {
        let amount = 0;
        for (const item of this.items) {
            amount += item.vatAmountPerUnit * item.quantity;
        }

        return amount;
    }

    public toRequestDto(): OrderUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();
        let statsDateTime = null;
        if (this.statsDateTimeSpecified && this.statsDateTime) {
            statsDateTime = dateTimeUtility.getDateTimeISOString(this.statsDateTime);
        }
        
        return {
            statsDateTime: statsDateTime,
            note: this.note || null,
            customerId: (this.customer && this.customer.id) ?? 0,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto()),
            updatedReason: this.updatedReason || null
        };
    }
}

export class OrderAuthorizationModel implements IFinancialEngageableAuthorizationModel {
    public readonly canEdit: boolean;
    public readonly canDelete: boolean;
    public readonly canSetStatsDateTime: boolean;

    constructor(responseDto: OrderAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetStatsDateTime = responseDto.canSetStatsDateTime;
    }
}

export class OrderListAuthorizationModel implements IUpsertableListAuthorizationModel {
    public readonly canCreate: boolean;

    constructor(responseDto: OrderListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}