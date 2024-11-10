import type { RouteLocationRaw } from "vue-router";
import { ExpenseCategory } from "@enums";
import { ExpenseDetailPhotoModel, ExpenseUpsertPhotoModel } from "./expensePhotoModels";
import { ExpenseUpdateHistoryModel } from "./expenseUpdateHistoryModels";
import { UserBasicModel } from "./userModels";
import { ListMonthYearModel } from "./listMonthYearModels";
import { DateTimeDisplayModel, StatsDateTimeInputModel } from "./dateTimeModels";
import { ListSortingOptionsModel } from "./listSortingModels";
import { ListMonthYearOptionsModel } from "./listMonthYearModels";
import { usePhotoUtility } from "@/utilities/photoUtility";

const photoUtility = usePhotoUtility();

export class ExpenseBasicModel implements
        IHasStatsBasicModel<ExpenseExistingAuthorizationModel>,
        IHasPhotoBasicModel {
    public id: number;
    public amount: number;
    public statsDateTime: DateTimeDisplayModel;
    public category: ExpenseCategory;
    public isLocked: boolean;
    public thumbnailUrl: string;
    public authorization: ExpenseExistingAuthorizationModel | null;
    public readonly detailRoute: RouteLocationRaw;
    public readonly updateRoute: RouteLocationRaw;

    constructor(responseDto: ResponseDtos.Expense.Basic) {
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.category = responseDto.category;
        this.isLocked = responseDto.isLocked;
        this.thumbnailUrl = responseDto.thumbnailUrl ?? photoUtility.getDefaultPhotoUrl();
        this.authorization = responseDto.authorization &&
            new ExpenseExistingAuthorizationModel(responseDto.authorization);
        this.detailRoute = { name: "expenseDetail", params: { expenseId: this.id } };
        this.updateRoute = { name: "expenseUpdate", params: { expenseId: this.id } };
    }
}

