import type {
    DebtListRequestDto,
    DebtUpsertRequestDto } from "@/services/dtos/requestDtos/debtRequestDtos";
import type {
    DebtBasicResponseDto,
    DebtListResponseDto,
    DebtDetailResponseDto,
    DebtListAuthorizationResponseDto,
    DebtAuthorizationResponseDto } from "@/services/dtos/responseDtos/debtResponseDtos";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class DebtBasicModel {
    public id: number;
    public amount: number;
    public note: string;
    public incurredDate: string;
    public incurredTime: string;
    public incurredDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: DebtAuthorizationModel | null;

    constructor(responseDto: DebtBasicResponseDto) {
        const dateTimeUltility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.note = responseDto.note;
        this.incurredDate = dateTimeUltility
            .getDisplayDateString(responseDto.incurredDateTime);
        this.incurredTime = dateTimeUltility
            .getDisplayTimeString(responseDto.incurredDateTime);
        this.incurredDateTime = dateTimeUltility
            .getDisplayDateTimeString(responseDto.incurredDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = responseDto.authorization &&
            new DebtAuthorizationModel(responseDto.authorization);
    }
}

export class DebtListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "IncurredDateTime";
    public rangeFrom: string | null = null;
    public rangeTo: string | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: DebtBasicModel[] = [];
    public authorization: DebtListAuthorizationResponseDto | null = null;

    constructor(responseDto?: DebtListResponseDto) {
        if (responseDto) {
            this.mapFromResponseDto(responseDto);
        }
    }

    public mapFromResponseDto(responseDto: DebtListResponseDto): void {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new DebtBasicModel(i)) ?? [];
        this.authorization = responseDto.authorization &&
            new DebtListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): DebtListRequestDto {
        const dateTimeUltility = useDateTimeUtility();

        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            rangeFrom: this.rangeFrom && dateTimeUltility
                .getRequestDtoDateTimeString(this.rangeFrom),
            rangeTo: this.rangeTo && dateTimeUltility
                .getRequestDtoDateTimeString(this.rangeTo),
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class DebtDetailModel {
    public id: number;
    public amount: number;
    public note: string | null;
    public incurredDate: string;
    public incurredTime: string;
    public incurredDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public user: UserBasicModel;
    public authorization: DebtAuthorizationModel;

    constructor(responseDto: DebtDetailResponseDto) {
        const dateTimeUltility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.note = responseDto.note;
        this.incurredDate = dateTimeUltility
            .getDisplayDateString(responseDto.incurredDateTime);
        this.incurredTime = dateTimeUltility
            .getDisplayTimeString(responseDto.incurredDateTime);
        this.incurredDateTime = dateTimeUltility
            .getDisplayDateTimeString(responseDto.incurredDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.user);
        this.authorization = new DebtAuthorizationModel(responseDto.authorization);
    }
}

export class DebtUpsertModel {
    public id: number = 0;
    public amount: number = 0;
    public note: string = "";
    public incurredDateTime: string = "";
    public customer: CustomerBasicModel | null = null;
    public updatingReason: string = "";

    constructor(responseDto?: DebtDetailResponseDto) {
        const dateTimeUltility = useDateTimeUtility();

        if (responseDto) {
            this.id = responseDto.id;
            this.amount = responseDto.amount;
            this.note = responseDto.note ?? "";
            this.incurredDateTime = dateTimeUltility
                .getDateTimeHTMLInputElementString(responseDto.incurredDateTime);
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }
    
    public toRequestDto(): DebtUpsertRequestDto {
        const dateTimeUltility = useDateTimeUtility();

        return {
            amount: this.amount,
            note: this.note,
            incurredDateTime: this.incurredDateTime && dateTimeUltility
                .getRequestDtoDateTimeString(this.incurredDateTime),
            customerId: this.customer?.id ?? null,
            updatingReason: this.updatingReason || null
        };
    }
}

export class DebtListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: DebtListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class DebtAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: DebtAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}