import type { DebtIncurrenceUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class DebtIncurrenceUpdateHistoryModel {
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

    constructor(responseDto: DebtIncurrenceUpdateHistoryResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        
        this.updatedDate = dateTimeUtility.getDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = dateTimeUtility.getDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldIncurredDate = dateTimeUtility.getDisplayDateString(responseDto.oldIncurredDateTime);
        this.oldIncurredTime = dateTimeUtility.getDisplayTimeString(responseDto.oldIncurredDateTime);
        this.oldIncurredDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.oldIncurredDateTime);
        this.oldAmount = responseDto.oldAmount;
        this.oldNote = responseDto.oldNote;
        this.newIncurredDate = dateTimeUtility.getDisplayDateString(responseDto.newIncurredDateTime);
        this.newIncurredTime = dateTimeUtility.getDisplayTimeString(responseDto.newIncurredDateTime);
        this.newIncurredDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.newIncurredDateTime);
        this.newAmount = responseDto.newAmount;
        this.newNote = responseDto.newNote;
    }
}