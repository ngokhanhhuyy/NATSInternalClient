import type { SupplyListRequestDto, SupplyUpsertRequestDto } from "@/services/dtos/requestDtos/supplyRequestDtos";
import type {
    SupplyBasicResponseDto,
    SupplyDetailAuthorizationResponseDto,
    SupplyDetailResponseDto,
    SupplyListResponseDto } from "@/services/dtos/responseDtos";
import { Model } from "./baseModels";
import { SupplyItemModel } from "./supplyItemModels";
import { SupplyPhotoModel } from "./supplyPhotoModels";
import { SupplyUpdateHistoryModel } from "./supplyUpdateHistoryModels";
import { UserBasicModel } from "./userModels";

export class SupplyBasicModel extends Model {
    public id: number;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public totalAmount: number;
    public isLocked: boolean;
    public user: UserBasicModel;
    public firstPhotoUrl: string;
    
    constructor(responseDto: SupplyBasicResponseDto) {
        super();
        this.id = responseDto.id;
        this.paidDate = this.convertToDisplayDateString(responseDto.paidDateTime);
        this.paidTime = this.convertToDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
        this.totalAmount = responseDto.totalAmount;
        this.isLocked = responseDto.isLocked;
        this.user = new UserBasicModel(responseDto.user);
        this.firstPhotoUrl = responseDto.firstPhotoUrl ?? this.getDefaultPhotoUrl();
    }
}

export class SupplyListModel extends Model {
    public orderByAscending: boolean = false;
    public orderByField: string = "PaidDateTime";
    public rangeFrom: string = "";
    public rangeTo: string = "";
    public userId: number | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public items: SupplyBasicModel[] = [];
    public pageCount: number = 0;

    public mapFromResponseDto(responseDto: SupplyListResponseDto) {
        this.items = responseDto.items?.map(dto => new SupplyBasicModel(dto)) || [];
        this.pageCount = responseDto.pageCount;
    }

    public toRequestDto(): SupplyListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            rangeFrom: (this.rangeFrom || null) && this
                .convertToDateISOString(this.rangeFrom),
            rangeTo: (this.rangeTo || null) && this
                .convertToDateISOString(this.rangeTo),
            userId: this.userId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class SupplyDetailModel extends Model {
    public id: number;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public shipmentFee: number;
    public itemAmount: number;
    public totalAmount: number;
    public note: string | null;
    public createdDate: string;
    public createdTime: string;
    public createdDateTime: string;
    public updatedDate: string | null;
    public updatedTime: string | null;
    public updatedDateTime: string | null;
    public isLocked: boolean;
    public items: SupplyItemModel[];
    public photos: SupplyPhotoModel[];
    public user: UserBasicModel;
    public authorization: SupplyDetailAuthorizationModel;
    public updateHistories: SupplyUpdateHistoryModel[] | null;

    constructor(responseDto: SupplyDetailResponseDto) {
        super();
        this.id = responseDto.id;
        this.paidDate = this.convertToDisplayDateString(responseDto.paidDateTime);
        this.paidTime = this.convertToDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
        this.shipmentFee = responseDto.shipmentFee;
        this.itemAmount = responseDto.itemAmount;
        this.totalAmount = responseDto.totalAmount;
        this.note = responseDto.note;
        this.createdDate = this.convertToDisplayDateString(responseDto.createdDateTime);
        this.createdTime = this.convertToDisplayTimeString(responseDto.createdDateTime);;
        this.createdDateTime = this.convertToDisplayDateTimeString(responseDto.createdDateTime);;
        this.updatedDate = responseDto.updatedDateTime &&
            this.convertToDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = responseDto.updatedDateTime &&
            this.convertToDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = responseDto.updatedDateTime &&
            this.convertToDisplayDateTimeString(responseDto.updatedDateTime);
        this.isLocked = responseDto.isLocked;
        this.items = responseDto.items?.map(dto => new SupplyItemModel(dto)) || [];
        this.photos = responseDto.photos?.map(dto => new SupplyPhotoModel(dto)) || [];
        this.user = new UserBasicModel(responseDto.user);
        this.authorization = new SupplyDetailAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories?.map(uh => new SupplyUpdateHistoryModel(uh));
    }
}

export class SupplyDetailAuthorizationModel extends Model {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: SupplyDetailAuthorizationResponseDto) {
        super();
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}

export class SupplyUpsertModel extends Model {
    public id: number = 0;
    public paidDateTime: string = "";
    public shipmentFee: number = 0;
    public note: string = "";
    public updateReason: string = "";
    public items: SupplyItemModel[] = [];
    public photos: SupplyPhotoModel[] = [];

    constructor(responseDto?: SupplyDetailResponseDto) {
        super();
        if (responseDto) {
            this.id = responseDto.id;
            this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
            this.shipmentFee = responseDto.shipmentFee;
            this.note = responseDto.note || "";
            this.items = responseDto.items?.map(dto => new SupplyItemModel(dto)) || [];
            this.photos = responseDto.photos?.map(dto => new SupplyPhotoModel(dto)) || [];
        }
    }

    public toRequestDto(): SupplyUpsertRequestDto {
        return {
            paidDateTime: (this.paidDateTime || null) && this
                .convertToDateTimeISOString(this.paidDateTime),
            shipmentFee: this.shipmentFee,
            note: this.note || null,
            updateReason: this.updateReason || null,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto())
        };
    }
}