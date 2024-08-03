import type { DebtPaymentUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";

export class DebtPaymentUpdateHistoryModel {
    public updatedDate: DisplayDateString;
    public updatedTime: DisplayTimeString;
    public updatedDateTime: DisplayDateTimeString;
    public updatedUser: UserBasicModel;
    public reason: string;
    public oldPaidDate: DisplayDateString;
    public oldPaidTime: DisplayTimeString;
    public oldPaidDateTime: DisplayDateTimeString;
    public oldAmount: number;
    public oldNote: string;
    public newPaidDate: DisplayDateString;
    public newPaidTime: DisplayTimeString;
    public newPaidDateTime: DisplayDateTimeString;
    public newAmount: number;
    public newNote: string;

    constructor(responseDto: DebtPaymentUpdateHistoryResponseDto) {
        this.updatedDate = responseDto.updatedDateTime.toDisplayDateString();
        this.updatedTime = responseDto.updatedDateTime.toDisplayTimeString();
        this.updatedDateTime = responseDto.updatedDateTime.toDisplayDateTimeString();
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = responseDto.oldPaidDateTime.toDisplayDateString();
        this.oldPaidTime = responseDto.oldPaidDateTime.toDisplayDateTimeString();
        this.oldPaidDateTime = responseDto.oldPaidDateTime.toDisplayDateTimeString();
        this.oldAmount = responseDto.oldAmount;
        this.oldNote = responseDto.oldNote ?? "";
        this.newPaidDate = responseDto.newPaidDateTime.toDisplayDateString();
        this.newPaidTime = responseDto.newPaidDateTime.toDisplayTimeString();
        this.newPaidDateTime = responseDto.newPaidDateTime.toDisplayDateTimeString();
        this.newAmount = responseDto.newAmount;
        this.newNote = responseDto.newNote ?? "";
    }
}