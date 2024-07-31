import { ExpenseCategory } from "@/services/dtos/enums";
import type {
    ExpenseListRequestDto,
    ExpenseUpsertRequestDto } from "@/services/dtos/requestDtos/expenseRequestDtos";
import type {
    ExpenseBasicResponseDto, ExpenseListResponseDto, ExpenseAuthorizationResponseDto,
    ExpenseDetailResponseDto } from "@/services/dtos/responseDtos/expenseResponseDtos";
import { UserBasicModel } from "./userModels";
import { ExpensePhotoModel } from "./expensePhotoModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class ExpenseBasicModel {
    public id: number;
    public amount: number;
    public paidDateTime: string;
    public paidDate: string = "";
    public paidTime: string = "";
    public category: ExpenseCategory;
    public isLocked: boolean;
    public authorization: ExpenseAuthorizationModel | null;

    constructor(responseDto: ExpenseBasicResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDateTime = dateTimeUtility
        .getDisplayDateTimeString(responseDto.paidDateTime);
        this.paidDate = dateTimeUtility
            .getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility
            .getDisplayTimeString(responseDto.paidDateTime);
        this.category = responseDto.category;
        this.isLocked = responseDto.isLocked;
        this.authorization = new ExpenseAuthorizationModel(responseDto.authorization);
    }
}

export class ExpenseListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "PaidDateTime";
    public rangeFrom: string | null = null;
    public rangeTo: string | null = null;
    public category: ExpenseCategory | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public items: ExpenseBasicModel[] = [];
    public pageCount: number = 0;

    public mapFromResponseDto(responseDto: ExpenseListResponseDto): void {
        this.items = responseDto.items?.map(i => new ExpenseBasicModel(i)) || [];
        this.pageCount = responseDto.pageCount;
    }

    public toRequestDto(): ExpenseListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            rangeFrom: this.rangeFrom,
            rangeTo: this.rangeTo,
            category: this.category,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class ExpenseDetailModel {
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

    constructor(responseDto: ExpenseDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDateTime = dateTimeUtility
            .getDisplayDateTimeString(responseDto.paidDateTime);
        this.paidDate = dateTimeUtility
            .getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility
            .getDisplayTimeString(responseDto.paidDateTime);
        this.category = responseDto.category;
        this.note = responseDto.note ?? "";
        this.isLocked = responseDto.isLocked;
        this.user = new UserBasicModel(responseDto.user);
        this.payeeName = responseDto.payee.name;
        this.photos = responseDto.photos?.map(p => new ExpensePhotoModel(p)) ?? [];
        this.authorization = new ExpenseAuthorizationModel(responseDto.authorization!);
    }
}

export class ExpenseUpsertModel {
    public amount: number = 0;
    public paidDateTime: string = "";
    public category: ExpenseCategory = ExpenseCategory.Equipment;
    public note: string = "";
    public payeeName: string = "";
    public photos: ExpensePhotoModel[] = [];

    constructor(responseDto?: ExpenseDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        if (responseDto) {
            this.amount = responseDto.amount;
            this.paidDateTime = dateTimeUtility
                .getDateTimeHTMLInputElementString(responseDto.paidDateTime);
            this.category = responseDto.category;
            this.note = responseDto.note ?? "";
            this.payeeName = responseDto.payee.name;
            this.photos = responseDto.photos?.map(p => new ExpensePhotoModel(p)) ?? [];
        }
    }

    public toRequestDto(): ExpenseUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();

        return {
            amount: this.amount,
            paidDateTime: this.paidDateTime && dateTimeUtility
                .getRequestDtoDateTimeString(this.paidDateTime) || null,
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

export class ExpenseAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: ExpenseAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}