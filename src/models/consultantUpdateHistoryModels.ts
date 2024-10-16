import type { ConsultantUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class ConsultantUpdateHistoryModel {
    public updatedDate: string;
    public updatedTime: string;
    public updatedDateTime: string;
    public updatedUser: UserBasicModel;
    public reason: string;
    public oldPaidDate: string;
    public oldPaidTime: string;
    public oldPaidDateTime: string;
    public oldAmount: number;
    public oldNote: string;
    public newPaidDate: string;
    public newPaidTime: string;
    public newPaidDateTime: string;
    public newAmount: number;
    public newNote: string;

    public constructor(responseDto: ConsultantUpdateHistoryResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        
        this.updatedDate = dateTimeUtility.getDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = dateTimeUtility.getDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.updatedReason;
        this.oldPaidDate = dateTimeUtility.getDisplayDateString(responseDto.oldStatsDateTime);
        this.oldPaidTime = dateTimeUtility.getDisplayTimeString(responseDto.oldStatsDateTime);
        this.oldPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.oldStatsDateTime);
        this.oldAmount = responseDto.oldAmount;
        this.oldNote = responseDto.oldNote;
        this.newPaidDate = dateTimeUtility.getDisplayDateString(responseDto.newStatsDateTime);
        this.newPaidTime = dateTimeUtility.getDisplayTimeString(responseDto.newStatsDateTime);
        this.newPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.newStatsDateTime);
        this.newAmount = responseDto.newAmount;
        this.newNote = responseDto.newNote;
    }
}