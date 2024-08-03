import type { DebtUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";

export class DebtUpdateHistoryModel {
    updatedDate: DisplayDateString;
    updatedTime: DisplayTimeString;
    updatedDateTime: DisplayDateTimeString;
    updatedUser: UserBasicModel;
    reason: string;
    oldIncurredDate: DisplayDateString;
    oldIncurredTime: DisplayTimeString;
    oldIncurredDateTime: DisplayDateTimeString;
    oldAmount: number;
    oldNote: string;
    newIncurredDate: DisplayDateString;
    newIncurredTime: DisplayTimeString;
    newIncurredDateTime: DisplayDateTimeString;
    newAmount: number;
    newNote: string;

    constructor(responseDto: DebtUpdateHistoryResponseDto) {
        this.updatedDate = responseDto.updatedDateTime.toDisplayDateString();
        this.updatedTime = responseDto.updatedDateTime.toDisplayTimeString();
        this.updatedDateTime = responseDto.updatedDateTime.toDisplayDateTimeString();
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldIncurredDate = responseDto.oldIncurredDateTime.toDisplayDateString();
        this.oldIncurredTime = responseDto.oldIncurredDateTime.toDisplayTimeString();
        this.oldIncurredDateTime = responseDto.oldIncurredDateTime.toDisplayDateTimeString();
        this.oldAmount = responseDto.oldAmount;
        this.oldNote = responseDto.oldNote;
        this.newIncurredDate = responseDto.newIncurredDateTime.toDisplayDateString();
        this.newIncurredTime = responseDto.newIncurredDateTime.toDisplayTimeString();
        this.newIncurredDateTime = responseDto.newIncurredDateTime.toDisplayDateTimeString();
        this.newAmount = responseDto.newAmount;
        this.newNote = responseDto.newNote;
    }
}