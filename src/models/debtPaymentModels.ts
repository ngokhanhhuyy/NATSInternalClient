import type {
    DebtPaymentBasicResponseDto,
    DebtPaymentDetailResponseDto,
    DebtPaymentAuthorizationResponseDto, 
    DebtPaymentListResponseDto,
    DebtPaymentListAuthorizationResponseDto} from "@/services/dtos/responseDtos";
import type {
    DebtPaymentListRequestDto,
    DebtPaymentUpsertRequestDto } from "@/services/dtos/requestDtos/debtPaymentRequestDtos";
import { DebtPaymentUpdateHistoryModel } from "./debtPaymentUpdateHistoryModels";
import { CustomerBasicModel } from "./customerModels";
import { UserBasicModel } from "./userModels";
import { MonthYearModel } from "./monthYearModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class DebtPaymentBasicModel {
    public readonly id: number;
    public readonly amount: number;
    public readonly paidDate: string;
    public readonly paidTime: string;
    public readonly paidDateTime: string;
    public readonly paidDeltaText: string;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly authorization: DebtPaymentAuthorizationModel;

    constructor(responseDto: DebtPaymentBasicResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.statsDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.statsDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.statsDateTime);
        this.paidDeltaText = dateTimeUtility
            .getDeltaTextRelativeToNow(responseDto.statsDateTime);
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.isLocked = responseDto.isLocked;
        this.authorization = new DebtPaymentAuthorizationModel(responseDto.authorization!);
    }
}

export class DebtPaymentListModel {
    public orderByAscending: boolean = false;
    public orderByField: string = "CreatedDateTime";
    public monthYear: MonthYearModel;
    public ignoreMonthYear: boolean = false;
    public customerId: number | null = null;
    public createdUserId: number | null = null;
    public page: number = 1;
    public resultsPerPage: number = 15;
    public pageCount: number = 0;
    public items: DebtPaymentBasicModel[] = [];
    public monthYearOptions: MonthYearModel[] = [];
    public authorization: DebtPaymentListAuthorizationResponseDto | null = null;

    constructor(responseDto: DebtPaymentListResponseDto) {
        this.mapFromResponseDto(responseDto);
        this.monthYear = this.monthYearOptions[0];
    }

    public mapFromResponseDto(responseDto: DebtPaymentListResponseDto) {
        this.pageCount = responseDto.pageCount;
        this.items = responseDto.items?.map(dp => new DebtPaymentBasicModel(dp)) ?? [];
        this.monthYearOptions = responseDto.monthYearOptions
            .map(myo => new MonthYearModel(myo));
        this.authorization = new DebtPaymentListAuthorizationModel(responseDto.authorization);
    }

    public toRequestDto(): DebtPaymentListRequestDto {
        return {
            orderByAscending: this.orderByAscending,
            orderByField: this.orderByField,
            month: this.monthYear.month,
            year: this.monthYear.year,
            ignoreMonthYear: this.ignoreMonthYear,
            customerId: this.customerId,
            createdUserId: this.createdUserId,
            page: this.page,
            resultsPerPage: this.resultsPerPage
        };
    }
}

export class DebtPaymentDetailModel {
    public readonly id: number;
    public readonly amount: number;
    public readonly note: string | null;
    public readonly paidDate: string;
    public readonly paidTime: string;
    public readonly paidDateTime: string;
    public readonly paidDeltaText: string;
    public readonly isLocked: boolean;
    public readonly customer: CustomerBasicModel;
    public readonly user: UserBasicModel;
    public readonly authorization: DebtPaymentAuthorizationModel;
    public readonly updateHistories: DebtPaymentUpdateHistoryModel[] | null;

    constructor(responseDto: DebtPaymentDetailResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        
        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDate = dateTimeUtility.getDisplayDateString(responseDto.statsDateTime);
        this.paidTime = dateTimeUtility.getDisplayTimeString(responseDto.statsDateTime);
        this.paidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.statsDateTime);
        this.paidDeltaText = dateTimeUtility
            .getDeltaTextRelativeToNow(responseDto.statsDateTime);
        this.note = responseDto.note;
        this.customer = new CustomerBasicModel(responseDto.customer);
        this.user = new UserBasicModel(responseDto.createdUser);
        this.isLocked = responseDto.isLocked;
        this.authorization = new DebtPaymentAuthorizationModel(responseDto.authorization!);
        this.updateHistories = responseDto.updateHistories &&
            responseDto.updateHistories.map(uh => new DebtPaymentUpdateHistoryModel(uh));
    }
}

export class DebtPaymentUpsertModel {
    public amount: number = 0;
    public note: string = "";
    public customer: CustomerBasicModel | null = null;
    public paidDateTime: string = "";
    public updatingReason: string = "";

    constructor(responseDto?: DebtPaymentDetailResponseDto) {
        if (responseDto) {
            const dateTimeUtility = useDateTimeUtility();

            this.amount = responseDto.amount;
            this.note = responseDto.note ?? "";
            this.paidDateTime = dateTimeUtility
                .getDisplayDateTimeString(responseDto.statsDateTime);
            this.customer = new CustomerBasicModel(responseDto.customer);
        }
    }
    
    public toRequestDto(): DebtPaymentUpsertRequestDto {
        const dateTimeUtility = useDateTimeUtility();
        
        return {
            amount: this.amount,
            note: this.note || null,
            statsDateTime: (this.paidDateTime || null) && dateTimeUtility
                .getDateTimeISOString(this.paidDateTime),
            customerId: this.customer?.id ?? 0,
            updatedReason: this.updatingReason || null
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