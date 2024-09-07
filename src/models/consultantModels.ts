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
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
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
    public orderByField: string = "PaidDateTime";
    public monthYear: MonthYearModel;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: ConsultantBasicModel[] = [];
    public monthYearOptions: MonthYearModel[] = [];
    public authorization: ConsultantListAuthorizationModel | null = null;

    constructor(responseDto: ConsultantListResponseDto) {
        this.mapFromResponseDto(responseDto);
        this.monthYear = this.monthYearOptions[0];
    }

    public mapFromResponseDto(responseDto: ConsultantListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new ConsultantBasicModel(i)) ?? [];
        this.monthYearOptions = responseDto.monthYearOptions
            .map(myo => new MonthYearModel(myo));
    }

    public toRequestDto(): ConsultantListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            month: this.monthYear.month,
            year: this.monthYear.year,
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
    public createdDate: string;
    public createdTime: string;
    public createdDateTime: string;
    public lastUpdateDate: string | null;
    public lastUpdatedTime: string | null;
    public lastUpdatedDateTime: string | null;
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
        this.createdDate = dateTimeUtility.getDisplayDateString(responseDto.createdDateTime);
        this.createdTime = dateTimeUtility.getDisplayTimeString(responseDto.createdDateTime);
        this.createdDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.createdDateTime);
        this.lastUpdateDate = responseDto.lastUpdatedDateTime && dateTimeUtility
            .getDisplayDateString(responseDto.lastUpdatedDateTime);
        this.lastUpdatedTime = responseDto.lastUpdatedDateTime && dateTimeUtility
            .getDisplayTimeString(responseDto.lastUpdatedDateTime);
        this.lastUpdatedDateTime = responseDto.lastUpdatedDateTime && dateTimeUtility
            .getDisplayDateTimeString(responseDto.lastUpdatedDateTime);
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
    public paidDateTimeSpecified: boolean = false;
    public updateReason: string = "";
    public customer: CustomerBasicModel | null = null;

    constructor(responseDto?: ConsultantDetailResponseDto) {
        if(responseDto) {
            const dateTimeUtility = useDateTimeUtility();

            this.amount = responseDto.amount;
            this.note = responseDto.note ?? "";
            this.paidDateTime = dateTimeUtility
                .getHTMLDateTimeInputString(responseDto.paidDateTime);
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }

    public toRequestDto(): ConsultantUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();
        let paidDateTime = null;
        if (this.paidDateTimeSpecified && this.paidDateTime) {
            paidDateTime = dateTimeUtility.getDateTimeISOString(this.paidDateTime);
        }

        return {
            amount: this.amount,
            note: this.note || null,
            paidDateTime: paidDateTime,
            updateReason: this.updateReason || null,
            customerId: this.customer?.id ?? 0
        };
    }
}

export class ConsultantAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;
    public canSetPaidDateTime: boolean;
    public canAccessUpdateHistories: boolean;

    constructor(responseDto: ConsultantAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
        this.canSetPaidDateTime = responseDto.canSetPaidDateTime;
        this.canAccessUpdateHistories = responseDto.canAccessUpdateHistories;
    }
}

export class ConsultantListAuthorizationModel {
    canCreate: boolean;

    constructor(responseDto: ConsultantListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}