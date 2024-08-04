import type { OrderListRequestDto, OrderUpsertRequestDto } from "@/services/dtos/requestDtos/orderRequestDtos";
import type {
    OrderBasicResponseDto, OrderDetailResponseDto,
    OrderListResponseDto, OrderAuthorizationResponseDto, 
    OrderListAuthorizationResponseDto } from "@/services/dtos/responseDtos/orderResponseDtos";
import { Model } from "./baseModels";
import { OrderItemModel } from "./orderItemModels";
import { OrderPhotoModel } from "./orderPhotoModels";
import { OrderUpdateHistoryModel } from "./orderUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";

export class OrderBasicModel extends Model {
    public id: number; 
    public paidDateTime: string;
    public paidDate: string;
    public paidTime: string;
    public amount: number;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: OrderAuthorizationModel | null;

    constructor(responseDto: OrderBasicResponseDto) {
        super();
        this.id = responseDto.id;
        this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
        this.paidDate = this.convertToDisplayDateString(responseDto.paidDateTime);
        this.paidTime = this.convertToDisplayTimeString(responseDto.paidDateTime);
        this.amount = responseDto.amount;
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new OrderAuthorizationModel(responseDto.authorization);
    }
}

export class OrderListModel extends Model {
    public orderByAscending: boolean = false;
    public orderByField: string = "PaidDateTime";
    public rangeFrom: string = "";
    public rangeTo: string = "";
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: OrderBasicModel[] = [];
    public authorization: OrderListAuthorizationModel | null = null;

    constructor(responseDto?: OrderListResponseDto) {
        super();
        if (responseDto) {
            this.pageCount = responseDto.pageCount;
            this.items = responseDto.items?.map(i => new OrderBasicModel(i)) ?? [];
            this.authorization = responseDto.authorization &&
                new OrderListAuthorizationModel(responseDto.authorization);
        }
    }

    public mapFromResponseDto(responseDto: OrderListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new OrderBasicModel(i)) ?? [];
    }

    public toRequestDto(): OrderListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            rangeFrom: (this.rangeFrom || null) && this
                .convertToDateISOString(this.rangeFrom),
            rangeTo: (this.rangeTo || null) && this
                .convertToDateISOString(this.rangeTo),
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class OrderDetailModel extends Model {
    public id: number;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public itemAmount: number;
    public paidAmount: number;
    public note: string;
    public isLocked: boolean;
    public items: OrderItemModel[];
    public customer: CustomerBasicModel;
    public user: UserBasicModel;
    public photos: OrderPhotoModel[];
    public updateHistories: OrderUpdateHistoryModel[] | null;

    constructor(responseDto: OrderDetailResponseDto) {
        super();
        this.id = responseDto.id;
        this.paidDate = this.convertToDisplayDateString(responseDto.paidDateTime);
        this.paidTime = this.convertToDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
        this.itemAmount = responseDto.itemAmount;
        this.paidAmount = responseDto.paidAmount;
        this.note = responseDto.note;
        this.isLocked = responseDto.isLocked;
        this.items = responseDto.items?.map(i => new OrderItemModel(i)) ?? [];
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.user);
        this.photos = responseDto.photos?.map(p => new OrderPhotoModel(p)) ?? [];
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new OrderUpdateHistoryModel(uh));
    }
}

export class OrderUpsertModel extends Model {
    public id: number = 0;
    public paidDateTime: string = "";
    public note: string = "";
    public paidAmount: number = 0;
    public customer: CustomerBasicModel | null = null;
    public items: OrderItemModel[] = [];
    public photos: OrderPhotoModel[] = [];

    constructor(responseDto?: OrderDetailResponseDto) {
        super();
        if (responseDto) {
            this.id = responseDto.id;
            this.paidDateTime = this
                .convertToDisplayDateTimeString(responseDto.paidDateTime);
            this.note = responseDto.note ?? "";
            this.paidAmount = responseDto.paidAmount;
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
        return {
            paidDateTime: (this.paidDateTime || null) && this
                .convertToDateTimeISOString(this.paidDateTime),
            note: this.note || null,
            customerId: (this.customer && this.customer.id) ?? 0,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto())
        };
    }
}

export class OrderAuthorizationModel extends Model {
    public canEdit: boolean;
    public canDelete: boolean;
    public canSetPaidDateTime: boolean;

    constructor(responseDto: OrderAuthorizationResponseDto) {
        super();
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetPaidDateTime = responseDto.canSetPaidDateTime;
    }
}

export class OrderListAuthorizationModel extends Model {
    public canCreate: boolean;

    constructor(responseDto: OrderListAuthorizationResponseDto) {
        super();
        this.canCreate = responseDto.canCreate;
    }
}