import type { OrderListRequestDto, OrderUpsertRequestDto } from "@/services/dtos/requestDtos/orderRequestDtos";
import type {
    OrderBasicResponseDto, OrderDetailResponseDto,
    OrderListResponseDto, OrderAuthorizationResponseDto, 
    OrderListAuthorizationResponseDto } from "@/services/dtos/responseDtos/orderResponseDtos";
import { OrderItemModel } from "./orderItemModels";
import { OrderPhotoModel } from "./orderPhotoModels";
import { OrderUpdateHistoryModel } from "./orderUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class OrderBasicModel {
    public id: number; 
    public paidDateTime: string;
    public paidDate: string;
    public paidTime: string;
    public amount: number;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: OrderAuthorizationModel | null;

    constructor(responseDto: OrderBasicResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.paidDateTime);
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.paidDateTime);
        this.amount = responseDto.amount;
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new OrderAuthorizationModel(responseDto.authorization);
    }
}

export class OrderListModel {
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
        const dateTimeUtility = useDateTimeUtility();

        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            rangeFrom: (this.rangeFrom || null) && dateTimeUtility
                .getDateISOString(this.rangeFrom),
            rangeTo: (this.rangeTo || null) && dateTimeUtility
                .getDateISOString(this.rangeTo),
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class OrderDetailModel {
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
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.paidDateTime);
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

export class OrderUpsertModel {
    public id: number = 0;
    public paidDateTime: string = "";
    public note: string = "";
    public paidAmount: number = 0;
    public customer: CustomerBasicModel | null = null;
    public items: OrderItemModel[] = [];
    public photos: OrderPhotoModel[] = [];

    constructor(responseDto?: OrderDetailResponseDto) {
        if (responseDto) {
            const dateTimeUtility = useDateTimeUtility();
            
            this.id = responseDto.id;
            this.paidDateTime = dateTimeUtility
                .getDisplayDateTimeString(responseDto.paidDateTime);
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
        const dateTimeUtility = useDateTimeUtility();
        
        return {
            paidDateTime: (this.paidDateTime || null) && dateTimeUtility
                .getDateTimeISOString(this.paidDateTime),
            note: this.note || null,
            customerId: (this.customer && this.customer.id) ?? 0,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto())
        };
    }
}

export class OrderAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;
    public canSetPaidDateTime: boolean;

    constructor(responseDto: OrderAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetPaidDateTime = responseDto.canSetPaidDateTime;
    }
}

export class OrderListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: OrderListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}