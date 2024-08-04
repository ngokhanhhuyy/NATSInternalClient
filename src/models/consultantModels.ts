import type {
    ConsultantListRequestDto,
    ConsultantUpsertRequestDto } from "@/services/dtos/requestDtos";
import type {
    ConsultantBasicResponseDto,
    ConsultantListResponseDto,
    ConsultantDetailResponseDto,
    ConsultantListAuthorizationResponseDto,
    ConsultantAuthorizationResponseDto } from "@/services/dtos/responseDtos/consultantResponseDtos";
import { ConsultantUpdateHistoryModel } from "./consultantUpdateHistoryModels";
import { CustomerBasicModel, CustomerUpsertModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class ConsultantBasicModel {
    public id: number;
    public amount: number;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: ConsultantAuthorizationModel | null;

    constructor(responseDto: ConsultantBasicResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.paidDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = new ConsultantAuthorizationModel(responseDto.authorization!);
    }
}

export class ConsultantListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "CreatedDateTime";
    public rangeFrom: string = "";
    public rangeTo: string = "";
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: ConsultantBasicModel[] = [];
    public authorization: ConsultantListAuthorizationModel | null = null;

    public mapFromResponseDto(responseDto: ConsultantListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new ConsultantBasicModel(i)) ?? [];
    }

    public toRequestDto(): ConsultantListRequestDto {
        const dateTimeUtility = useDateTimeUtility();

        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            rangeFrom: (this.rangeFrom || null) && dateTimeUtility
                .getDateISOString(this.rangeFrom),
            rangeTo: (this.rangeTo || null) && dateTimeUtility
                .getDateISOString(this.rangeTo),
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class ConsultantDetailModel {
    public id: number;
    public amount: number;
    public note: string | null;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public user: UserBasicModel;
    public authorization: ConsultantAuthorizationModel;
    public updateHistories: ConsultantUpdateHistoryModel[] | null;

    constructor(responseDto: ConsultantDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.note = responseDto.note;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.paidDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.user);
        this.authorization = new ConsultantAuthorizationModel(responseDto.authorization);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new ConsultantUpdateHistoryModel(uh));
    }
}

export class ConsultantUpsertModel {
    public amount: number = 0;
    public note: string = "";
    public paidDateTime: string = "";
    public customerId: number = 0;
    public customer: CustomerUpsertModel | null = null;

    constructor(arg: ConsultantDetailResponseDto | CustomerBasicModel) {
        if (arg instanceof CustomerBasicModel) {
            this.customerId = arg.id;
        } else {
            const dateTimeUtility = useDateTimeUtility();

            this.amount = arg.amount;
            this.note = arg.note ?? "";
            this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(arg.paidDateTime);
        }
    }

    public toRequestDto(): ConsultantUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();

        return {
            amount: this.amount,
            note: this.note || null,
            paidDateTime: (this.paidDateTime || null) &&
                dateTimeUtility.getDateTimeISOString(this.paidDateTime),
            customerId: this.customerId,
            customer: this.customer?.toRequestDto() ?? null
        };
    }
}

export class ConsultantAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;
    public canSetPaidDateTime: boolean;

    constructor(responseDto: ConsultantAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetPaidDateTime = responseDto.canSetPaidDateTime;
    }
}

export class ConsultantListAuthorizationModel {
    canCreate: boolean;

    constructor(responseDto: ConsultantListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}