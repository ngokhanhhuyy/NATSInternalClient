import { useDateTimeUtility } from "@/utilities/dateTimeUtility";
import { UserBasicModel } from "./userModels";
import type {
    OrderPaymentResponseDto,
    OrderPaymentAuthorizationResponseDto } from "@/services/dtos/responseDtos/orderPaymentResponseDtos";
import type { OrderPaymentRequestDto } from "@/services/dtos/requestDtos/orderPaymentRequestDtos";

export class OrderPaymentModel {
    public id: number;
    public amount: number;
    public paidDate: string;
    public paidTime: string;
    public paidDateTime: string;
    public note: string | null;
    public isClosed: boolean;
    public userInCharge: UserBasicModel;
    public authorization: OrderPaymentAuthorizationModel;

    constructor(responseDto: OrderPaymentResponseDto) {
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
        this.isClosed = responseDto.isClosed;
        this.userInCharge = new UserBasicModel(responseDto.userInCharge);
        this.authorization = new OrderPaymentAuthorizationModel(responseDto.authorization!);
    }
}

export class OrderPaymentAuthorizationModel {
    public canEdit: boolean;
    public canDelete: boolean;

    constructor(responseDto: OrderPaymentAuthorizationResponseDto) {
        this.canEdit = responseDto.canEdit;
        this.canDelete = responseDto.canDelete;
    }
}

export class OrderPaymentUpsertModel {
    public id: number | null = null;
    public amount: number = 0;
    public paidDateTime: string = "";
    public note: string = "";
    public hasBeenChanged: boolean = false;

    constructor(responseDto?: OrderPaymentResponseDto) {
        if (responseDto) {
            const dateTimeUtility = useDateTimeUtility();
            this.id = responseDto.id;
            this.amount = responseDto.amount;
            this.paidDateTime = dateTimeUtility
                .getDateTimeHTMLInputElementString(responseDto.paidDateTime);
            this.note = responseDto.note ?? "";
        } else {
            this.hasBeenChanged = true;
        }
    }

    public toRequestDto(): OrderPaymentRequestDto {
        const dateTimeUtility = useDateTimeUtility();
        return {
            id: this.id,
            amount: this.amount,
            paidDateTime: (this.paidDateTime && dateTimeUtility
                .getRequestDtoDateTimeString(this.paidDateTime)) || null,
            note: this.note || null,
            hasBeenChanged: this.hasBeenChanged
        };
    }
}