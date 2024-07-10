import type { OrderListRequestDto, OrderUpsertRequestDto } from "@/services/dtos/requestDtos/orderRequestDtos";
import type {
    OrderBasicResponseDto, OrderDetailResponseDto,
    OrderListResponseDto, OrderAuthorizationResponseDto, 
    OrderListAuthorizationResponseDto} from "@/services/dtos/responseDtos/orderResponseDtos";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { OrderItemModel } from "./orderItemModels";
import { OrderPaymentModel, OrderPaymentUpsertModel } from "./orderPaymentModels";
import { OrderPhotoModel } from "./orderPhotoModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class OrderBasicModel {
    public id: number; 
    public orderedDateTime: string;
    public orderedDate: string;
    public orderedTime: string;
    public amount: number;
    public isClosed: boolean;
    public customer: CustomerBasicModel;

    constructor(responseDto: OrderBasicResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        
        this.id = responseDto.id;
        this.orderedDateTime = dateTimeUtility
            .getDisplayDateTimeString(responseDto.orderedDateTime);
        this.orderedDate = dateTimeUtility
            .getDisplayDateString(responseDto.orderedDateTime);
        this.orderedTime = dateTimeUtility
            .getDisplayTimeString(responseDto.orderedDateTime);
        this.amount = responseDto.amount;
        this.isClosed = responseDto.isClosed;
        this.customer = new CustomerBasicModel(responseDto.customer);
    }
}

export class OrderListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "OrderedDateTime";
    public rangeFrom: string = "";
    public rangeTo: string = "";
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: OrderBasicModel[] = [];

    constructor(responseDto?: OrderListResponseDto) {
        if (responseDto) {
            this.pageCount = responseDto.pageCount;
            this.items = responseDto.items.map(i => new OrderBasicModel(i));
        }
    }

    public mapFromResponseDto(responseDto: OrderListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items.map(i => new OrderBasicModel(i));
    }

    public toRequestDto(): OrderListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            rangeFrom: this.rangeFrom || null,
            rangeTo: this.rangeTo || null,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class OrderDetailModel {
    public id: number;
    public orderedDate: string;
    public orderedTime: string;
    public orderedDateTime: string;
    public itemAmount: number;
    public paidAmount: number;
    public note: string;
    public isClosed: boolean;
    public items: OrderItemModel[];
    public customer: CustomerBasicModel;
    public user: UserBasicModel;
    public payments: OrderPaymentModel[];
    public photos: OrderPhotoModel[];

    constructor(responseDto: OrderDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.orderedDate = dateTimeUtility
            .getDisplayDateString(responseDto.orderedDateTime);
        this.orderedTime = dateTimeUtility
            .getDisplayTimeString(responseDto.orderedDateTime);
        this.orderedDateTime = dateTimeUtility
            .getDisplayDateTimeString(responseDto.orderedDateTime);
        this.itemAmount = responseDto.itemAmount;
        this.paidAmount = responseDto.paidAmount;
        this.note = responseDto.note;
        this.isClosed = responseDto.isClosed;
        this.items = responseDto.items?.map(i => new OrderItemModel(i)) ?? [];
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.user);
        this.payments = responseDto.payments?.map(p => new OrderPaymentModel(p)) ?? [];
        this.photos = responseDto.photos?.map(p => new OrderPhotoModel(p)) ?? [];
    }
}

export class OrderUpsertModel {
    public id: number = 0;
    public orderedDateTime: string = "";
    public note: string = "";
    public paidAmount: number = 0;
    public customer: CustomerBasicModel | null = null;
    public items: OrderItemModel[] = [];
    public payment: OrderPaymentUpsertModel | null = null;
    public paidPayments: OrderPaymentModel[] = [];
    public photos: OrderPhotoModel[] = [];

    constructor(responseDto?: OrderDetailResponseDto) {
        if (responseDto) {
            const dateTimeUtility = useDateTimeUtility();

            this.id = responseDto.id;
            this.orderedDateTime = dateTimeUtility
                .getDateTimeHTMLInputElementString(responseDto.orderedDateTime);
            this.note = responseDto.note ?? "";
            this.paidAmount = responseDto.paidAmount;
            this.customer = new CustomerBasicModel(responseDto.customer);
            this.items = responseDto.items?.map(i => new OrderItemModel(i)) ?? [];
            this.paidPayments = (responseDto.payments && responseDto.payments
                .map(p => new OrderPaymentModel(p))) ?? [];
            this.photos = responseDto.photos?.map(p => new OrderPhotoModel(p)) ?? [];
        }
    }

    public get totalAmount(): number {
        return this.items
            .map(i => (i.amount + i.amount * (i.vatPercentage / 100)) * i.quantity)
            .reduce((totalAmount, itemAmount) => totalAmount + itemAmount, 0); 
    }

    public createPayment(): void {
        this.payment = new OrderPaymentUpsertModel();
    }

    public deletePayment(): void {
        this.payment = null;
    }

    public toRequestDto(): OrderUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();

        const requestDto: OrderUpsertRequestDto = {
            orderedDateTime: this.orderedDateTime && dateTimeUtility
                .getRequestDtoDateTimeString(this.orderedDateTime) || null,
            note: this.note || null,
            customerId: (this.customer && this.customer.id) ?? 0,
            payment: this.payment?.toRequestDto() ?? null,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto())
        };
        
        return requestDto;
    }
}

export class OrderAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;
    public canCreatePayment: boolean;

    constructor(responseDto: OrderAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canCreatePayment = responseDto.canCreatePayment;
    }
}

export class OrderListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: OrderListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}