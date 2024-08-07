import type {
    DebtPaymentBasicResponseDto,
    DebtPaymentDetailResponseDto,
    DebtPaymentAuthorizationResponseDto, 
    DebtPaymentListResponseDto,
    DebtPaymentListAuthorizationResponseDto} from "@/services/dtos/responseDtos/debtPaymentResponseDtos";
import type {
    DebtPaymentListRequestDto,
    DebtPaymentUpsertRequestDto } from "@/services/dtos/requestDtos/debtPaymentRequestDtos";
import { DebtPaymentUpdateHistoryModel } from "./debtPaymentUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class DebtPaymentBasicModel {
    public id: number;
    public amount: number;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public authorization: DebtPaymentAuthorizationModel;

    constructor(responseDto: DebtPaymentBasicResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.paidDateTime);
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.isLocked = responseDto.isLocked;
        this.authorization = new DebtPaymentAuthorizationModel(responseDto.authorization!);
    }
}

export class DebtPaymentListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "CreatedDateTime";
    public rangeFrom: string = "";
    public rangeTo: string = ""; 
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: DebtPaymentBasicModel[] = [];
    public authorization: DebtPaymentListAuthorizationResponseDto | null = null;

    public mapFromResponseDto(responseDto: DebtPaymentListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(dp => new DebtPaymentBasicModel(dp)) ?? [];
        this.authorization = new DebtPaymentListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): DebtPaymentListRequestDto {
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

export class DebtPaymentDetailModel {
    public id: number;
    public amount: number;
    public note: string | null;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public isLocked: boolean;
    public customer: CustomerBasicModel;
    public user: UserBasicModel;
    public authorization: DebtPaymentAuthorizationModel;
    public updateHistories: DebtPaymentUpdateHistoryModel[] | null;

    constructor(responseDto: DebtPaymentDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.paidDateTime);
        this.note = responseDto.note;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.user);
        this.isLocked = responseDto.isLocked;
        this.authorization = new DebtPaymentAuthorizationModel(responseDto.authorization!);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new DebtPaymentUpdateHistoryModel(uh));
    }
}

export class DebtPaymentUpsertModel {
    public amount: number = 0;
    public note: string = "";
    public paidDateTime: string = "";
    public customer: CustomerBasicModel | null = null;

    constructor(responseDto?: DebtPaymentDetailResponseDto) {
        if (responseDto) {
            const dateTimeUtility = useDateTimeUtility();

            this.amount = responseDto.amount;
            this.note = responseDto.note ?? "";
            this.paidDateTime = dateTimeUtility
                .getDisplayDateTimeString(responseDto.paidDateTime);
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }
    
    public toRequestDto(): DebtPaymentUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();
        
        return {
            amount: this.amount,
            note: this.note || null,
            paidDateTime: (this.paidDateTime || null) && dateTimeUtility
                .getDateTimeISOString(this.paidDateTime),
            customerId: this.customer?.id ?? 0
        };
    }
}

export class DebtPaymentListAuthorizationModel {
    public canCreate: boolean;

    constructor(responseDto: DebtPaymentListAuthorizationResponseDto) {
        this.canCreate = responseDto.canCreate;
    }
}

export class DebtPaymentAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: DebtPaymentAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}