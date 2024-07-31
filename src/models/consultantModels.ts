import type {
    ConsultantBasicResponseDto,
    ConsultantListResponseDto,
    ConsultantDetailResponseDto,
    ConsultantListAuthorizationResponseDto,
    ConsultantAuthorizationResponseDto } from "@/services/dtos/responseDtos/consultantResponseDtos";
import { CustomerBasicModel } from "./customerModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";
import { UserBasicModel } from "./userModels";

export class ConsultantBasicModel {
    public id: number;
    public amount: number;
    public paidDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: ConsultantAuthorizationModel | null;

    constructor(responseDto: ConsultantBasicResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.paidDateTime);
        this.isLocked = responseDto.isLocked;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.authorization = new ConsultantAuthorizationModel(responseDto.authorization!);
    }
}

export class ConsultantListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "CreatedDateTime";
    public rangeFrom: string | null = null;
    public rangeTo: string | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: ConsultantBasicModel[] = [];
    public authorization: ConsultantListAuthorizationModel | null = null;

    public mapFromResponseDto(responseDto: ConsultantListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(i => new ConsultantBasicModel(i)) ?? [];
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