import type {
    SupplyListRequestDto,
    SupplyUpsertRequestDto } from "@/services/dtos/requestDtos/supplyRequestDtos";
import type {
    SupplyBasicResponseDto,
    SupplyListAuthorizationResponseDto,
    SupplyAuthorizationResponseDto,
    SupplyDetailResponseDto,
    SupplyListResponseDto } from "@/services/dtos/responseDtos";
import { SupplyDetailItemModel, SupplyUpsertItemModel } from "./supplyItemModels";
import { SupplyDetailPhotoModel, SupplyUpsertPhotoModel } from "./supplyPhotoModels";
import {
    SupplyUpdateHistoryModel,
    SupplyItemUpdateHistoryModel } from "./supplyUpdateHistoryModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
import { DateTimeDisplayModel } from "./dateTimeModels";
import type {
    IUpsertableListAuthorizationModel,
    IProductEngageableListModel,
    IFinancialEngageableBasicModel,
    IFinancialEngageableAuthorizationModel,
    IProductEngageableDetailModel,
    IProductEngageableUpsertModel,
    IHasPhotoBasicModel } from "./interfaces";
import { usePhotoUtility } from "@/utilities/photoUtility";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";
import type { SupplyItemRequestDto } from "@/services/dtos/requestDtos";

const dateTimeUtility = useDateTimeUtility();
const photoUtility = usePhotoUtility();

export class SupplyBasicModel implements
        IFinancialEngageableBasicModel<SupplyAuthorizationModel>,
        IHasPhotoBasicModel {
    public readonly id: number;
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly totalAmount: number;
    public readonly isLocked: boolean;
    public readonly user: UserBasicModel;
    public readonly thumbnailUrl: string;
    public readonly authorization: SupplyAuthorizationModel | null;
    
    constructor(responseDto: SupplyBasicResponseDto) {
        this.id = responseDto.id;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.totalAmount = responseDto.amount;
        this.isLocked = responseDto.isLocked;
        this.user = new UserBasicModel(responseDto.createdUser);
        this.thumbnailUrl = responseDto.thumbnailUrl ?? photoUtility.getDefaultPhotoUrl();
        this.authorization = responseDto.authorization &&
            new SupplyAuthorizationModel(responseDto.authorization);
    }
}

export class SupplyListModel implements IProductEngageableListModel<
        SupplyBasicModel,
        SupplyListAuthorizationModel,
        SupplyAuthorizationModel,
        SupplyListRequestDto,
        SupplyListResponseDto> {
    public orderByAscending: boolean = false;
    public orderByField: string = "PaidDateTime";
    public monthYear: MonthYearModel | null = null;
    public ignoreMonthYear: boolean = false;
    public createdUserId: number | null = null;
    public productId: number | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public items: SupplyBasicModel[] = [];
    public pageCount: number = 0;
    public monthYearOptions: MonthYearModel[] = [];
    public authorization: SupplyListAuthorizationModel | null = null;

    constructor(responseDto: SupplyListResponseDto) {
        this.mapFromResponseDto(responseDto);

        if (this.monthYearOptions.length) {
            this.monthYear = this.monthYearOptions[0];
        }
    }

    public mapFromResponseDto(responseDto: SupplyListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = (responseDto.items ?? []).map(dto => new SupplyBasicModel(dto));
        this.monthYearOptions = (responseDto.monthYearOptions ?? [])
            .map(myo => new MonthYearModel(myo));
        this.authorization = new SupplyListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): SupplyListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            month: this.monthYear?.month ?? 0,
            year: this.monthYear?.year ?? 0,
            ignoreMonthYear: this.ignoreMonthYear,
            createdUserId: this.createdUserId,
            productId: this.productId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class SupplyDetailModel implements IProductEngageableDetailModel<
        SupplyDetailItemModel,
        SupplyUpdateHistoryModel,
        SupplyItemUpdateHistoryModel,
        SupplyAuthorizationModel> {
    public readonly id: number;
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly shipmentFee: number;
    public readonly itemAmount: number;
    public readonly totalAmount: number;
    public readonly note: string | null;
    public readonly createdDateTime: DateTimeDisplayModel;
    public readonly isLocked: boolean;
    public readonly items: SupplyDetailItemModel[];
    public readonly photos: SupplyDetailPhotoModel[];
    public readonly createdUser: UserBasicModel;
    public readonly authorization: SupplyAuthorizationModel;
    public readonly updateHistories: SupplyUpdateHistoryModel[] | null;

    constructor(responseDto: SupplyDetailResponseDto) {
        this.id = responseDto.id;;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.shipmentFee = responseDto.shipmentFee;
        this.itemAmount = responseDto.itemAmount;
        this.totalAmount = responseDto.amount;
        this.note = responseDto.note;
        this.createdDateTime = new DateTimeDisplayModel(responseDto.createdDateTime);
        this.isLocked = responseDto.isLocked;
        this.items = responseDto.items?.map(dto => new SupplyDetailItemModel(dto)) || [];
        this.photos = responseDto.photos?.map(dto => new SupplyDetailPhotoModel(dto)) || [];
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.authorization = new SupplyAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories?.map(uh => new SupplyUpdateHistoryModel(uh));
    }
}

export class SupplyUpsertModel implements IProductEngageableUpsertModel<
        SupplyUpsertItemModel,
        SupplyUpsertRequestDto,
        SupplyItemRequestDto> {
    public id: number = 0;
    public statsDateTime: string = "";
    public shipmentFee: number = 0;
    public note: string = "";
    public updatedReason: string = "";
    public items: SupplyUpsertItemModel[] = [];
    public photos: SupplyUpsertPhotoModel[] = [];

    constructor(responseDto?: SupplyDetailResponseDto) {
        if (responseDto) {
            this.id = responseDto.id;
            this.statsDateTime = dateTimeUtility
                .getHTMLDateTimeInputString(responseDto.statsDateTime);
            this.shipmentFee = responseDto.shipmentFee;
            this.note = responseDto.note || "";
            this.items = responseDto.items
                ?.map(dto => new SupplyUpsertItemModel(dto)) || [];
            this.photos = responseDto.photos
                ?.map(dto => new SupplyUpsertPhotoModel(dto)) || [];
        }
    }

    public toRequestDto(): SupplyUpsertRequestDto {
        return {
            statsDateTime: (this.statsDateTime || null) && dateTimeUtility
                .getDateTimeISOString(this.statsDateTime),
            shipmentFee: this.shipmentFee,
            note: this.note || null,
            updatedReason: this.updatedReason || null,
            items: this.items.map(i => i.toRequestDto()),
            photos: this.photos.map(p => p.toRequestDto())
        };
    }
}

export class SupplyListAuthorizationModel implements IUpsertableListAuthorizationModel {
    public readonly canCreate: boolean;

    constructor(responseDto: SupplyListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class SupplyAuthorizationModel implements IFinancialEngageableAuthorizationModel {
    public readonly canEdit: boolean;
    public readonly canDelete: boolean;
    public readonly canSetStatsDateTime: boolean;

    constructor(responseDto: SupplyAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetStatsDateTime = responseDto.canSetStatsDateTime;
    }
}