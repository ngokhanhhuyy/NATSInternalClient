import type {
    OrderListRequestDto,
    OrderUpsertRequestDto } from "@/services/dtos/requestDtos";
import type {
    OrderBasicResponseDto, OrderDetailResponseDto,
    OrderListResponseDto, OrderAuthorizationResponseDto, 
    OrderListAuthorizationResponseDto } from "@/services/dtos/responseDtos";
import type { IExportBasicModel, IExportListModel, IExportAuthorizationModel,
    IExportListAuthorizationModel } from "./interfaces/exportModels";
import { OrderItemModel } from "./orderItemModels";
import { OrderPhotoModel } from "./orderPhotoModels";
import { OrderUpdateHistoryModel } from "./orderUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class OrderBasicModel implements IExportBasicModel {
    public readonly id: number; 
    public readonly paidDateTime: string;
    public readonly paidDate: string;
    public readonly paidTime: string;
    public readonly paidDeltaText: string;
    public readonly amount: number;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly authorization: OrderAuthorizationModel | null;

    constructor(responseDto: OrderBasicResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.statsDateTime);
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.statsDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.statsDateTime);
        this.paidDeltaText = dateTimeUtility
            .getDeltaTextRelativeToNow(responseDto.statsDateTime);
        this.amount = responseDto.amount;
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new OrderAuthorizationModel(responseDto.authorization);
    }
}

export class OrderListModel implements
        IExportListModel<OrderListRequestDto, OrderListResponseDto> {
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
    public items: OrderBasicModel[] = [];
    public monthYearOptions: MonthYearModel[] = [];
    public authorization: OrderListAuthorizationModel | null = null;

    constructor(responseDto: OrderListResponseDto, requestDto?: Partial<OrderListRequestDto>) {
        if (requestDto) {
            Object.keys(requestDto).forEach(key => {
                const value: any = requestDto[key as keyof typeof requestDto];
                this[key as keyof typeof this] = value;
            });
        };
        
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
            createdUserId: this.userId,
            customerId: this.customerId,
            productId: this.productId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class OrderDetailModel {
    public readonly id: number;
    public readonly paidDate: string;
    public readonly paidTime: string;
    public readonly paidDateTime: string;
    public readonly createdDate: string;
    public readonly createdTime: string;
    public readonly createdDateTime: string;
    public readonly beforeVatAmount: number;
    public readonly vatAmount: number;
    public readonly afterVatAmount: number;
    public readonly note: string;
    public readonly isLocked: boolean;
    public readonly items: OrderItemModel[];
    public readonly customer: CustomerBasicModel;
    public readonly user: UserBasicModel;
    public readonly photos: OrderPhotoModel[];
    public readonly updateHistories: OrderUpdateHistoryModel[] | null;

    constructor(responseDto: OrderDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.statsDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.statsDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.statsDateTime);
        this.createdDate = dateTimeUtility.getDisplayDateString(responseDto.createdDateTime);
        this.createdTime = dateTimeUtility.getDisplayTimeString(responseDto.createdDateTime);
        this.createdDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.createdDateTime);;
        this.beforeVatAmount = responseDto.amountBeforeVat;
        this.vatAmount = responseDto.vatAmount;
        this.afterVatAmount = responseDto.afterVatAmount;
        this.note = responseDto.note;
        this.isLocked = responseDto.isLocked;
        this.items = responseDto.items?.map(i => new OrderItemModel(i)) ?? [];
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.createdUser);
        this.photos = responseDto.photos?.map(p => new OrderPhotoModel(p)) ?? [];
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new OrderUpdateHistoryModel(uh));
    }
}

export class OrderUpsertModel {
    public id: number = 0;
    public paidDateTime: string = "";
    public paidDateTimeSpecified: boolean = false;
    public note: string = "";
    public customer: CustomerBasicModel | null = null;
    public items: OrderItemModel[] = [];
    public photos: OrderPhotoModel[] = [];
    public updateReason: string = "";

    constructor(responseDto?: OrderDetailResponseDto) {
        if (responseDto) {
            const dateTimeUtility = useDateTimeUtility();
            
            this.id = responseDto.id;
            this.paidDateTime = dateTimeUtility
                .getHTMLDateTimeInputString(responseDto.statsDateTime);
            this.note = responseDto.note ?? "";
            this.customer = new CustomerBasicModel(responseDto.customer);
            this.items = responseDto.items?.map(i => new OrderItemModel(i)) ?? [];
            this.photos = responseDto.photos?.map(p => new OrderPhotoModel(p)) ?? [];
        }
    }

    public get totalAmount(): number {
        return this.items
            .map(i => (i.amount + i.amount * (i.vatPercentage / 100)) * i.quantity)
            .reduce((totalAmount, itemAmount) => totalAmount + itemAmount, 0); 
    }

    public toRequestDto(): OrderUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();
        let paidDateTime = null;
        if (this.paidDateTimeSpecified && this.paidDateTime) {
            paidDateTime = dateTimeUtility.getDateTimeISOString(this.paidDateTime);
        }
        
        return {
            statsDateTime: paidDateTime,
            note: this.note || null,
            customerId: (this.customer && this.customer.id) ?? 0,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto()),
            updatedReason: this.updateReason || null
        };
    }
}

export class OrderAuthorizationModel implements IExportAuthorizationModel {
    public readonly canEdit: boolean;
    public readonly canDelete: boolean;
    public readonly canSetPaidDateTime: boolean;

    constructor(responseDto: OrderAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetPaidDateTime = responseDto.canSetStatsDateTime;
    }
}

export class OrderListAuthorizationModel implements IExportListAuthorizationModel {
    public readonly canCreate: boolean;

    constructor(responseDto: OrderListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}