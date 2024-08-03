import type { SupplyListRequestDto, SupplyUpsertRequestDto } from "@/services/dtos/requestDtos/supplyRequestDtos";
import type {
    SupplyBasicResponseDto,
    SupplyDetailAuthorizationResponseDto,
    SupplyDetailResponseDto,
    SupplyListResponseDto } from "@/services/dtos/responseDtos/supplyResponseDtos";
import { SupplyItemModel } from "./supplyItemModels";
import { SupplyPhotoModel } from "./supplyPhotoModels";
import { SupplyUpdateHistoryModel } from "./supplyUpdateHistoryModels";
import { UserBasicModel } from "./userModels";
import { usePhotoUtility } from "@/utilities/photoUtility";

export class SupplyBasicModel {
    public id: number;
    public paidDate: DisplayDateString;
    public paidTime: DisplayTimeString;
    public paidDateTime: DisplayDateTimeString;
    public totalAmount: number;
    public isLocked: boolean;
    public user: UserBasicModel;
    public firstPhotoUrl: string;
    
    constructor(responseDto: SupplyBasicResponseDto) {
        const photoUtility = usePhotoUtility();

        this.id = responseDto.id;
        this.paidDate = responseDto.paidDateTime.toDisplayDateString();
        this.paidTime = responseDto.paidDateTime.toDisplayTimeString();
        this.paidDateTime = responseDto.paidDateTime.toDisplayDateTimeString();
        this.totalAmount = responseDto.totalAmount;
        this.isLocked = responseDto.isLocked;
        this.user = new UserBasicModel(responseDto.user);
        this.firstPhotoUrl = responseDto.firstPhotoUrl != null
            ? photoUtility.getPhotoUrl(responseDto.firstPhotoUrl)
            : photoUtility.getPhotoUrl("/images/default.jpg");
    }
}

export class SupplyListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "PaidDateTime";
    public rangeFrom: HTMLDateInputString = "" as unknown as HTMLDateInputString;
    public rangeTo: HTMLDateInputString = "" as unknown as HTMLDateInputString;
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
            rangeFrom: !this.rangeFrom ? null : this.rangeFrom.toRequestDtoDateString(),
            rangeTo: !this.rangeTo ? null : this.rangeTo.toRequestDtoDateString(),
            userId: this.userId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class SupplyDetailModel {
    public id: number;
    public paidDate: DisplayDateString;
    public paidTime: DisplayTimeString;
    public paidDateTime: DisplayDateTimeString;
    public shipmentFee: number;
    public itemAmount: number;
    public totalAmount: number;
    public note: string | null;
    public createdDate: DisplayDateString;
    public createdTime: DisplayTimeString;
    public createdDateTime: DisplayDateTimeString;
    public updatedDate: DisplayDateString | null;
    public updatedTime: DisplayTimeString | null;
    public updatedDateTime: DisplayDateTimeString | null;
    public isLocked: boolean;
    public items: SupplyItemModel[];
    public photos: SupplyPhotoModel[];
    public user: UserBasicModel;
    public authorization: SupplyDetailAuthorizationModel;
    public updateHistories: SupplyUpdateHistoryModel[] | null;

    constructor(responseDto: SupplyDetailResponseDto) {
        this.id = responseDto.id;
        this.paidDate = responseDto.paidDateTime.toDisplayDateString();
        this.paidTime = responseDto.paidDateTime.toDisplayTimeString();
        this.paidDateTime = responseDto.paidDateTime.toDisplayDateTimeString();
        this.shipmentFee = responseDto.shipmentFee;
        this.itemAmount = responseDto.itemAmount;
        this.totalAmount = responseDto.totalAmount;
        this.note = responseDto.note;
        this.createdDate = responseDto.createdDateTime.toDisplayDateString();
        this.createdTime = responseDto.createdDateTime.toDisplayTimeString();
        this.createdDateTime = responseDto.createdDateTime.toDisplayDateTimeString();
        this.updatedDate = responseDto.updatedDateTime?.toDisplayDateString() ?? null;
        this.updatedTime = responseDto.updatedDateTime?.toDisplayTimeString() ?? null;
        this.updatedDateTime = responseDto.updatedDateTime?.toDisplayDateTimeString() ?? null;
        this.isLocked = responseDto.isLocked;
        this.items = responseDto.items?.map(dto => new SupplyItemModel(dto)) || [];
        this.photos = responseDto.photos?.map(dto => new SupplyPhotoModel(dto)) || [];
        this.user = new UserBasicModel(responseDto.user);
        this.authorization = new SupplyDetailAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories?.map(uh => new SupplyUpdateHistoryModel(uh));
    }
}

export class SupplyDetailAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: SupplyDetailAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}

export class SupplyUpsertModel {
    public id: number = 0;
    public paidDateTime: HTMLDateTimeInputString = "" as unknown as HTMLDateTimeInputString;
    public shipmentFee: number = 0;
    public note: string = "";
    public updateReason: string = "";
    public items: SupplyItemModel[] = [];
    public photos: SupplyPhotoModel[] = [];

    constructor(responseDto?: SupplyDetailResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.paidDateTime = responseDto.paidDateTime.toHTMLDateTimeInputString();
            this.shipmentFee = responseDto.shipmentFee;
            this.note = responseDto.note || "";
            this.items = responseDto.items?.map(dto => new SupplyItemModel(dto)) || [];
            this.photos = responseDto.photos?.map(dto => new SupplyPhotoModel(dto)) || [];
        }
    }

    public toRequestDto(): SupplyUpsertRequestDto {
        return {
            paidDateTime: !this.paidDateTime ? null : this.paidDateTime.toRequestDtoDateTimeString(),
            shipmentFee: this.shipmentFee,
            note: this.note || null,
            updateReason: this.updateReason || null,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto())
        };
    }
}