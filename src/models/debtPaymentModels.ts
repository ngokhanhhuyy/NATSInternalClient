import { useDateTimeUtility } from "@/utilities/dateTimeUtility";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import type {
    DebtPaymentBasicResponseDto,
    DebtPaymentDetailResponseDto,
    DebtPaymentAuthorizationResponseDto, 
    DebtPaymentListResponseDto,
    DebtPaymentListAuthorizationResponseDto} from "@/services/dtos/responseDtos/debtPaymentResponseDtos";
import type {
    DebtPaymentListRequestDto,
    DebtPaymentUpsertRequestDto } from "@/services/dtos/requestDtos/debtPaymentRequestDtos";

export class DebtPaymentBasicModel {
    public id: number;
    public amount: number;
    public note: string | null;
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
        this.paidDate = dateTimeUtility
            .getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility
            .getDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = dateTimeUtility
            .getDisplayDateTimeString(responseDto.paidDateTime);
        this.note = responseDto.note;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.isLocked = responseDto.isLocked;
        this.authorization = new DebtPaymentAuthorizationModel(responseDto.authorization!);
    }
}

export class DebtPaymentListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "CreatedDateTime";
    public rangeFrom: string | null = null;
    public rangeTo: string | null = null; 
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
            rangeFrom: (this.rangeFrom && dateTimeUtility
                .getRequestDtoDateString(this.rangeFrom)) || null,
            rangeTo: (this.rangeTo && dateTimeUtility
                .getRequestDtoDateString(this.rangeTo)) || null,
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

    constructor(responseDto: DebtPaymentDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDate = dateTimeUtility
            .getDisplayDateString(responseDto.paidDateTime);
        this.paidTime = dateTimeUtility
            .getDisplayTimeString(responseDto.paidDateTime);
        this.paidDateTime = dateTimeUtility
            .getDisplayDateTimeString(responseDto.paidDateTime);
        this.note = responseDto.note;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.user);
        this.isLocked = responseDto.isLocked;
        this.authorization = new DebtPaymentAuthorizationModel(responseDto.authorization!);
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
                .getDateTimeHTMLInputElementString(responseDto.paidDateTime);
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }
    
    public toRequestDto(): DebtPaymentUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();

        return {
            amount: this.amount,
            note: this.note || null,
            paidDateTime: (this.paidDateTime && dateTimeUtility
                .getDateTimeHTMLInputElementString(this.paidDateTime)) || null,
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