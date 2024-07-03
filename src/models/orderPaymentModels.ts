import { useDateTimeUtility } from "@/utilities/dateTimeUtility";
import { UserBasicModel } from "./userModels";
import type { OrderPaymentResponseDto } from "@/services/dtos/responseDtos/orderPaymentResponseDtos";
import type { OrderPaymentRequestDto } from "@/services/dtos/requestDtos/orderPaymentRequestDtos";

export class OrderPaymentModel {
    public id: number;
    public amount: number;
    public paidDateTime: string;
    public note: string | null;
    public isClosed: boolean;
    public userInCharge: UserBasicModel;

    constructor(responseDto: OrderPaymentResponseDto) {
        const dateTimeUtility = useDateTimeUtility();

        this.id = responseDto.id;
        this.amount = responseDto.amount;
        this.paidDateTime = dateTimeUtility
            .getDisplayDateTimeString(responseDto.paidDateTime);
        this.note = responseDto.note;
        this.isClosed = responseDto.isClosed;
        this.userInCharge = new UserBasicModel(responseDto.userInCharge);
    }
}

export class OrderPaymentUpsertModel {
    public id: number | null = null;
    public amount: number = 0;
    public paidDateTime: string = "";
    public note: string = "";
    public hasBeenChanged: boolean = false;

    public toRequestDto(): OrderPaymentRequestDto {
        const dateTimeUtility = useDateTimeUtility();
        return {
            id: this.id,
            amount: this.amount,
            paidDateTime: this.paidDateTime && dateTimeUtility
                .getRequestDtoDateTimeString(this.paidDateTime),
            note: this.note || null,
            hasBeenChanged: this.hasBeenChanged
        };
    }
}