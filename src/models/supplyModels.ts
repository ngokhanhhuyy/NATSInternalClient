import { SupplyDetailItemModel, SupplyUpsertItemModel } from "./supplyItemModels";
import { SupplyDetailPhotoModel, SupplyUpsertPhotoModel } from "./supplyPhotoModels";
import { SupplyUpdateHistoryModel } from "./supplyUpdateHistoryModels";
import { UserBasicModel } from "./userModels";
import { ListMonthYearModel } from "./listMonthYearModels";
import { DateTimeDisplayModel, DateTimeInputModel } from "./dateTimeModels";
import { usePhotoUtility } from "@/utilities/photoUtility";

const photoUtility = usePhotoUtility();

export class SupplyBasicModel implements IFinancialEngageableBasicModel, IHasPhotoBasicModel {
    public readonly id: number;
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly amountAfterVat: number;
    public readonly isLocked: boolean;
    public readonly user: UserBasicModel;
    public readonly thumbnailUrl: string;
    public readonly authorization: SupplyAuthorizationModel | null;
    
    constructor(responseDto: SupplyBasicResponseDto) {
        this.id = responseDto.id;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.amountAfterVat = responseDto.amountAfterVat;
        this.isLocked = responseDto.isLocked;
        this.user = new UserBasicModel(responseDto.createdUser);
        this.thumbnailUrl = responseDto.thumbnailUrl ?? photoUtility.getDefaultPhotoUrl();
        this.authorization = responseDto.authorization &&
            new SupplyAuthorizationModel(responseDto.authorization);
    }
}

export class SupplyListModel implements IProductEngageableListModel {
    public sortingByAscending: boolean = false;
    public sortingByField: string = "StatsDateTime";
    public monthYear: ListMonthYearModel | null = null;
    public ignoreMonthYear: boolean = false;
    public createdUserId: number | null = null;
    public productId: number | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public items: SupplyBasicModel[] = [];
    public pageCount: number = 0;
    public monthYearOptions: ListMonthYearModel[] = [];
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
            .map(myo => new ListMonthYearModel(myo));
        this.authorization = new SupplyListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): SupplyListRequestDto {
        return {
            orderByAscending: this.sortingByAscending,
            orderByField: this.sortingByField,
            month: this.monthYear?.month ?? null,
            year: this.monthYear?.year ?? null,
            ignoreMonthYear: this.monthYear == null,
            createdUserId: this.createdUserId,
            productId: this.productId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class SupplyDetailModel implements IProductEngageableDetailModel {
    public readonly id: number;
    public readonly statsDateTime: DateTimeDisplayModel;
    public readonly shipmentFee: number;
    public readonly note: string | null;
    public readonly createdDateTime: DateTimeDisplayModel;
    public readonly isLocked: boolean;
    public readonly items: SupplyDetailItemModel[];
    public readonly photos: SupplyDetailPhotoModel[];
    public readonly createdUser: UserBasicModel;
    public readonly authorization: SupplyAuthorizationModel;
    public readonly updateHistories: SupplyUpdateHistoryModel[];

    constructor(responseDto: SupplyDetailResponseDto) {
        this.id = responseDto.id;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.shipmentFee = responseDto.shipmentFee;
        this.note = responseDto.note;
        this.createdDateTime = new DateTimeDisplayModel(responseDto.createdDateTime);
        this.isLocked = responseDto.isLocked;
        this.items = responseDto.items?.map(dto => new SupplyDetailItemModel(dto)) || [];
        this.photos = responseDto.photos?.map(dto => new SupplyDetailPhotoModel(dto)) || [];
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.authorization = new SupplyAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories
            ?.map(uh => new SupplyUpdateHistoryModel(uh)) ?? [];
    }

    public get amount(): number {
        return this.items.reduce((amount, item) => amount + item.productAmount, 0);
    }

    public get lastUpdatedDateTime(): DateTimeDisplayModel | null {
        if (this.updateHistories && this.updateHistories.length) {
            return this.updateHistories[this.updateHistories.length].updatedDateTime;
        }

        return null;
    }
}

export class SupplyUpsertModel implements IProductEngageableUpsertModel {
    public id: number = 0;
    public statsDateTime: IDateTimeInputModel = new DateTimeInputModel();
    public statsDateTimeSpecified: boolean = false;
    public shipmentFee: number = 0;
    public note: string = "";
    public items: SupplyUpsertItemModel[] = [];
    public photos: SupplyUpsertPhotoModel[] = [];
    public updatedReason: string = "";
    public authorization: SupplyAuthorizationModel;

    constructor(canSetStatsDateTime: boolean);
    constructor(responseDto: SupplyDetailResponseDto);
    constructor(arg: boolean | SupplyDetailResponseDto) {
        if (typeof arg === "boolean") {
            this.authorization = new SupplyAuthorizationModel(arg);
        } else {
            this.id = arg.id;
            this.statsDateTime.inputDateTime = arg.statsDateTime;
            this.shipmentFee = arg.shipmentFee;
            this.note = arg.note || "";
            this.items = arg.items
                ?.map(dto => new SupplyUpsertItemModel(dto)) || [];
            this.photos = arg.photos
                ?.map(dto => new SupplyUpsertPhotoModel(dto)) || [];
            this.authorization = new SupplyAuthorizationModel(arg.authorization);
        }
    }

    public toRequestDto(): SupplyUpsertRequestDto {
        let statsDateTime = null;
        if (this.statsDateTimeSpecified) {
            statsDateTime = this.statsDateTime.toRequestDto();
        }

        return {
            statsDateTime: statsDateTime,
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

export class SupplyAuthorizationModel implements IFinancialEngageableExistingAuthorizationModel {
    public readonly canEdit: boolean = true;
    public readonly canDelete: boolean = false;
    public readonly canSetStatsDateTime: boolean;

    constructor(canSetStatsDateTime: boolean);
    constructor(responseDto: SupplyAuthorizationResponseDto)
    constructor(arg: boolean | SupplyAuthorizationResponseDto) {
        if (typeof arg === "boolean") {
            this.canSetStatsDateTime = arg;
        } else {
            this.canEdit = arg.canEdit;
            this.canDelete = arg.canDelete;
            this.canSetStatsDateTime = arg.canSetStatsDateTime;
        }
    }
}