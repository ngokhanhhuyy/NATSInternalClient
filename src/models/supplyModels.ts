import type { SupplyListRequestDto, SupplyUpsertRequestDto } from "@/services/dtos/requestDtos/supplyRequestDtos";
import type {
    SupplyBasicResponseDto,
    SupplyDetailAuthorizationResponseDto,
    SupplyDetailResponseDto,
    SupplyListResponseDto } from "@/services/dtos/responseDtos/supplyResponseDtos";
import { SupplyItemModel } from "./supplyItemModels";
import { SupplyPhotoModel } from "./supplyPhotoModels";
import { UserBasicModel } from "./userModels";
import { usePhotoUtility } from "@/utilities/photoUtility";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class SupplyBasicModel {
    public id: number;
    public suppliedDate: string;
    public suppliedTime: string;
    public suppliedDateTime: string;
    public totalAmount: number;
    public isClosed: boolean;
    public user: UserBasicModel;
    public firstPhotoUrl: string;
    
    constructor(responseDto: SupplyBasicResponseDto) {
        const photoUtility = usePhotoUtility();
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.suppliedDate = dateTimeUtility
            .toDisplayDate(responseDto.suppliedDateTime)!;
        this.suppliedTime = dateTimeUtility
            .toDisplayTime(responseDto.suppliedDateTime);
        this.suppliedDateTime = dateTimeUtility
            .toDisplayDateTime(responseDto.suppliedDateTime)!;
        this.totalAmount = responseDto.totalAmount;
        this.isClosed = responseDto.isClosed;
        this.user = new UserBasicModel(responseDto.user);
        this.firstPhotoUrl = responseDto.firstPhotoUrl != null
            ? photoUtility.getPhotoUrl(responseDto.firstPhotoUrl)
            : photoUtility.getPhotoUrl("/images/default.jpg");
    }
}

export class SupplyListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "SuppliedDateTime";
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
            rangeFrom: this.rangeFrom,
            rangeTo: this.rangeTo,
            userId: this.userId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class SupplyDetailModel {
    public id: number;
    public suppliedDate: string;
    public suppliedTime: string;
    public shipmentFee: number;
    public itemAmount: number;
    public totalAmount: number;
    public note: string | null;
    public isClosed: boolean;
    public items: SupplyItemModel[];
    public photos: SupplyPhotoModel[];
    public user: UserBasicModel;
    public authorization: SupplyDetailAuthorizationModel;

    constructor(responseDto: SupplyDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        this.id = responseDto.id;
        this.suppliedDate = dateTimeUtility.toDisplayDate(responseDto.suppliedDateTime)!;
        this.suppliedTime = dateTimeUtility.toDisplayTime(responseDto.suppliedDateTime);
        this.shipmentFee = responseDto.shipmentFee;
        this.itemAmount = responseDto.itemAmount;
        this.totalAmount = responseDto.totalAmount;
        this.note = responseDto.note;
        this.isClosed = responseDto.isClosed;
        this.items = responseDto.items?.map(dto => new SupplyItemModel(dto)) || [];
        this.photos = responseDto.photos?.map(dto => new SupplyPhotoModel(dto)) || [];
        this.user = new UserBasicModel(responseDto.user);
        this.authorization = new SupplyDetailAuthorizationModel(responseDto.authorization);
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
    public suppliedDateTime: string = "";
    public shipmentFee: number = 0;
    public paidAmount: number = 0;
    public note: string = "";
    public updateReason: string = "";
    public items: SupplyItemModel[] = [];
    public photos: SupplyPhotoModel[] = [];

    constructor(responseDto?: SupplyDetailResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.suppliedDateTime = responseDto.suppliedDateTime;
            this.shipmentFee = responseDto.shipmentFee;
            this.note = responseDto.note || "";
            this.items = responseDto.items?.map(dto => new SupplyItemModel(dto)) || [];
            this.photos = responseDto.photos?.map(dto => new SupplyPhotoModel(dto)) || [];
        }
    }

    public toRequestDto(): SupplyUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();
        return {
            suppliedDateTime: this.suppliedDateTime &&
                dateTimeUtility.toDateTimeISOString(this.suppliedDateTime),
            shipmentFee: this.shipmentFee,
            note: this.note || null,
            updateReason: this.updateReason || null,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto())
        };
    }
}