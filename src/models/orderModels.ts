import type { OrderListRequestDto } from "@/services/dtos/requestDtos/orderRequestDtos";
import type {
    OrderBasicResponseDto,
    OrderDetailResponseDto,
    OrderListResponseDto } from "@/services/dtos/responseDtos/orderResponseDtos";
import { CustomerBasicModel } from "./customerModels";
import { OrderItemModel } from "./orderItemModels";
import { OrderPaymentModel, OrderPaymentUpsertModel } from "./orderPaymentModels";
import { OrderPhotoModel } from "./orderPhotoModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class OrderBasicModel {
    public id: number; 
    public orderedDateTime: string;
    public amount: number;
    public isClosed: boolean;
    public customer: CustomerBasicModel;

    constructor(responseDto: OrderBasicResponseDto) {
        this.id = responseDto.id;
        this.orderedDateTime = responseDto.orderedDateTime;
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
    public orderedDateTime: string;
    public itemAmount: number;
    public paidAmount: number;
    public note: string;
    public isClosed: boolean;
    public items: OrderItemModel[];
    public payments: OrderPaymentModel[];
    public photos: OrderPhotoModel[];

    constructor(responseDto: OrderDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.orderedDateTime = dateTimeUtility
            .getDisplayDateTimeString(responseDto.orderedDateTime);
        this.itemAmount = responseDto.itemAmount;
        this.paidAmount = responseDto.paidAmount;
        this.note = responseDto.note;
        this.isClosed = responseDto.isClosed;
        this.items = responseDto.items?.map(i => new OrderItemModel(i)) ?? [];
        this.payments = responseDto.payments?.map(p => new OrderPaymentModel(p)) ?? [];
        this.photos = responseDto.photos?.map(p => new OrderPhotoModel(p)) ?? [];
    }
}

export class OrderUpsertModel {
    public orderedDateTime: string = "";
    public note: string = "";
    public customerId: number = 0;
    public items: OrderItemModel[] = [];
    public payments: OrderPaymentUpsertModel[] = [];
    public photos: OrderPhotoModel[] = [];

    public toRequestDto() {
        const dateTimeUtility = useDateTimeUtility();

        return {
            orderedDateTime: this.orderedDateTime && dateTimeUtility
                .getRequestDtoDateTimeString(this.orderedDateTime),
            note: this.note || null,
            customerId: this.customerId,
            items: this.items.map(i => i.toRequestDto()),
            payments: this.payments.map(p => p.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto())
        };
    }
}