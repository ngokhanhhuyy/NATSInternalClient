import type { OrderListRequestDto, OrderUpsertRequestDto } from "@/services/dtos/requestDtos/orderRequestDtos";
import type {
    OrderBasicResponseDto, OrderDetailResponseDto,
    OrderListResponseDto, OrderAuthorizationResponseDto, 
    OrderListAuthorizationResponseDto} from "@/services/dtos/responseDtos/orderResponseDtos";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { OrderItemModel } from "./orderItemModels";
import { OrderPhotoModel } from "./orderPhotoModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class OrderBasicModel {
    public id: number; 
    public paidDateTime: string;
    public paidDate: string;
    public paidTime: string;
    public amount: number;
    public isLocked: boolean;
    public customer: CustomerBasicModel;

    constructor(responseDto: OrderBasicResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        
        this.id = responseDto.id;
        this.paidDateTime = dateTimeUtility
            .getDisplayDateTimeString(responseDto.paidDateTime);
        this.paidDate = dateTimeUtility
            .getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility
            .getDisplayTimeString(responseDto.paidDateTime);
        this.amount = responseDto.amount;
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
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

    constructor(responseDto?: OrderListResponseDto) {
        if (responseDto) {
            this.pageCount = responseDto.pageCount;
            this.items = responseDto.items?.map(i => new OrderBasicModel(i)) ?? [];
        }
    }

    public mapFromResponseDto(responseDto: OrderListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new OrderBasicModel(i)) ?? [];
    }

    public toRequestDto(): OrderListRequestDto {
        const dateTimeUltility = useDateTimeUtility();

        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            rangeFrom: this.rangeFrom && dateTimeUltility
                .getRequestDtoDateTimeString(this.rangeFrom),
            rangeTo: this.rangeTo && dateTimeUltility
            .getRequestDtoDateTimeString(this.rangeTo),
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

    constructor(responseDto: OrderDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.paidDate = dateTimeUtility
            .getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility
            .getDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = dateTimeUtility
            .getDisplayDateTimeString(responseDto.paidDateTime);
        this.itemAmount = responseDto.itemAmount;
        this.paidAmount = responseDto.paidAmount;
        this.note = responseDto.note;
        this.isLocked = responseDto.isLocked;
        this.items = responseDto.items?.map(i => new OrderItemModel(i)) ?? [];
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.user);
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
    public photos: OrderPhotoModel[] = [];

    constructor(responseDto?: OrderDetailResponseDto) {
        if (responseDto) {
            const dateTimeUtility = useDateTimeUtility();

            this.id = responseDto.id;
            this.orderedDateTime = dateTimeUtility
                .getDateTimeHTMLInputElementString(responseDto.paidDateTime);
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

        const requestDto: OrderUpsertRequestDto = {
            paidDateTime: this.orderedDateTime && dateTimeUtility
                .getRequestDtoDateTimeString(this.orderedDateTime) || null,
            note: this.note || null,
            customerId: (this.customer && this.customer.id) ?? 0,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto())
        };
        
        return requestDto;
    }
}

export class OrderAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: OrderAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}

export class OrderListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: OrderListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}