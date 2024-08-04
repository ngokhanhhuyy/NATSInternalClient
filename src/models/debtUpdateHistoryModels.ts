import type { DebtUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { Model } from "./baseModels";
import { UserBasicModel } from "./userModels";

export class DebtUpdateHistoryModel extends Model {
    updatedDate: string;
    updatedTime: string;
    updatedDateTime: string;
    updatedUser: UserBasicModel;
    reason: string;
    oldIncurredDate: string;
    oldIncurredTime: string;
    oldIncurredDateTime: string;
    oldAmount: number;
    oldNote: string;
    newIncurredDate: string;
    newIncurredTime: string;
    newIncurredDateTime: string;
    newAmount: number;
    newNote: string;

    constructor(responseDto: DebtUpdateHistoryResponseDto) {
        super();
        this.updatedDate = this.convertToDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = this.convertToDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = this.convertToDisplayDateTimeString(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldIncurredDate = this.convertToDisplayDateString(responseDto.oldIncurredDateTime);
        this.oldIncurredTime = this.convertToDisplayTimeString(responseDto.oldIncurredDateTime);
        this.oldIncurredDateTime = this.convertToDisplayDateTimeString(responseDto.oldIncurredDateTime);
        this.oldAmount = responseDto.oldAmount;
        this.oldNote = responseDto.oldNote;
        this.newIncurredDate = this.convertToDisplayDateString(responseDto.newIncurredDateTime);
        this.newIncurredTime = this.convertToDisplayTimeString(responseDto.newIncurredDateTime);
        this.newIncurredDateTime = this.convertToDisplayDateTimeString(responseDto.newIncurredDateTime);
        this.newAmount = responseDto.newAmount;
        this.newNote = responseDto.newNote;
    }
}