import type { SupplyUpsertRequestDto } from "@/services/dtos/requestDtos/supplyRequestDtos";
import type {
    SupplyBasicResponseDto,
    SupplyDetailResponseDto,
    SupplyListResponseDto } from "@/services/dtos/responseDtos/supplyResponseDtos";
import { SupplyItemModel } from "./supplyItemModels";
import { SupplyPhotoModel } from "./supplyPhotoModels";
import { UserBasicModel } from "./userModels";
import { usePhotoUtility } from "@/utilities/photoUtility";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class SupplyBasicModel {
    public id: number;
    public suppliedDateTime: string;
    public totalAmount: number;
    public user: UserBasicModel;
    public firstPhotoUrl: string | null;
    
    constructor(responseDto: SupplyBasicResponseDto) {
        const photoUtility = usePhotoUtility();

        this.id = responseDto.id;
        this.suppliedDateTime = responseDto.suppliedDateTime;
        this.totalAmount = responseDto.totalAmount;
        this.user = new UserBasicModel(responseDto.user);
        this.firstPhotoUrl = responseDto.firstPhotoUrl != null
            ? photoUtility.getPhotoUrl(responseDto.firstPhotoUrl)
            : photoUtility.getPhotoUrl("/images/default.jpg");
    }
}

export class SupplyListModel {
    public orderByAscending: boolean = true;
    public orderByField: string = "suppliedDateTime";
    public rangeFrom: string = "";
    public rangeTo: string = "";
    public page: number = 1;
    public resultsPerPage: number = 15;
    public items: SupplyBasicModel[] = [];
    public pageCount: number = 0;

    public mapFromResponseDto(responseDto: SupplyListResponseDto) {
        this.items = responseDto.items?.map(dto => new SupplyBasicModel(dto)) || [];
        this.pageCount = responseDto.pageCount;
    }
}

export class SupplyDetailModel {
    public id: number;
    public suppliedDateTime: string;
    public shipmentFee: number;
    public paidAmount: number;
    public note: string | null;
    public items: SupplyItemModel[];
    public photos: SupplyPhotoModel[];
    public user: UserBasicModel;

    constructor(responseDto: SupplyDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        this.id = responseDto.id;
        this.suppliedDateTime = dateTimeUtility.toDisplayDateTime(responseDto.suppliedDateTime)!;
        this.shipmentFee = responseDto.shipmentFee;
        this.paidAmount = responseDto.paidAmount;
        this.note = responseDto.note;
        this.items = responseDto.items?.map(dto => new SupplyItemModel(dto)) || [];
        this.photos = responseDto.photos?.map(dto => new SupplyPhotoModel(dto)) || [];
        this.user = new UserBasicModel(responseDto.user);
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
            this.paidAmount = responseDto.paidAmount;
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
            paidAmount: this.paidAmount,
            note: this.note || null,
            updateReason: this.updateReason || null,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto())
        };
    }
}