export class ExpenseListModel implements IHasStatsListModel<
        ExpenseBasicModel,
        ExpenseExistingAuthorizationModel>  {
    public sortingByAscending: boolean | undefined;
    public sortingByField: string | undefined;
    public monthYear: ListMonthYearModel | undefined;
    public category: ExpenseCategory | null = null;
    public createdUserId: number | undefined;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public items: ExpenseBasicModel[] = [];
    public pageCount: number = 0;
    public readonly sortingOptions: ListSortingOptionsModel | undefined;
    public readonly monthYearOptions: ListMonthYearOptionsModel | undefined;
    public readonly canCreate: boolean | undefined;
    public readonly createRoute: RouteLocationRaw = { name: "expenseCreate" };

    constructor(
            listResponseDto: ResponseDtos.Expense.List,
            sortingOptionsResponseDto?: ResponseDtos.List.SortingOptions,
            monthYearOptionsResponseDto?: ResponseDtos.List.MonthYearOptions,
            canCreate?: boolean,
            requestDto?: RequestDtos.Expense.List) {
        this.mapFromResponseDto(listResponseDto);
        this.canCreate = canCreate;

        if (sortingOptionsResponseDto) {
            this.sortingOptions = new ListSortingOptionsModel(sortingOptionsResponseDto);
            this.sortingByField = this.sortingOptions.defaultFieldName;
            this.sortingByAscending = this.sortingOptions.defaultAscending;
        }

        if (monthYearOptionsResponseDto) {
            this.monthYearOptions = new ListMonthYearOptionsModel(monthYearOptionsResponseDto);
            this.monthYear = this.monthYearOptions.default;
        }

        if (requestDto) {
            Object.assign(this, requestDto);
        }
    }

    public mapFromResponseDto(responseDto: ResponseDtos.Expense.List): void {
        this.items = responseDto.items?.map(i => new ExpenseBasicModel(i)) || [];
        this.pageCount = responseDto.pageCount;
    }

    public toRequestDto(): RequestDtos.Expense.List {
        return {
            sortingByAscending: this.sortingByAscending,
            sortingByField: this.sortingByField,
            monthYear: this.monthYear?.toRequestDto(),
            createdUserId: this.createdUserId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class ExpenseDetailModel implements
        IHasStatsDetailModel<ExpenseUpdateHistoryModel, ExpenseExistingAuthorizationModel>,
        IHasMultiplePhotoDetailModel<ExpenseDetailPhotoModel> {
    public id: number;
    public amountAfterVat: number;
    public statsDateTime: DateTimeDisplayModel;
    public createdDateTime: DateTimeDisplayModel;
    public category: ExpenseCategory;
    public note: string;
    public isLocked: boolean;
    public createdUser: UserBasicModel;
    public payeeName: string;
    public photos: ExpenseDetailPhotoModel[];
    public authorization: ExpenseExistingAuthorizationModel;
    public updateHistories: ExpenseUpdateHistoryModel[] | null;
    public readonly detailRoute: RouteLocationRaw;
    public readonly updateRoute: RouteLocationRaw;

    constructor(responseDto: ResponseDtos.Expense.Detail) {
        this.id = responseDto.id;
        this.amountAfterVat = responseDto.amountAfterVat;
        this.statsDateTime = new DateTimeDisplayModel(responseDto.statsDateTime);
        this.createdDateTime = new DateTimeDisplayModel(responseDto.createdDateTime);
        this.category = responseDto.category;
        this.note = responseDto.note ?? "";
        this.isLocked = responseDto.isLocked;
        this.createdUser = new UserBasicModel(responseDto.createdUser);
        this.payeeName = responseDto.payee.name;
        this.photos = responseDto.photos?.map(p => new ExpenseDetailPhotoModel(p)) ?? [];
        this.authorization = new ExpenseExistingAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new ExpenseUpdateHistoryModel(uh));
        this.detailRoute = { name: "expenseDetail", params: { expenseId: this.id } };
        this.updateRoute = { name: "expenseUpdate", params: { expenseId: this.id } };
    }
}

export class ExpenseUpsertModel implements
        IHasStatsUpsertModel,
        IHasMultiplePhotoUpsertModel<ExpenseUpsertPhotoModel> {
    public id: number = 0;
    public amount: number = 0;
    public statsDateTime: IStatsDateTimeInputModel;
    public category: ExpenseCategory = ExpenseCategory.Equipment;
    public note: string = "";
    public payeeName: string = "";
    public photos: ExpenseUpsertPhotoModel[] = [];
    public updatedReason: string = "";

    constructor(responseDto?: ResponseDtos.Expense.Detail) {
        if (!responseDto) {
            this.statsDateTime = new StatsDateTimeInputModel(true);
        } else {
            this.amount = responseDto.amountAfterVat;
            this.statsDateTime = new StatsDateTimeInputModel(false, responseDto.statsDateTime);
            this.category = responseDto.category;
            this.note = responseDto.note ?? "";
            this.payeeName = responseDto.payee.name;
            this.photos = responseDto.photos?.map(p => new ExpenseUpsertPhotoModel(p)) ?? [];
        }
    }

    public toRequestDto(): RequestDtos.Expense.Upsert {
        return {
            amount: this.amount,
            statsDateTime: this.statsDateTime.toRequestDto(),
            category: this.category,
            note: this.note || null,
            payeeName: this.payeeName,
            photos: this.photos.length ? this.photos.map(p => p.toRequestDto()) : null,
            updatedReason: this.updatedReason || null
        };
    }
}

export class ExpenseExistingAuthorizationModel implements IHasStatsExistingAuthorizationModel {
    public canEdit: boolean = true;
    public canDelete: boolean = false;
    public canSetStatsDateTime: boolean;

    constructor(responseDto: ResponseDtos.Expense.ExistingAuthorization) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetStatsDateTime = responseDto.canSetStatsDateTime;
    }
}

export class ExpenseCreatingAuthorizationModel implements IHasStatsCreatingAuthorizationModel {
    public canSetStatsDateTime: boolean;

    constructor(responseDto: ResponseDtos.Expense.ExistingAuthorization) {
        this.canSetStatsDateTime = responseDto.canSetStatsDateTime;
    }
}