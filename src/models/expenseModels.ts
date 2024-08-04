import { ExpenseCategory } from "@/services/dtos/enums";
import type {
    ExpenseListRequestDto,
    ExpenseUpsertRequestDto } from "@/services/dtos/requestDtos/expenseRequestDtos";
import type {
    ExpenseBasicResponseDto, ExpenseListResponseDto, ExpenseAuthorizationResponseDto,
    ExpenseDetailResponseDto,
    ExpenseListAuthorizationResponseDto } from "@/services/dtos/responseDtos/expenseResponseDtos";
import { Model } from "./baseModels";
import { ExpensePhotoModel } from "./expensePhotoModels";
import { ExpenseUpdateHistoryModel } from "./expenseUpdateHistoryModels";
import { UserBasicModel } from "./userModels";

export class ExpenseBasicModel extends Model {
    public id: number;
    public amount: number;
    public paidDateTime: string;
    public paidDate: string;
    public paidTime: string;
    public category: ExpenseCategory;
    public isLocked: boolean;
    public authorization: ExpenseAuthorizationModel | null;

    constructor(responseDto: ExpenseBasicResponseDto) {
        super();
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
        this.paidDate = this.convertToDisplayDateString(responseDto.paidDateTime);
        this.paidTime = this.convertToDisplayTimeString(responseDto.paidDateTime);
        this.category = responseDto.category;
        this.isLocked = responseDto.isLocked;
        this.authorization = new ExpenseAuthorizationModel(responseDto.authorization);
    }
}

export class ExpenseListModel extends Model {
    public orderByAscending: boolean = false;
    public orderByField: string = "PaidDateTime";
    public rangeFrom: string = "";
    public rangeTo: string = "";
    public category: ExpenseCategory | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public items: ExpenseBasicModel[] = [];
    public pageCount: number = 0;
    public authorization: ExpenseListAuthorizationModel | null = null;

    public mapFromResponseDto(responseDto: ExpenseListResponseDto): void {
        this.items = responseDto.items?.map(i => new ExpenseBasicModel(i)) || [];
        this.pageCount = responseDto.pageCount;
        this.authorization = responseDto.authorization &&
            new ExpenseListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): ExpenseListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            rangeFrom: (this.rangeFrom || null) && this
                .convertToDateISOString(this.rangeFrom),
            rangeTo: (this.rangeTo || null) && this
                .convertToDateISOString(this.rangeTo) ,
            category: this.category,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class ExpenseDetailModel extends Model {
    public id: number;
    public amount: number;
    public paidDateTime: string;
    public paidDate: string;
    public paidTime: string;
    public category: ExpenseCategory;
    public note: string;
    public isLocked: boolean;
    public user: UserBasicModel;
    public payeeName: string;
    public photos: ExpensePhotoModel[];
    public authorization: ExpenseAuthorizationModel;
    public updateHistory: ExpenseUpdateHistoryModel[] | null;

    constructor(responseDto: ExpenseDetailResponseDto) {
        super();
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
        this.paidDate = this.convertToDisplayDateString(responseDto.paidDateTime);
        this.paidTime = this.convertToDisplayTimeString(responseDto.paidDateTime);
        this.category = responseDto.category;
        this.note = responseDto.note ?? "";
        this.isLocked = responseDto.isLocked;
        this.user = new UserBasicModel(responseDto.user);
        this.payeeName = responseDto.payee.name;
        this.photos = responseDto.photos?.map(p => new ExpensePhotoModel(p)) ?? [];
        this.authorization = new ExpenseAuthorizationModel(responseDto.authorization!);
        this.updateHistory = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new ExpenseUpdateHistoryModel(uh));
    }
}

export class ExpenseUpsertModel extends Model {
    public amount: number = 0;
    public paidDateTime: string = "";
    public category: ExpenseCategory = ExpenseCategory.Equipment;
    public note: string = "";
    public payeeName: string = "";
    public photos: ExpensePhotoModel[] = [];

    constructor(responseDto?: ExpenseDetailResponseDto) {
        super();
        if (responseDto) {
            this.amount = responseDto.amount;
            this.paidDateTime = this.convertToDisplayDateTimeString(responseDto.paidDateTime);
            this.category = responseDto.category;
            this.note = responseDto.note ?? "";
            this.payeeName = responseDto.payee.name;
            this.photos = responseDto.photos?.map(p => new ExpensePhotoModel(p)) ?? [];
        }
    }

    public toRequestDto(): ExpenseUpsertRequestDto {
        return {
            amount: this.amount,
            paidDateTime: (this.paidDateTime || null) && this
                .convertToDateTimeISOString(this.paidDateTime),
            category: this.category,
            note: this.note || null,
            payeeName: this.payeeName,
            photos: !this.photos.length ? null : this.photos.map(p => ({
                id: p.id,
                file: p.file,
                hasBeenChanged: p.hasBeenChanged
            }))  
        };
    }
}

export class ExpenseAuthorizationModel extends Model {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: ExpenseAuthorizationResponseDto) {
        super();
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}

export class ExpenseListAuthorizationModel extends Model {
    public canCreate: boolean;

    constructor(responseDto: ExpenseListAuthorizationResponseDto) {
        super();
        this.canCreate = responseDto.canCreate;
    }
}