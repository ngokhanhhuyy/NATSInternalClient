import type { DebtPaymentUpdateHistoryResponseDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";
import { useDateTimeUtility } from "@/utilities/dateTimeUtility";

export class DebtPaymentUpdateHistoryModel {
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

    constructor(responseDto: DebtPaymentUpdateHistoryResponseDto) {
        const dateTimeUtility = useDateTimeUtility();
        
        this.updatedDate = dateTimeUtility.getDisplayDateString(responseDto.updatedDateTime);
        this.updatedTime = dateTimeUtility.getDisplayTimeString(responseDto.updatedDateTime);
        this.updatedDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.reason = responseDto.reason;
        this.oldPaidDate = dateTimeUtility.getDisplayDateString(responseDto.oldPaidDateTime);
        this.oldPaidTime = dateTimeUtility.getDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.oldPaidDateTime);
        this.oldAmount = responseDto.oldAmount;
        this.oldNote = responseDto.oldNote ?? "";
        this.newPaidDate = dateTimeUtility.getDisplayDateString(responseDto.newPaidDateTime);
        this.newPaidTime = dateTimeUtility.getDisplayTimeString(responseDto.newPaidDateTime);
        this.newPaidDateTime = dateTimeUtility.getDisplayDateTimeString(responseDto.newPaidDateTime);
        this.newAmount = responseDto.newAmount;
        this.newNote = responseDto.newNote ?? "";
    }
}