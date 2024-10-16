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
        this.reason = responseDto.updatedReason;
        this.oldIncurredDate = dateTimeUtility.getDisplayDateString(responseDto.oldStatsDateTime);
        this.oldIncurredTime = dateTimeUtility.getDisplayTimeString(responseDto.oldStatsDateTime);
        this.oldIncurredDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.oldStatsDateTime);
        this.oldAmount = responseDto.oldAmount;
        this.oldNote = responseDto.oldNote;
        this.newIncurredDate = dateTimeUtility.getDisplayDateString(responseDto.newStatsDateTime);
        this.newIncurredTime = dateTimeUtility.getDisplayTimeString(responseDto.newStatsDateTime);
        this.newIncurredDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.newStatsDateTime);
        this.newAmount = responseDto.newAmount;
        this.newNote = responseDto.newNote;
    }
}