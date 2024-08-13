import type { SupplyListRequestDto, SupplyUpsertRequestDto } from "@/services/dtos/requestDtos/supplyRequestDtos";
import type {
    SupplyBasicResponseDto,
    SupplyAuthorizationResponseDto,
    SupplyDetailResponseDto,
    SupplyListResponseDto } from "@/services/dtos/responseDtos";
import { SupplyItemModel } from "./supplyItemModels";
import { SupplyPhotoModel } from "./supplyPhotoModels";
import { SupplyUpdateHistoryModel } from "./supplyUpdateHistoryModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
import { usePhotoUtility } from "@/utilities/photoUtility";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class SupplyBasicModel {
    public id: number;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public totalAmount: number;
    public isLocked: boolean;
    public user: UserBasicModel;
    public firstPhotoUrl: string;
    
    constructor(responseDto: SupplyBasicResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        const photoUtility = usePhotoUtility();

        this.id = responseDto.id;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.paidDateTime);
        this.totalAmount = responseDto.totalAmount;
        this.isLocked = responseDto.isLocked;
        this.user = new UserBasicModel(responseDto.user);
        this.firstPhotoUrl = responseDto.firstPhotoUrl ?? photoUtility.getDefaultPhotoUrl();
    }
}

export class SupplyListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "PaidDateTime";
    public monthYear: MonthYearModel;
    public userId: number | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public items: SupplyBasicModel[] = [];
    public pageCount: number = 0;
    public monthYearOptions: MonthYearModel[] = [];

    constructor(responseDto: SupplyListResponseDto) {
        this.mapFromResponseDto(responseDto);
        this.monthYear = this.monthYearOptions[0];
    }

    public mapFromResponseDto(responseDto: SupplyListResponseDto) {
        this.items = responseDto.items?.map(dto => new SupplyBasicModel(dto)) || [];
        this.pageCount = responseDto.pageCount;
        this.monthYearOptions = responseDto.monthYearOptions
            .map(myo => new MonthYearModel(myo));
    }

    public toRequestDto(): SupplyListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            month: this.monthYear && this.monthYear.month,
            year: this.monthYear && this.monthYear.year,
            userId: this.userId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class SupplyDetailModel {
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
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.paidDateTime);
        this.shipmentFee = responseDto.shipmentFee;
        this.itemAmount = responseDto.itemAmount;
        this.totalAmount = responseDto.totalAmount;
        this.note = responseDto.note;
        this.createdDate = dateTimeUtility.getDisplayDateString(responseDto.createdDateTime);
        this.createdTime = dateTimeUtility.getDisplayTimeString(responseDto.createdDateTime);;
        this.createdDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.createdDateTime);;
        this.updatedDate = responseDto.updatedDateTime &&
            dateTimeUtility.getDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = responseDto.updatedDateTime &&
            dateTimeUtility.getDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = responseDto.updatedDateTime &&
            dateTimeUtility.getDisplayDateTimeString(responseDto.updatedDateTime);
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

    constructor(responseDto: SupplyAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}

export class SupplyUpsertModel {
    public id: number = 0;
    public paidDateTime: string = "";
    public shipmentFee: number = 0;
    public note: string = "";
    public updateReason: string = "";
    public items: SupplyItemModel[] = [];
    public photos: SupplyPhotoModel[] = [];

    constructor(responseDto?: SupplyDetailResponseDto) {
        if (responseDto) {
            const dateTimeUtility = useDateTimeUtility();

            this.id = responseDto.id;
            this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.paidDateTime);
            this.shipmentFee = responseDto.shipmentFee;
            this.note = responseDto.note || "";
            this.items = responseDto.items?.map(dto => new SupplyItemModel(dto)) || [];
            this.photos = responseDto.photos?.map(dto => new SupplyPhotoModel(dto)) || [];
        }
    }

    public toRequestDto(): SupplyUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();
        
        return {
            paidDateTime: (this.paidDateTime || null) && dateTimeUtility
                .getDateTimeISOString(this.paidDateTime),
            shipmentFee: this.shipmentFee,
            note: this.note || null,
            updateReason: this.updateReason || null,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto())
        };
    }
}